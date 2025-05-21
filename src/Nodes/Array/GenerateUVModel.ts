import { IconList, IconPlus } from "@tabler/icons-react";
import p5 from "p5";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2, createVector3 } from "../../Types/vectorDataType";

const createIndexNode = ({ id, positionX, positionY }: NodeData): void => {
  setTimeout(() => {
    useTree.getState().createBlackboardNode(
      [
        {
          type: "vector2",
          key: `${id}-uv`,
          id: "uv",
        },
      ],
      "Generate UV",
      positionX - 400,
      positionY,
      id
    );
  }, 10);
};

export const GenerateUVModel: NodeDefinition = {
  id: "GenerateUVModel",
  description: "Generate a 3D model by mapping a set of 2d coordinate to 3d one",
  featureLevel: 0,
  icon: IconList,
  tags: ["3D"],
  dataInputs: [{ id: "pos", type: "vector3", defaultValue: createVector3(0, 0, 0) }],
  dataOutputs: [{ id: "model", type: "mesh", defaultValue: null }],

  settings: [
    {
      id: "width",
      type: "number",
      defaultValue: 10,
    },
    {
      id: "height",
      type: "number",
      defaultValue: 10,
    },
    { id: "when", type: "dropdown", defaultValue: "Once", options: ["Once", "Per frame", "Everytime"] },
    {
      id: "buttons",
      type: "buttons",
      buttons: [
        {
          label: "Create UV node",
          icon: IconPlus,
          onClick: createIndexNode,
        },
      ],
    },
  ],

  contextMenu: {
    "Create the UV node": createIndexNode,
  },
  getData: (portId, node, context) => {
    const when = node.settings.when;
    const keyCache = `${node.id}-image-cache`;
    const keyComputed = `${node.id}-is-computed`;
    let model = context.blackboard[keyCache];

    let needRedraw = model === null;
    needRedraw ||= when === "Once" && !context.blackboard[keyComputed];
    needRedraw ||= when === "Per frame" && !context.frameBlackboard[keyComputed];
    needRedraw ||= when === "Everytime";
    if (needRedraw) {
      const width = node.settings.width;
      const height = node.settings.height;
      const uvKey = `${node.id}-uv`;
      const firstRun = model == null;
      model = !firstRun ? model : new p5.Geometry(width, height);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          var uv = createVector2(x / (width - 1), y / (height - 1));
          context.blackboard[uvKey] = uv;
          var pos = context.getInputValueVector3(node, "pos");
          const selfId = y * width + x;
          model.vertices[selfId] = new p5.Vector(pos[0], pos[1], pos[2]);

          if (x > 0 && y > 0 && firstRun) {
            const upId = (y - 1) * width + x;
            const leftId = y * width + (x - 1);
            const upLeftId = (y - 1) * width + (x - 1);
            const side = (x + y) % 2 === 0;
            if (side) {
              model.faces.push([selfId, upId, leftId]);
              model.faces.push([upId, upLeftId, leftId]);
            } else {
              model.faces.push([leftId, selfId, upLeftId]);
              model.faces.push([selfId, upId, upLeftId]);
            }
          }
        }
      }
      model.computeNormals();
      model.dirtyFlags.vertices = true;
      model.dirtyFlags.vertexNormals = true;
      context.blackboard[keyCache] = model;
      context.blackboard[keyComputed] = true;
      context.frameBlackboard[keyComputed] = true;
      return model;
    }

    return model;
  },
};
