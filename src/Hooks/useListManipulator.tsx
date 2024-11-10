export function useListManipulator<T>(list: T[], onChange: (value: T[]) => void, generateNew: () => T) {
  function change(i: number, v: T): void {
    onChange([...list.slice(0, i), v, ...list.slice(i + 1, list.length)]);
  }

  function addNew(): void {
    onChange([...list, generateNew()]);
  }

  function remove(i: number): void {
    if (list.length > 1) {
      onChange([...list.slice(0, i), ...list.slice(i + 1, list.length)]);
    }
  }

  function move(i: number, direction: "up" | "down") {
    if (direction === "up") {
      console.log([...list.slice(0, i - 1), list[i], list[i - 1], ...list.slice(i + 1, list.length)]);
      onChange([...list.slice(0, i - 1), list[i], list[i - 1], ...list.slice(i + 1, list.length)]);
    } else {
      onChange([...list.slice(0, i), list[i + 1], list[i], ...list.slice(i + 2, list.length)]);
    }
  }

  return { change, addNew, remove, move };
}
