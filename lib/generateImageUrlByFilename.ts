const imagesBaseUrl = 'https://image.tmdb.org/t/p/original';

export default function generateImageUrlByFilename(filename: string) {
  return `${imagesBaseUrl}${filename}`;
}
