
import { useSpring, SpringValue } from "@react-spring/web";
import { Vector2, useGesture } from "@use-gesture/react";
import { useViewbox } from "./useViewbox";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { useSelection } from "./useSelection";
import { BoundingBox } from "../Types/BoundingBox";
import { useWindowSize } from "@uidotdev/usehooks";

export function useSVGMapDrag(): [SpringValue<number[]>, (...args: any[]) => ReactDOMAttributes, BoundingBox, number] {
    var viewBox = useViewbox();
    const screenResolution = useWindowSize();
    const baseScreenResolution = { x: screenResolution.width || 1024, y: screenResolution.height || 700 };
    const viewBoxBoundingBox = new BoundingBox(viewBox.y, viewBox.x + baseScreenResolution.x * viewBox.scale, viewBox.y + baseScreenResolution.y * viewBox.scale, viewBox.x).scale(3).grow(500);


    var { isInSelectionMode, startSelection, endSelection } = useSelection();

    const [{ xyz }, api] = useSpring(() => ({ xyz: [viewBox.x, viewBox.y, viewBox.scale] }), [viewBox]);

    const bind = useGesture(
        {
            onDrag: ({ pinching, movement: [mx, my], xy: [x, y], cancel, elapsedTime, ctrlKey }) => {
                //if (pinching) return cancel();
                if (isInSelectionMode) {
                    return null;
                } else {
                    api.start({ xyz: [viewBox.x - mx * viewBox.scale, viewBox.y - my * viewBox.scale, viewBox.scale] });
                }
            },
            onDragStart: ({ ctrlKey, xy: [x, y] }) => {
                if (ctrlKey || isInSelectionMode) {
                    return startSelection([viewBox.x + x * viewBox.scale, viewBox.y + y * viewBox.scale]);
                } else {

                }
                //setIsSelection(false);
            },
            onDragEnd: ({ movement: [mx, my], xy: [x, y], elapsedTime, ctrlKey }) => {
                if (elapsedTime > 1000 && mx + my < 10) {
                    //useRouter.getState().open(Routes.NodeCreation);
                }
                if (isInSelectionMode) {
                    return endSelection([viewBox.x + x * viewBox.scale, viewBox.y + y * viewBox.scale]);
                } else {
                    viewBox.set(viewBox.x - mx * viewBox.scale, viewBox.y - my * viewBox.scale, viewBox.scale);
                }
                //setIsSelection(false);
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

    return [xyz, bind, viewBoxBoundingBox, viewBox.scale];
}
export function computeNewScale(viewbox: { x: number; y: number; scale: number }, scale: number, origin: Vector2): number[] {
    var scaleDiff = viewbox.scale - viewbox.scale / scale;
    return [viewbox.x + origin[0] * scaleDiff, viewbox.y + origin[1] * scaleDiff, viewbox.scale / scale];
}
