///Find the position of an elements with value in a sorted list
export function sortedIndex<T>(array: T[], value: number, get: (v: T) => number) {
    let low = 0,
        high = array.length;

    while (low < high) {
        const mid = (low + high) >>> 1;
        if (get(array[mid]) < value) low = mid + 1;
        else high = mid;
    }
    return low;
}

export function sortedInsert<T>(array: T[], value: T, get: (v: T) => number) {
    var k = get(value);
    var i = sortedIndex(array, k, get);
    return array.toSpliced(i, 0, value)
}