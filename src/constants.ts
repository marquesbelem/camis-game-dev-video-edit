export const MEDIA_BASE_URL = 'http://127.0.0.1:8000';

export const getMediaUrl = (relativePath: string) => {
  return `${MEDIA_BASE_URL}/${relativePath.replace(/\\/g, '/')}`;
};

