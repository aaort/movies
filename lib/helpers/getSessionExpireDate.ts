export default function getExpirationDate(): number {
  const now = new Date();
  now.setMonth(now.getMonth() + 1);
  return now.getTime();
}
