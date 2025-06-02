import { useColorScheme } from "@uiw/react-use-colorscheme";

export function SVGGridPattern() {
  const colorScheme = useColorScheme();
  return (
    <pattern
      id="grid"
      x="0"
      y="0"
      width="32"
      height="32"
      patternUnits="userSpaceOnUse">
      <line
        x1="16"
        y1="0"
        x2="16"
        y2="32"
        stroke={colorScheme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.1)"}
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="16"
        x2="32"
        y2="16"
        stroke={colorScheme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.1)"}
        strokeWidth="1"
      />
      <rect
        x="16"
        y="16"
        width="1"
        height="1"
        stroke={colorScheme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0,0,0,0.2)"}
        strokeWidth="1"
      />
    </pattern>
  );
}
