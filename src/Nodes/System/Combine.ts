import { IconArrowMerge, IconPlus } from "@tabler/icons-react";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { convertTypeValue } from "../../Utils/convertTypeValue";
import { createPortConnection } from "../../Utils/createPortConnection";
import { StatefullVirtualElement } from "../../Utils/StatefullVirtualElement";
import { VirtualNodes } from "../3D/VirtualNodeTypes/VirtualNodeTypes";

const addNewPort = (node: NodeData) => {
  var type = node.selectedType;
  var count = Object.entries(node.dataInputs).length + 1;
  node.dataInputs[`object-${count}`] = createPortConnection({
    id: `object-${count}`,
    type: type,
    defaultValue: PortTypeDefinitions[type].createDefaultValue(),
  });
};

export const Combine: NodeDefinition = {
  id: "Combine",
  label: "Combine",
  icon: IconArrowMerge,
  featureLevel: 101,
  description: "Compose an object from multiple object",

  dataInputs: [Port.drawing2d("object-1"), Port.drawing2d("object-2")],
  dataOutputs: [Port.drawing2d("out")],
  tags: ["3D"],
  settings: [
    {
      id: "buttons",
      type: "buttons",
      buttons: [
        {
          label: "Add new port",
          icon: IconPlus,
          onClick: addNewPort,
        },
      ],
    },
  ],
  availableTypes: ["drawing2d", "object3d"],
  onChangeType(node: NodeData, type: PortType, blackboards: NodeData[]) {
    Object.keys(node.dataInputs).forEach((key) => {
      node.dataInputs[key].ownValue = convertTypeValue(node.dataInputs[key].ownValue, node.dataInputs[key].type, type);
      node.dataInputs[key].type = type;
    });
    Object.keys(node.dataOutputs).forEach((key) => {
      node.dataOutputs[key].type = type;
    });
  },
  getData(portId, node, context) {
    if (node.selectedType === "drawing2d") {
      const entries = Object.keys(node.dataInputs).map((item) => context.getInputValueDrawing(node, item));
      return () => {
        entries.forEach((fn) => fn());
      };
    } else {
      const entries = Object.keys(node.dataInputs);
      const id = context.getCallId(node);
      const virtual = VirtualNodes.ComposeVirtualNodeType.generate(
        id,
        entries.map((key) => context.getInputValue(node, key, "object3d") as StatefullVirtualElement<any, any>).filter((item: any) => item)
      );
      return virtual;
    }
  },
  contextMenu: {
    "Add a port": addNewPort,
    "Remove last port": (node) => {
      var entries = Object.entries(node.dataInputs);
      if (entries.length > 1) {
        var [key] = entries[entries.length - 1];
        delete node.dataInputs[key];
      }
    },
  },
};
