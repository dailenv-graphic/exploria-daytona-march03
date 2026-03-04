import JSZip from 'jszip';

function extractLocalImagePaths(html: string): string[] {
  const srcRegex = /src=["']([^"']+)["']/gi;
  const paths: string[] = [];
  let match;
  while ((match = srcRegex.exec(html)) !== null) {
    const src = match[1];
    if (src.startsWith('/') && !src.startsWith('//')) {
      paths.push(src);
    }
  }
  return [...new Set(paths)];
}

function getFileName(path: string): string {
  return path.split('/').pop() || path;
}

function rewriteImagePaths(html: string, imagePaths: string[]): string {
  let result = html;
  for (const path of imagePaths) {
    const fileName = getFileName(path);
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(escaped, 'g'), `images/${fileName}`);
  }
  return result;
}

export async function downloadEmailZip(
  emailPath: string,
  zipFileName: string,
  onProgress?: (status: string) => void
): Promise<void> {
  onProgress?.('Fetching email...');
  const htmlResponse = await fetch(emailPath);
  const htmlContent = await htmlResponse.text();

  const imagePaths = extractLocalImagePaths(htmlContent);
  const zip = new JSZip();
  const imagesFolder = zip.folder('images')!;

  onProgress?.(`Downloading ${imagePaths.length} images...`);
  const fetchResults = await Promise.allSettled(
    imagePaths.map(async (path) => {
      const response = await fetch(path);
      if (!response.ok) return null;
      const blob = await response.blob();
      return { path, blob };
    })
  );

  for (const result of fetchResults) {
    if (result.status === 'fulfilled' && result.value) {
      const { path, blob } = result.value;
      imagesFolder.file(getFileName(path), blob);
    }
  }

  const rewrittenHtml = rewriteImagePaths(htmlContent, imagePaths);
  zip.file('email.html', rewrittenHtml);

  onProgress?.('Creating ZIP...');
  const zipBlob = await zip.generateAsync({ type: 'blob' });

  const url = window.URL.createObjectURL(zipBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = zipFileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);

  onProgress?.('');
}
