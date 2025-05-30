import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor, createVector3 } from "../../Types/vectorDataType";
import { StatefullInstance } from "../../Utils/StatefullInstance";
import { StatefullVirtualElement } from "../../Utils/StatefullVirtualElement";
import { Render3DProps, ThreeJSContext } from "./VirtualNodeTypes/Render3DType";
import { VirtualNodes } from "./VirtualNodeTypes/VirtualNodeTypes";

export const Render3D: NodeDefinition = {
  id: "Render3D",
  label: "Render in 3D",
  icon: IconPhoto,
  description: "Render the 'draw' port in 3dimension image you can use in the 'execute' port.",

  dataInputs: [
    {
      id: "fov",
      type: "number",
      defaultValue: 60,
      tooltip: "Represent the vertical frustrum angle of the camera in degree",
    },
    {
      id: "cameraPosition",
      type: "vector3",
      defaultValue: createVector3(0, 0, 10),
    },
    {
      id: "cameraRotation",
      type: "quaternion",
      defaultValue: [0, 0, 0, 1],
    },
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
    const fov = context.getInputValueNumber(node, "fov");
    const cameraRotation = context.getInputValueQuaternion(node, "cameraRotation");
    const cameraPosition = context.getInputValueVector3(node, "cameraPosition");
    const clearColor = context.getInputValueColor(node, "clearColor");
    const child = context.getInputValue(node, "scene", "object3d") as StatefullVirtualElement<any, any>;

    const id = context.getCallId(node, width, height);
    const virtual = VirtualNodes.Render3DType.generate(id, [child], width, height, fov, cameraPosition, cameraRotation, clearColor);

    const keyCache = `${node.id}-cache`;
    let threeContext = context.blackboard[keyCache] as StatefullInstance<ThreeJSContext, Render3DProps> | undefined;

    if (!threeContext) {
      console.log(virtual);
      threeContext = new StatefullInstance<ThreeJSContext, Render3DProps>(virtual);
      context.blackboard[keyCache] = threeContext;
    }

    threeContext.update(virtual, threeContext.instance.scene);

    threeContext.instance.renderer.render(threeContext.instance.scene, threeContext.instance.camera);
    return threeContext.instance.imageData;
  },
};
