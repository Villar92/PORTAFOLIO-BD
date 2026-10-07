import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const actividadId = formData.get('actividadId') as string;

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Content = buffer.toString('base64');
    
    // Config values
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_OWNER = process.env.GITHUB_OWNER; 
    const GITHUB_REPO = process.env.GITHUB_REPO;
    const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
       return NextResponse.json({ error: "GitHub credentials are not configured on the server (.env)." }, { status: 500 });
    }

    // Path in the repository
    const filePath = `uploads/${actividadId}/${Date.now()}-${file.name}`;
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Upload file: ${file.name} for ${actividadId}`,
        content: base64Content,
        branch: GITHUB_BRANCH,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("GitHub API Error:", data);
      return NextResponse.json({ error: "Failed to upload to GitHub", details: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: data });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
