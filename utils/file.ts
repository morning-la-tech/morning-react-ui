import { v4 as uuidv4 } from 'uuid';

export function generateFileName(
  path: string,
  originalFileName: string,
): string {
  const extension = originalFileName.split('.').pop(); // Extract file extension
  const uniqueId = uuidv4(); // Generate unique identifier
  return `${path.replace(/^\/+|\/+$/g, '')}/${uniqueId}.${extension}`;
}
