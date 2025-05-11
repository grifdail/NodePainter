import { IconBadge3d } from "@tabler/icons-react";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createDefaultValue } from "../../Utils/createDefaultValue";
import { createPortConnection } from "../../Utils/createPortConnection";
import { StatefullVirtualElement } from "../../Utils/statefullContext";
import { VirtualNodes } from "./VirtualNodeTypes/VirtualNodeTypes";

const addNewPort = (node: NodeData) => {
  var count = Object.entries(node.dataInputs).length + 1;
  node.dataInputs[`object-${count}`] = createPortConnection({
    id: `object-${count}`,
    type: "object3d",
    defaultValue: createDefaultValue("object3d"),
  });
};

export const Compose3D: NodeDefinition = {
  id: "Compose3D",
  label: "Compose 3D",
  icon: IconBadge3d,
  description: "Compose an object from multiple object",

  dataInputs: [
    {
      id: "object-1",
      type: "object3d",
      defaultValue: null,
    },
    {
      id: "object-2",
      type: "object3d",
      defaultValue: null,
    },
  ],
  dataOutputs: [
    {
      id: "output",
      type: "object3d",
      defaultValue: null,
    },
  ],
  tags: ["3D"],
  settings: [],
  getData(portId, node, context) {
    var entries = Object.keys(node.dataInputs);
    const id = context.getCallId(node);
    const virtual = VirtualNodes.ComposeVirtualNodeType.generate(
      id,
      entries.map((key) => context.getInputValue(node, key, "object3d") as StatefullVirtualElement<any, any>).filter((item: any) => item)
    );

    return virtual;
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
