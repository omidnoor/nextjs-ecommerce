export default function arraysEqual(a, b) {
  if (a.length !== b.length) return false;

  const aSet = new Set(a.map((item) => JSON.stringify(item)));
  const bSet = new Set(b.map((item) => JSON.stringify(item)));

  if (aSet.size !== bSet.size) return false;

  for (const item of aSet) {
    if (!bSet.has(item)) return false;
  }

  return true;
}
