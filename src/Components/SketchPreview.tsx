import React, { useEffect, useRef } from "react";
import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import { useTree } from "../Hooks/useTree";
import { TreeStore } from "../Types/TreeStore";
import { NodeData } from "../Types/NodeData";
import { ExecutionContext } from "../Utils/graph/execution/createExecutionContext";
import styled from "styled-components";
import { useWindowSize } from "@uidotdev/usehooks";
import { createExecutionContext } from "../Utils/graph/execution/createExecutionContext";
import Rand from "rand-seed";
import { useDialog } from "../Hooks/useDialog";
import { START_NODE } from "../Nodes/StartNode";
import { SketchData } from "../Types/SketchData";

const Preview = styled.div<{ scale: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: end;
  padding: 20px;

  & div {
    border: 2px solid black;
    //width: 404px;
    //height: 404px;
    padding: 0;
    margin: 0;
    position: relative;
    font-size: 0;
    line-height: 0;
    & canvas {
      padding: 0;
      margin: 0;
    }
  }

  @media (max-width: 800px), (max-height: 800px) {
    justify-content: center;
    align-items: center;
    background-color: white;

    & div {
      transform: scale(${(state) => state.scale});
    }
  }
`;

export function SketchPreview({ close }: { close: () => void }) {
  var tree = useTree();
  var dim = useWindowSize();
  var start = tree.getNode(START_NODE);
  var cleanup = useRef(() => { });

  useEffect(() => {
    return () => {
      if (cleanup.current) {
        cleanup.current();
      }
    };
  }, []);

  var smallestDim = Math.min(1, Math.min(dim.width || start.settings.width || 400, dim.height || start.settings.height || 400) / 450);
  return (
    <Preview
      scale={smallestDim}
      id="SketchPreview">
      <ReactP5Wrapper
        sketch={sketch}
        tree={tree}
        close={close}
        setCleanup={(cb: any) => (cleanup.current = cb)}
        key={`${start.settings.width} / ${start.settings.height}`}
      />
    </Preview>
  );
}
type MySketchProps = SketchProps & {
  tree: TreeStore;
  setCleanup: (cleanup: () => void) => void;
  close: () => {};
};

export const sketch: Sketch<MySketchProps> = (p5) => {
  let tree: TreeStore | null = null;
  var context: ExecutionContext = createExecutionContext(tree as unknown as SketchData, p5 as P5CanvasInstance);
  var seed = 0;
  var close = () => { };
  p5.setup = () => { };

  p5.updateWithProps = (props: MySketchProps) => {
    tree = props.tree;
    if (context) {
      context.endOfRunCleanup();
    }
    context = createExecutionContext(tree, p5 as P5CanvasInstance);
    seed = Date.now();
    var start = tree.getNode(START_NODE);
    p5.createCanvas(start.settings.width || 400, start.settings.height || 400);
    context.RNG = new Rand(seed.toString());
    props.setCleanup(context.endOfRunCleanup);
    close = props.close;
  };

  p5.draw = () => {
    context.frameBlackboard = {};

    context.time = p5.millis();
    context.deltaTime = p5.deltaTime;
    if (tree) {
      try {
        var result = context.getInputValue(tree.getNode(START_NODE), "drawing", "drawing2d");

        if (typeof result === "function") {
          result();
        }
      } catch (err: any) {

        console.error(err);
        useDialog.getState().openError(`There was an error on node **${tree.getNode(context.lastVisitedNode).type}** (\xa0**${context.lastVisitedNode}**\xa0).

\`${err.message}\`
        
        `);
        close();
      }
    }
    context.endOfFrameCleanup();
  };
};
