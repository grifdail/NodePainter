import React from "react";
import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import { useTree } from "../Hooks/useTree";
import { TreeStore } from "../Types/TreeStore";
import { NodeData } from "../Types/NodeData";
import { ExecutionContext } from "../Utils/createExecutionContext";
import styled from "styled-components";
import { useWindowSize } from "@uidotdev/usehooks";
import { START_NODE } from "../Nodes/System/StartNode";
import { createExecutionContext } from "../Utils/createExecutionContext";
import Rand from "rand-seed";

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

export function SketchPreview() {
  var tree = useTree();
  var dim = useWindowSize();
  var start = tree.getNode(START_NODE);

  var smallestDim = Math.min(1, Math.min(dim.width || start.settings.width || 400, dim.height || start.settings.height || 400) / 450);
  return (
    <Preview scale={smallestDim}>
      <ReactP5Wrapper
        sketch={sketch}
        tree={tree}
        key={`${start.settings.width} / ${start.settings.height}`}
      />
    </Preview>
  );
}
type MySketchProps = SketchProps & {
  tree: TreeStore;
};

export const sketch: Sketch<MySketchProps> = (p5) => {
  let tree: TreeStore | null = null;
  var context: ExecutionContext = createExecutionContext(tree, p5 as P5CanvasInstance);
  var seed = 0;

  console.log(p5.VERSION);
  p5.setup = () => {};

  p5.updateWithProps = (props: MySketchProps) => {
    tree = props.tree;
    context = createExecutionContext(tree, p5 as P5CanvasInstance);
    seed = Date.now();
    var start = tree.getNode(START_NODE);
    p5.createCanvas(start.settings.width || 400, start.settings.height || 400);
  };

  p5.draw = () => {
    context.frameBlackboard = {};

    context.RNG = new Rand(seed.toString());
    context.time = p5.millis();
    context.deltaTime = p5.deltaTime;
    context.execute(START_NODE);
  };
};

export function getInputValue(nodeData: NodeData, portId: string, context: ExecutionContext) {
  const inputPorts = nodeData.dataInputs[portId];
  if (inputPorts.hasConnection) {
    return context.getNodeOutput(inputPorts.connectedNode as string, inputPorts.connectedPort as string);
  } else {
    return inputPorts.ownValue;
  }
}
