import { useSpring, SpringValue } from "@react-spring/web";
import { Vector2, useGesture } from "@use-gesture/react";
import { useViewbox } from "./useViewbox";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { useRouter } from "./useRouter";
import { Routes } from "../Types/Routes";

export function useSVGMapDrag(): [SpringValue<number[]>, (...args: any[]) => ReactDOMAttributes] {
  var viewBox = useViewbox();

  const [{ xyz }, api] = useSpring(() => ({ xyz: [viewBox.x, viewBox.y, viewBox.scale] }), [viewBox]);

  const bind = useGesture({
    onDrag: ({ pinching, movement: [mx, my], cancel, elapsedTime }) => {
      //if (pinching) return cancel();
      api.start({ xyz: [viewBox.x - mx * viewBox.scale, viewBox.y - my * viewBox.scale, viewBox.scale] });
    },
    onDragEnd: ({ movement: [mx, my], elapsedTime }) => {
      if (elapsedTime > 1000 && mx + my < 10) {
        useRouter.getState().open(Routes.NodeCreation);
      }
      viewBox.set(viewBox.x - mx * viewBox.scale, viewBox.y - my * viewBox.scale, viewBox.scale);
    },
    onPinch: ({ origin, movement: [scale] }) => {
      api.start({ xyz: computeNewScale(viewBox, scale, origin) });
    },
    onPinchEnd: ({ origin, movement: [scale] }) => {
      var [x, y, s] = computeNewScale(viewBox, scale, origin);
      viewBox.set(x, y, s);
    },
    onWheel: ({ event: { pageX, pageY }, movement: [_, distance] }) => {
      api.start({ xyz: computeNewScale(viewBox, Math.exp(-distance / 1000), [pageX, pageY]) });
    },
    onWheelEnd: ({ event: { pageX, pageY }, movement: [_, distance] }) => {
      var [x, y, s] = computeNewScale(viewBox, Math.exp(-distance / 1000), [pageX, pageY]);
      viewBox.set(x, y, s);
    },
  });

  return [xyz, bind];
}
export function computeNewScale(viewbox: { x: number; y: number; scale: number }, scale: number, origin: Vector2): number[] {
  var scaleDiff = viewbox.scale - viewbox.scale / scale;
  return [viewbox.x + origin[0] * scaleDiff, viewbox.y + origin[1] * scaleDiff, viewbox.scale / scale];
}
