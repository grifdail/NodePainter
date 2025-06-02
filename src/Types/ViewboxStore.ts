export type ViewboxStore = {
  x: number;
  y: number;
  scale: number;
  set: (x: number, y: number, s: number) => void;
  center: () => [number, number];
};
