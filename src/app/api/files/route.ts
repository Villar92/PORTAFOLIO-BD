import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const GITHUB_OWNER = process.env.GITHUB_OWNER;
    const GITHUB_REPO = process.env.GITHUB_REPO;
    const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; 

    if (!GITHUB_OWNER || !GITHUB_REPO) {
      return NextResponse.json({ error: "Missing config", files: {} }, { status: 500 });
    }

    // Use the GitHub Tree API to get all files recursively
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees/${GITHUB_BRANCH}?recursive=1`;

    const headers: any = {};
    if (GITHUB_TOKEN) {
       headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(url, { headers, cache: 'no-store' });
    
    if (!response.ok) {
      return NextResponse.json({ files: {} });
    }

    const data = await response.json();
    const allFiles = data.tree || [];
    
    // Filter only files inside uploads/ folder
    const uploadFiles = allFiles.filter((file: any) => file.path.startsWith('uploads/') && file.type === 'blob');

    // Group files by actividadId
    const filesByActivity: Record<string, any[]> = {};
    
    uploadFiles.forEach((file: any) => {
       const parts = file.path.split('/');
       if (parts.length >= 3) {
         const actividadId = parts[1]; // e.g. u1_s1
         const fileName = parts.slice(2).join('/'); // original file name with timestamp
         
         // extract real name (remove the timestamp prefix)
         const realName = fileName.replace(/^\d+-/, '');
         
         const fileObj = {
            name: realName,
            url: `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${file.path}`,
            path: file.path,
            sha: file.sha
         };

         if (!filesByActivity[actividadId]) {
             filesByActivity[actividadId] = [];
         }
         filesByActivity[actividadId].push(fileObj);
       }
    });

    return NextResponse.json({ files: filesByActivity });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error", files: {} }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { path, sha } = await request.json();

    if (!path || !sha) {
      return NextResponse.json({ error: "Missing path or sha" }, { status: 400 });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_OWNER = process.env.GITHUB_OWNER; 
    const GITHUB_REPO = process.env.GITHUB_REPO;
    const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
       return NextResponse.json({ error: "GitHub credentials are not configured on the server." }, { status: 500 });
    }

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Delete file: ${path}`,
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

  } catch (error) {
    console.error("Server error during delete:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
