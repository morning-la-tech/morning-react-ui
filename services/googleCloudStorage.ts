'use server';

import { Storage } from '@google-cloud/storage';

const storage = new Storage();

export async function uploadFile(
  bucketName: string,
  fileToUpload: string,
  destination: string,
): Promise<boolean> {
  try {
    const contents = Buffer.from(fileToUpload, 'base64');
    await storage.bucket(bucketName).file(destination).save(contents);
    return true;
  } catch (e) {
    return false;
  }
}
