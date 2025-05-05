import { IconPhoto } from "@tabler/icons-react";
import { Graphics } from "p5";
import * as THREE from "three";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Color, createColor, createVector3, Vector3 } from "../../Types/vectorDataType";
import { toThreeColorWithAlpha } from "../../Utils/colorUtils";
import { StatefullElementType, StatefullInstance, StatefullVirtualElement } from "../../Utils/statefullContext";

export const Render3D: NodeDefinition = {
  id: "Render3D",
  label: "Render in 3D",
  icon: IconPhoto,
  description: "Render the 'draw' port in 3dimension image you can use in the 'execute' port.",
  canBeExecuted: false,
  executeOutputs: [],
  dataInputs: [
    {
      id: "fov",
      type: "number",
      defaultValue: 800,
    },
    {
      id: "cameraPosition",
      type: "vector3",
      defaultValue: createVector3(0, 0, -10),
    },
    {
      id: "cameraRotation",
      type: "vector3",
      defaultValue: createVector3(0, 0, 0),
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
    const cameraRotation = context.getInputValueVector3(node, "cameraRotation");
    const cameraPosition = context.getInputValueVector3(node, "cameraPosition");
    const clearColor = context.getInputValueColor(node, "clearColor");
    const child = context.getInputValue(node, "scene", "object3d") as StatefullVirtualElement<any, any>;

    const id = context.getCallId(node, width, height);
    const virtual = new StatefullVirtualElement(id, Render3DStatefullTemplate, [child], width, height, fov, cameraPosition, cameraRotation, clearColor);

    const keyCache = `${node.id}-cache`;
    let threeContext = context.blackboard[keyCache] as StatefullInstance<ThreeJSContext, Render3DProps> | undefined;

    if (!threeContext) {
      threeContext = new StatefullInstance(virtual);
      context.blackboard[keyCache] = threeContext;
    }

    threeContext.update(virtual, threeContext.instance.scene);

    threeContext.instance.renderer.render(threeContext.instance.scene, threeContext.instance.camera);

    return threeContext.instance.imageData;
  },
};

type ThreeJSContext = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  imageData: ImageData;
  parent: THREE.Object3D;
};

type Render3DProps = [width: number, height: number, fov: number, cameraPosition: Vector3, cameraRotation: Vector3, clearColor: Color];
const Render3DStatefullTemplate: StatefullElementType<ThreeJSContext, Render3DProps> = {
  create: function (width: number, height: number, fov: number, cameraPosition: Vector3, cameraRotation: Vector3): ThreeJSContext {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const imageData = new ImageData();
    renderer.setSize(width, height);
    imageData.set({ width: width, height: height, elt: renderer.domElement } as Graphics);
    return { renderer, scene, camera, imageData, parent: scene };
  },
  remove: function (element: ThreeJSContext): void {
    element.renderer.dispose();
  },
  update: function (element: ThreeJSContext, width: number, height: number, fov: number, cameraPosition: Vector3, cameraRotation: Vector3, clearColor: Color): void {
    element.camera.fov = fov;
    element.camera.position.set(...cameraPosition);
    element.camera.rotation.set(...cameraRotation);
    element.renderer.setClearColor(...toThreeColorWithAlpha(clearColor));
  },
  mountChildren(element, child) {
    element.scene.add(child);
    console.log(child);
  },
  unmountChildren(element, child) {
    console.log("aaaaaaaaaaaaaaaaaaaaaa");
    element.scene.remove(child);
  },
};
