export function moveUpArray<T>(array: T[], value: T): T {
  const oldIndex = array.indexOf(value);
  const newIndex = (oldIndex + 1) % array.length;
  return array[newIndex];
}
