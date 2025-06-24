import { IconBadge3d } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor } from "../../Types/vectorDataType";
import { Render3DProps, ThreeJSContext } from "./VirtualNodeTypes/Render3DType";
import { StatefullInstance } from "./VirtualNodeTypes/StatefullInstance";
import { StatefullVirtualElement } from "./VirtualNodeTypes/StatefullVirtualElement";
import { VirtualNodes } from "./VirtualNodeTypes/VirtualNodeTypes";

export const Render3D: NodeDefinition = {
  id: "Render3D",
  label: "Render in 3D",
  icon: IconBadge3d,
  description: "Render the 'draw' port in 3dimension image you can use in the 'execute' port.",

  dataInputs: [
    Port.object3d("camera"),
    {
      id: "clearColor",
      type: "color",
      defaultValue: createColor(1, 1, 1, 1),
    },
    {
      id: "scene",
      type: "object3d",
      defaultValue: null,
    },
  ],
  dataOutputs: [
    {
      id: "image",
      type: "image",
      defaultValue: null,
    },
  ],
  tags: ["3D"],
  settings: [
    { id: "width", type: "number", defaultValue: 400 },
    { id: "height", type: "number", defaultValue: 400 },
  ],
  getData(portId, node, context) {
    const width = Math.floor(node.settings.width);
    const height = Math.floor(node.settings.height);
    //Inputs
    const clearColor = context.getInputValueColor(node, "clearColor");
    const child = context.getInputValue(node, "scene", "object3d") as StatefullVirtualElement<any, any>;
    const cameraVirtualElement = context.getInputValue(node, "camera", "object3d") as StatefullVirtualElement<any, any>;

    const id = context.getCallId(node, width, height);
    const virtual = VirtualNodes.Render3DType.generate(id, [cameraVirtualElement, child], width, height, clearColor);

    const keyCache = `${node.id}-cache`;
    let threeContext = context.blackboard[keyCache] as StatefullInstance<ThreeJSContext, Render3DProps> | undefined;

    if (!threeContext) {
      threeContext = new StatefullInstance<ThreeJSContext, Render3DProps>(virtual);
      context.blackboard[keyCache] = threeContext;
    }

    threeContext.update(virtual, threeContext.instance.scene);

    const camera = threeContext.instance.camera || threeContext.instance.defaultCamera;
    threeContext.instance.renderer.render(threeContext.instance.scene, camera);
    return threeContext.instance.imageData;
  },
};
