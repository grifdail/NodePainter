import React from "react";
import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import { NodeCollection, NodeData, TreeStore, useTree } from "../Hooks/useTree";
import { ExecutionContext } from "../Data/NodeDefinition";
import styled from "styled-components";
import { useWindowSize } from "@uidotdev/usehooks";
import { START_NODE } from "../Nodes/System";

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
  var context: ExecutionContext = createExecutionContext(tree, p5 as P5CanvasInstance);
  var seed = 0;

  p5.setup = () => p5.createCanvas(400, 400);

  p5.updateWithProps = (props: MySketchProps) => {
    tree = props.tree;
    context = createExecutionContext(tree, p5 as P5CanvasInstance);
    seed = Date.now();
  };

  p5.draw = () => {
    context.frameBlackboard = {};
    p5.randomSeed(seed);
    context.time = p5.millis();
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
export function createExecutionContext(tree: TreeStore | null, p5: P5CanvasInstance): ExecutionContext {
  var context: ExecutionContext = {
    p5: p5 as P5CanvasInstance,
    time: 0,
    blackboard: {},
    frameBlackboard: {},
    functionStack: [],
    progress: undefined,
    execute(nodeId) {
      var node = tree?.nodes[nodeId];
      if (node != null) {
        let def = tree?.getNodeTypeDefinition(node);
        if (def) {
          if (def.executeAs) {
            def = tree?.getNodeTypeDefinition(def.executeAs);
          }
          if (def?.execute) {
            def.execute(node, context);
          }
        } else {
          throw new Error("Trying to execute a node of unknow type");
        }
      }
    },

    getNodeOutput(nodeId, portId) {
      return tree?.getPortValue(nodeId, portId, context);
    },
    getInputValue(nodeData: NodeData, portId: string) {
      const inputPorts = nodeData.dataInputs[portId];
      if (inputPorts.hasConnection) {
        return context.getNodeOutput(inputPorts.connectedNode as string, inputPorts.connectedPort as string);
      } else {
        return inputPorts.ownValue;
      }
    },
    createFunctionContext(node: NodeData, context: ExecutionContext) {
      return Object.fromEntries(
        Object.keys(node.dataInputs).map((key) => {
          return [key, context.getInputValue(node, key)];
        })
      );
    },
    findNodeOfType(type) {
      const nodes = tree?.nodes as NodeCollection;
      for (let key in nodes) {
        if (nodes[key].type === type) {
          return key;
        }
      }
      return null;
    },
  };
  return context;
}
