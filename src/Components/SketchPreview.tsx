import React from "react";
import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import { NodeData, TreeStore, getNodeTypeDefinition, useTree } from "../Hooks/useTree";
import { ExecutionContext } from "../Data/NodeDefinition";
import styled from "styled-components";
import { useWindowSize } from "@uidotdev/usehooks";

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
    width: 404px;
    height: 404px;
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

  var smallestDim = Math.min(1, Math.min(dim.width || 400, dim.height || 400) / 450);
  return (
    <Preview scale={smallestDim}>
      <ReactP5Wrapper sketch={sketch} tree={tree} />
    </Preview>
  );
}
type MySketchProps = SketchProps & {
  tree: TreeStore;
};

export const sketch: Sketch<MySketchProps> = (p5) => {
  let tree: TreeStore | null = null;
  var context: ExecutionContext = {
    p5: p5 as P5CanvasInstance,
    blackboard: {},
    execute(nodeId) {
      var node = tree?.nodes[nodeId];
      if (node != null) {
        var def = getNodeTypeDefinition(node);
        if (def.execute) {
          def.execute(node, context);
        }
      }
    },
    getNodeOutput(nodeId, portId) {
      return tree?.getPortValue(nodeId, portId, context);
    },
    getInputValue(nodeData: NodeData, portId: string) {
      const inputPorts = nodeData.inputs[portId];
      if (inputPorts.hasConnection) {
        return context.getNodeOutput(inputPorts.connectedNode as string, inputPorts.connectedPort as string);
      } else {
        return inputPorts.ownValue;
      }
    },
  };

  p5.setup = () => p5.createCanvas(400, 400);

  p5.updateWithProps = (props: MySketchProps) => {
    tree = props.tree;
  };

  p5.draw = () => {
    context.execute("start");
  };
};

export function getInputValue(nodeData: NodeData, portId: string, context: ExecutionContext) {
  const inputPorts = nodeData.inputs[portId];
  if (inputPorts.hasConnection) {
    return context.getNodeOutput(inputPorts.connectedNode as string, inputPorts.connectedPort as string);
  } else {
    return inputPorts.ownValue;
  }
}
