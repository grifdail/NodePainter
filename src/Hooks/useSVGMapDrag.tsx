import { useSpring, SpringValue } from "@react-spring/web";
import { Vector2, useGesture } from "@use-gesture/react";
import { useViewbox } from "./useViewbox";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { useEffect, useState } from "react";
import { useSelection } from "./useSelection";

export function useSVGMapDrag(): [SpringValue<number[]>, (...args: any[]) => ReactDOMAttributes] {
  var viewBox = useViewbox();
  var selection = useSelection();
  var [isSelection, setIsSelection] = useState(false);

  const [{ xyz }, api] = useSpring(() => ({ xyz: [viewBox.x, viewBox.y, viewBox.scale] }), [viewBox]);

  const bind = useGesture(
    {
      onDrag: ({ pinching, movement: [mx, my], xy: [x, y], cancel, elapsedTime, ctrlKey }) => {
        //if (pinching) return cancel();
        if (isSelection) {
          return null;
        } else {
          api.start({ xyz: [viewBox.x - mx * viewBox.scale, viewBox.y - my * viewBox.scale, viewBox.scale] });
        }
      },
      onDragStart: ({ ctrlKey, xy: [x, y] }) => {
        if (ctrlKey) {
          setIsSelection(true);
          return selection.startSelection([viewBox.x + x * viewBox.scale, viewBox.y + y * viewBox.scale]);
        }
        setIsSelection(false);
      },
      onDragEnd: ({ movement: [mx, my], xy: [x, y], elapsedTime, ctrlKey }) => {
        if (elapsedTime > 1000 && mx + my < 10) {
          //useRouter.getState().open(Routes.NodeCreation);
        }
        if (isSelection) {
          return selection.endSelection([viewBox.x + x * viewBox.scale, viewBox.y + y * viewBox.scale]);
        } else {
          viewBox.set(viewBox.x - mx * viewBox.scale, viewBox.y - my * viewBox.scale, viewBox.scale);
        }
        setIsSelection(false);
      },
      onPinch: ({ origin, movement: [scale] }) => {
        api.start({ xyz: computeNewScale(viewBox, scale, origin) });
      },
      onPinchEnd: ({ origin, movement: [scale] }) => {
        var [x, y, s] = computeNewScale(viewBox, scale, origin);
        viewBox.set(x, y, s);
      },
      onWheel: ({ event: { pageX, pageY, ...event }, movement: [_, distance], ctrlKey }) => {
        api.start({ xyz: computeNewScale(viewBox, Math.exp(-distance / 1000), [pageX, pageY]) });
      },
      onWheelEnd: ({ event: { pageX, pageY }, movement: [_, distance] }) => {
        var [x, y, s] = computeNewScale(viewBox, Math.exp(-distance / 1000), [pageX, pageY]);
        viewBox.set(x, y, s);
      },
    },
    {
      wheel: {
        preventDefault: true,
      },
    }
  );

  return [xyz, bind];
}
export function computeNewScale(viewbox: { x: number; y: number; scale: number }, scale: number, origin: Vector2): number[] {
  var scaleDiff = viewbox.scale - viewbox.scale / scale;
  return [viewbox.x + origin[0] * scaleDiff, viewbox.y + origin[1] * scaleDiff, viewbox.scale / scale];
}
