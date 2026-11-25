// Avatar paths are stored as "/avatars/…"; resolve them against wherever the app is hosted.
export function assetUrl(path) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path
  return import.meta.env.BASE_URL + path.slice(1)
}
