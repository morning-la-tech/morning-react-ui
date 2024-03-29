'use server';

import { Storage } from '@google-cloud/storage';

const storage = new Storage();

export async function uploadFile(
  bucketName: string,
  fileToUpload: string,
  destination: string,
) {
  const contents = Buffer.from(fileToUpload, 'base64');
  return await storage.bucket(bucketName).file(destination).save(contents);
}
