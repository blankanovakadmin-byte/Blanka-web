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

export async function generateSignedUrl(blobUrl: string): Promise<string> {
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
