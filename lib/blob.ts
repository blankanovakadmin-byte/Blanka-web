import { put, del, list, issueSignedToken, presignUrl } from '@vercel/blob';

const TTL_MS = 72 * 60 * 60 * 1000; // 72 hours

export async function uploadFile(
  filename: string,
  data: Buffer | Blob | ReadableStream,
  contentType: string
): Promise<string> {
  const { url } = await put(filename, data, {
    access: 'private',
    contentType,
    addRandomSuffix: true,
  });
  return url;
}

export async function uploadProductPdf(
  recordId: string,
  data: Buffer | Blob | ReadableStream,
  contentType: string
): Promise<string> {
  const { url } = await put(`products/${recordId}.pdf`, data, {
    access: 'private',
    contentType,
    addRandomSuffix: false,
  });
  return url;
}

export async function getProductBlobMap(): Promise<Record<string, string>> {
  const { blobs } = await list({ prefix: 'products/' });
  const map: Record<string, string> = {};
  for (const blob of blobs) {
    const match = blob.pathname.match(/^products\/([^/]+)\.pdf$/);
    if (match) map[match[1]] = blob.url;
  }
  return map;
}

export async function getProductPdfUrl(recordId: string): Promise<string | undefined> {
  const { blobs } = await list({ prefix: `products/${recordId}.pdf` });
  return blobs[0]?.url;
}

export async function deleteProductPdf(recordId: string): Promise<void> {
  const { blobs } = await list({ prefix: `products/${recordId}.pdf` });
  if (blobs[0]) await del(blobs[0].url);
}

export async function generateSignedUrl(blobUrl: string): Promise<string> {
  // Public blobs are directly accessible — no signing needed
  if (blobUrl.includes('.public.blob.vercel-storage.com')) {
    return blobUrl;
  }

  const validUntil = Date.now() + TTL_MS;
  const pathname = new URL(blobUrl).pathname.slice(1);

  const token = await issueSignedToken({
    pathname,
    operations: ['get'],
    validUntil,
  });

  const { presignedUrl } = await presignUrl(token, {
    operation: 'get',
    pathname,
    validUntil,
    access: 'private',
  });

  return presignedUrl;
}

export async function listFiles() {
  const { blobs } = await list();
  return blobs;
}

export async function deleteFile(url: string) {
  await del(url);
}
