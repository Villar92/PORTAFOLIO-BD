import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const GITHUB_OWNER = process.env.GITHUB_OWNER;
    const GITHUB_REPO = process.env.GITHUB_REPO;
    const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; 

    // Group files by actividadId
    const filesByActivity: Record<string, any[]> = {};
    const seenPaths = new Set<string>();

    const addFileObj = (actividadId: string, filePath: string, sha: string = '') => {
      if (seenPaths.has(filePath)) return;
      seenPaths.add(filePath);

      const parts = filePath.split('/');
      const fileName = parts.slice(2).join('/');
      const realName = fileName.replace(/^\d+-/, '');

      const fileObj = {
        name: realName,
        url: `/api/files/raw?path=${encodeURIComponent(filePath)}&name=${encodeURIComponent(realName)}`,
        rawGithubUrl: GITHUB_OWNER && GITHUB_REPO 
          ? `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${filePath}`
          : '',
        path: filePath,
        sha: sha
      };

      if (!filesByActivity[actividadId]) {
        filesByActivity[actividadId] = [];
      }
      filesByActivity[actividadId].push(fileObj);
    };

    // 1. Fetch from GitHub Tree API (if config is set)
    if (GITHUB_OWNER && GITHUB_REPO) {
      try {
        const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees/${GITHUB_BRANCH}?recursive=1`;
        const headers: Record<string, string> = { 'User-Agent': 'PortfolioApp' };
        if (GITHUB_TOKEN) {
          headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
        }

        const response = await fetch(url, { headers, cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          const allFiles = data.tree || [];
          const uploadFiles = allFiles.filter((file: any) => file.path.startsWith('uploads/') && file.type === 'blob');

          uploadFiles.forEach((file: any) => {
            const parts = file.path.split('/');
            if (parts.length >= 3) {
              const actividadId = parts[1]; // e.g. u1_s1, u2_s5
              addFileObj(actividadId, file.path, file.sha);
            }
          });
        }
      } catch (err) {
        console.warn('GitHub Tree API fetch failed, will rely on local folder if present:', err);
      }
    }

    // 2. Also scan local uploads directory (for local dev or newly uploaded files)
    try {
      const localUploadsDir = path.join(process.cwd(), 'uploads');
      if (fs.existsSync(localUploadsDir)) {
        const actDirs = fs.readdirSync(localUploadsDir, { withFileTypes: true });
        for (const actDir of actDirs) {
          if (actDir.isDirectory()) {
            const actPath = path.join(localUploadsDir, actDir.name);
            const files = fs.readdirSync(actPath, { withFileTypes: true });
            for (const file of files) {
              if (file.isFile()) {
                const relPath = `uploads/${actDir.name}/${file.name}`.replace(/\\/g, '/');
                addFileObj(actDir.name, relPath, '');
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn('Local uploads scan warning:', err);
    }

    return NextResponse.json(
      { files: filesByActivity },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error", files: {} }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { path: filePath, sha } = await request.json();

    if (!filePath) {
      return NextResponse.json({ error: "Missing path" }, { status: 400 });
    }

    // Delete locally if exists
    try {
      const relSubPath = filePath.replace(/^uploads[\\/]/, '');
      const localFullPath = path.join(process.cwd(), 'uploads', relSubPath);
      if (fs.existsSync(localFullPath)) {
        fs.unlinkSync(localFullPath);
      }
    } catch (err) {
      console.warn('Local file delete warning:', err);
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_OWNER = process.env.GITHUB_OWNER; 
    const GITHUB_REPO = process.env.GITHUB_REPO;
    const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

    if (GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO && sha) {
      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'User-Agent': 'PortfolioApp',
        },
        body: JSON.stringify({
          message: `Delete file: ${filePath}`,
          sha: sha,
          branch: GITHUB_BRANCH,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("GitHub API Error on delete:", data);
        return NextResponse.json({ error: "Failed to delete from GitHub", details: data }, { status: response.status });
      }

      return NextResponse.json({ success: true, data: data });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Server error during delete:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
