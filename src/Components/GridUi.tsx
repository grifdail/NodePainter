import { IconCodePlus, IconPlayerPlayFilled, IconPlayerStopFilled } from "@tabler/icons-react";
import React from "react";
import { TreeStore, getNodeTypeDefinition, useTree } from "../Data/stores";
import { P5CanvasInstance, ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import { ExecutionContext } from "../Data/NodeDefinition";
import { useToggle } from "@uidotdev/usehooks";

type MySketchProps = SketchProps & {
  tree: TreeStore;
};

const sketch: Sketch<MySketchProps> = (p5) => {
  let tree: TreeStore | null = null;

  p5.setup = () => p5.createCanvas(400, 400);

  p5.updateWithProps = (props) => {
    console.log(tree);
    tree = props.tree;
  };

  p5.draw = () => {
    var context: ExecutionContext = {
      p5: p5 as P5CanvasInstance,
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
        tree?.getPortValue(nodeId, portId, context);
      },
    };

    context.execute("start");
  };
};

export function SketchPreview() {
  var tree = useTree();

  return <ReactP5Wrapper sketch={sketch} tree={tree} />;
}

export function GridUi({ visible, openAddModal }: { visible: boolean; openAddModal: () => void }) {
  const [showPreview, togglePreview] = useToggle(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="full-screen-layout grid-ui">
      <menu>
        <button className="button" onClick={openAddModal}>
          <IconCodePlus></IconCodePlus>
        </button>
        <button className="button" onClick={() => togglePreview}>
          {showPreview ? <IconPlayerStopFilled /> : <IconPlayerPlayFilled />}
        </button>
      </menu>

      {showPreview && <SketchPreview></SketchPreview>}
    </div>
  );
}
