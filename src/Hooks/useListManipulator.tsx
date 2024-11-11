export function useListManipulator<T>(list: T[], onChange: (value: T[]) => void, generateNew?: () => T, allowEmpty: boolean = true) {
  function change(i: number, v: T): void {
    onChange([...list.slice(0, i), v, ...list.slice(i + 1, list.length)]);
  }

  function addNew(newValue?: T): void {
    if (newValue === undefined && generateNew) {
      newValue = generateNew();
    }
    onChange([...list, newValue as T]);
  }

  function remove(i: number): void {
    if (list.length > 1 || allowEmpty) {
      onChange([...list.slice(0, i), ...list.slice(i + 1, list.length)]);
    }
  }

  function move(i: number, direction: "up" | "down") {
    if (direction === "up" && i > 0) {
      console.log([...list.slice(0, i - 1), list[i], list[i - 1], ...list.slice(i + 1, list.length)]);
      onChange([...list.slice(0, i - 1), list[i], list[i - 1], ...list.slice(i + 1, list.length)]);
    } else if (i < list.length - 1) {
      onChange([...list.slice(0, i), list[i + 1], list[i], ...list.slice(i + 2, list.length)]);
    }
  }

  return { change, addNew, remove, move };
}
