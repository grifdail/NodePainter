import { useColorScheme } from "@uiw/react-use-colorscheme";
import { memo } from "react";

export const SVGBackgroundTransparentPattern = memo(function SVGGridPattern() {
    const colorScheme = useColorScheme();
    return (
        <pattern
            id="grid"
            x="0"
            y="0"
            width={2 / 256}
            height={2 / 256}
            patternUnits="userSpaceOnUse">
            <rect
                x={0}
                y={0}
                width={1 / 256}
                height={1 / 256}
                fill={colorScheme === "dark" ? "black" : "white"} />
            <rect
                x={1 / 256}
                y={1 / 256}
                width={1 / 256}
                height={1 / 256}
                fill={colorScheme === "dark" ? "black" : "white"} /><rect
                x={1 / 256}
                y={0}
                width={1 / 256}
                height={1 / 256}
                fill={colorScheme === "dark" ? "white" : "black"} /><rect
                x={0}
                y={1 / 256}
                width={1 / 256}
                height={1 / 256}
                fill={colorScheme === "dark" ? "white" : "black"} />
        </pattern>
    );
});
