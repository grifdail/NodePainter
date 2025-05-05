import { IconRectangle } from "@tabler/icons-react";
import { BoxGeometry, BufferGeometry, Material, Mesh, MeshBasicMaterial, NormalBufferAttributes, Object3DEventMap } from "three";
import { MaterialData } from "../../Types/MaterialData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor, createVector3, Vector3 } from "../../Types/vectorDataType";
import { toThreeColor } from "../../Utils/colorUtils";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";
import { StatefullElementType, StatefullVirtualElement } from "../../Utils/statefullContext";

export const DrawBox: NodeDefinition = {
  id: "DrawBox",
  label: "Draw Box",
  description: "Draw a box",
  icon: IconRectangle,
  tags: ["3D"],
  dataInputs: [
    {
      id: "material",
      type: "material",
      defaultValue: createDefaultMaterial(),
    },
    {
      id: "position",
      type: "vector3",
      defaultValue: createVector3(0, 0, 0),
    },
    {
      id: "dimension",
      type: "vector3",
      defaultValue: createVector3(1, 1, 1),
    },
    {
      id: "rotation",
      type: "vector3",
      defaultValue: createVector3(0, 0, 0),
    },
  ],
  dataOutputs: [
    {
      id: "object",
      type: "object3d",
      defaultValue: null,
    },
  ],
  executeOutputs: [],
  settings: [],
  canBeExecuted: false,
  execute: (data, context) => {},
  getData(portId, node, context) {
    var material = context.getInputValueMaterial(node, "material");

    var rotation = context.getInputValueVector3(node, "rotation");
    var position = context.getInputValueVector3(node, "position");
    var dimension = context.getInputValueVector3(node, "dimension");
    const id = context.getCallId(node);
    const virtual = new StatefullVirtualElement<Mesh, boxProps>(id, boxVirtualType, [], material, position, rotation, dimension);
    return virtual;
  },
};

type boxProps = [material: MaterialData | null, position: Vector3, rotation: Vector3, dimension: Vector3];
const boxVirtualType: StatefullElementType<Mesh, boxProps> = {
  create: function (material: MaterialData, position: Vector3, rotation: Vector3, dimension: Vector3): Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> {
    const self = new Mesh(new BoxGeometry(3, 3, 3), new MeshBasicMaterial({ color: toThreeColor(createColor(0.2, 0.3, 1)) }));
    return self;
  },

  update: function (element: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>, material: MaterialData, position: Vector3, rotation: Vector3, dimension: Vector3): void {
    element.position.set(...position);
    element.rotation.set(...rotation);
    element.scale.set(...dimension);
  },
  remove: function (element: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>): void {
    element.geometry.dispose();
  },
};
