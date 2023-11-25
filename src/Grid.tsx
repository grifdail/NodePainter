import React, { useEffect } from "react";
import { Tree } from "./Tree";
import { GraphNode } from "./Graph/GraphNode";
import { useSpring, animated, useSprings } from "@react-spring/web";
import { useMeasure } from "@uidotdev/usehooks";
import { Vector2, useGesture } from "@use-gesture/react";
import { debug } from "console";

type gridProps = {
  tree: Tree;
  viewbox: { x: number; y: number; scale: number };
  setViewBox: (x: number, y: number, s: number) => void;
};
export function Grid({ tree, viewbox, setViewBox }: gridProps) {
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", preventDefault);
    document.addEventListener("gesturechange", preventDefault);

    return () => {
      document.removeEventListener("gesturestart", preventDefault);
      document.removeEventListener("gesturechange", preventDefault);
    };
  }, []);

  const [ref, elementSize] = useMeasure();

  const [{ xyz }, api] = useSpring(() => ({ xyz: [viewbox.x, viewbox.y, viewbox.scale] }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useGesture({
    onDrag: ({ pinching, movement: [mx, my], cancel }) => {
      if (pinching) return cancel();
      api.start({ xyz: [viewbox.x - mx * viewbox.scale, viewbox.y - my * viewbox.scale, viewbox.scale] });
    },
    onDragEnd: ({ movement: [mx, my] }) => {
      setViewBox(viewbox.x - mx * viewbox.scale, viewbox.y - my * viewbox.scale, viewbox.scale);
    },
    onPinch: ({ origin, movement: [scale] }) => {
      api.start({ xyz: computeNewScale(viewbox, scale, origin) });
    },
    onPinchEnd: ({ origin, movement: [scale] }) => {
      var [x, y, s] = computeNewScale(viewbox, scale, origin);
      setViewBox(x, y, s);
    },
  });

  const viewBoxStr = xyz.to((x, y, s) => `${x} ${y} ${(elementSize.width || 100) * s} ${(elementSize.height || 100) * s} `);

  return (
    <animated.svg ref={ref} width="100%" style={{ touchAction: "none" }} height="100%" viewBox={viewBoxStr} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <line x1="16" y1="0" x2="16" y2="32" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <line x1="0" y1="16" x2="32" y2="16" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <rect x="16" y="16" width="1" height="1" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        </pattern>
      </defs>
      <animated.rect x={xyz.to((x) => x)} y={xyz.to((x, y) => y)} {...bind()} width="100%" height="100%" fill="url(#grid)"></animated.rect>

      {Object.keys(tree.nodes).map((treeId) => {
        return <GraphNode node={tree.getNode(treeId)} key={treeId} />;
      })}
    </animated.svg>
  );
}
function computeNewScale(viewbox: { x: number; y: number; scale: number }, scale: number, origin: Vector2): number[] {
  var scaleDiff = viewbox.scale - viewbox.scale / scale;
  return [viewbox.x + origin[0] * scaleDiff, viewbox.y + origin[1] * scaleDiff, viewbox.scale / scale];
}
