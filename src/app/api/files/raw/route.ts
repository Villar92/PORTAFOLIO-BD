import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const MIME_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  bmp: 'image/bmp',
  ico: 'image/x-icon',
  sql: 'text/plain; charset=utf-8',
  txt: 'text/plain; charset=utf-8',
  json: 'application/json; charset=utf-8',
  html: 'text/html; charset=utf-8',
  htm: 'text/html; charset=utf-8',
  md: 'text/markdown; charset=utf-8',
  js: 'text/javascript; charset=utf-8',
  ts: 'text/plain; charset=utf-8',
  css: 'text/css; charset=utf-8',
  py: 'text/plain; charset=utf-8',
  csv: 'text/plain; charset=utf-8',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  zip: 'application/zip',
  rar: 'application/x-rar-compressed',
  '7z': 'application/x-7z-compressed',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');
    const customName = searchParams.get('name');
    const isDownload = searchParams.get('download') === '1' || searchParams.get('download') === 'true';

    if (!filePath || filePath.includes('..') || !filePath.startsWith('uploads/')) {
      return NextResponse.json({ error: 'Ruta de archivo no válida.' }, { status: 400 });
    }

    let fileBuffer: Uint8Array | null = null;

    // 1. Try local filesystem scoped to 'uploads'
    const relSubPath = filePath.replace(/^uploads[\\/]/, '');
    const localFullPath = path.join(process.cwd(), 'uploads', relSubPath);
    if (fs.existsSync(localFullPath)) {
      try {
        const rawBytes = fs.readFileSync(localFullPath);
        fileBuffer = new Uint8Array(rawBytes);
      } catch (err) {
        console.warn('Could not read local file, falling back to remote:', err);
      }
    }

    // 2. Fetch from GitHub if not available locally
    if (!fileBuffer) {
      const GITHUB_OWNER = process.env.GITHUB_OWNER;
      const GITHUB_REPO = process.env.GITHUB_REPO;
      const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
      const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

      if (!GITHUB_OWNER || !GITHUB_REPO) {
        return NextResponse.json({ error: 'Configuración de GitHub incompleta en el servidor.' }, { status: 500 });
      }

      // Encode path parts safely
      const encodedPath = filePath.split('/').map(segment => encodeURIComponent(segment)).join('/');
      
      // Try raw.githubusercontent.com
      const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${encodedPath}`;
      const headers: HeadersInit = {
        'User-Agent': 'PortfolioApp',
      };
      if (GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
      }

      let res = await fetch(rawUrl, {
        headers,
        cache: 'no-store',
      });

      // Fallback: GitHub Contents API with Accept: application/vnd.github.raw
      if (!res.ok) {
        const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodedPath}?ref=${GITHUB_BRANCH}`;
        const apiHeaders: HeadersInit = {
          'Accept': 'application/vnd.github.raw',
          'User-Agent': 'PortfolioApp',
        };
        if (GITHUB_TOKEN) {
          apiHeaders['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
        }
        res = await fetch(apiUrl, {
          headers: apiHeaders,
          cache: 'no-store',
        });
      }

      if (!res.ok) {
        return NextResponse.json({ error: 'Archivo no encontrado en el repositorio.' }, { status: res.status });
      }

      const arrBuf = await res.arrayBuffer();
      fileBuffer = new Uint8Array(arrBuf);
    }

    const cleanName = customName || filePath.split('/').pop()?.replace(/^\d+-/, '') || 'archivo';
    const ext = cleanName.split('.').pop()?.toLowerCase() || '';
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Disposition: 'inline' for preview (NEVER auto-download), 'attachment' for explicit user click download
    const disposition = isDownload ? 'attachment' : 'inline';
    const asciiName = cleanName.replace(/[^\x20-\x7E]/g, '_');
    const encodedName = encodeURIComponent(cleanName);

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', contentType);
    responseHeaders.set('Content-Disposition', `${disposition}; filename="${asciiName}"; filename*=UTF-8''${encodedName}`);
    responseHeaders.set('Cache-Control', isDownload ? 'no-cache' : 'public, max-age=3600, stale-while-revalidate=86400');
    responseHeaders.set('X-Content-Type-Options', 'nosniff');

    return new NextResponse(fileBuffer as any, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Error al servir archivo:', error);
    return NextResponse.json({ error: 'Error interno del servidor al procesar el archivo.' }, { status: 500 });
  }
}
