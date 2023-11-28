import { IconCodePlus, IconPlayerPlayFilled, IconPlayerStopFilled } from "@tabler/icons-react";
import React from "react";
import { TreeStore, getNodeTypeDefinition, useTree } from "../Data/useTree";
import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import { ExecutionContext } from "../Data/NodeDefinition";
import { useToggle } from "@uidotdev/usehooks";
import { usePortSelection } from "../Data/usePortSelection";

type MySketchProps = SketchProps & {
  tree: TreeStore;
};

const sketch: Sketch<MySketchProps> = (p5) => {
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
  };

  p5.setup = () => p5.createCanvas(400, 400);

  p5.updateWithProps = (props) => {
    tree = props.tree;
  };

  p5.draw = () => {
    context.execute("start");
  };
};

export function SketchPreview() {
  var tree = useTree();

  return <ReactP5Wrapper sketch={sketch} tree={tree} />;
}

export function GridUi({ visible, openAddModal }: { visible: boolean; openAddModal: () => void }) {
  const [showPreview, togglePreview] = useToggle(true);

  const portSelection = usePortSelection();
  const nodes = useTree((state) => state.nodes);

  if (!visible) {
    return null;
  }

  return (
    <div className="full-screen-layout grid-ui">
      {portSelection.hasSelection && (
        <div className={`warning-track ${portSelection.type}`}>
          <div>{`${nodes[portSelection.node].type} # ${portSelection.port}`}</div>
          <button onClick={portSelection.reset}>cancel</button>
        </div>
      )}
      <menu>
        <button className="button" onClick={openAddModal}>
          <IconCodePlus></IconCodePlus>
        </button>
        <button className="button" onClick={() => togglePreview()}>
          {showPreview ? <IconPlayerStopFilled /> : <IconPlayerPlayFilled />}
        </button>
      </menu>

      {showPreview && <SketchPreview></SketchPreview>}
    </div>
  );
}
