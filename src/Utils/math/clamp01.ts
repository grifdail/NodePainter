export function clamp(a: number, min: number, max: number) {
    return Math.min(max, Math.max(min, a));
}
export function clamp01(a: number) {
    return Math.min(1, Math.max(0, a));
}
