export default function getExpirationDate(): number {
  const now = new Date();
  now.setHours(now.getHours() + 24);
  return now.getTime();
}
