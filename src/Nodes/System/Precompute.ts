import { IconAssembly, IconPlus } from "@tabler/icons-react";
import { DropdownInput } from "../../Components/Generics/Inputs/DropdownInput";
import { TextInput } from "../../Components/Generics/Inputs/TextInput";
import { DialogData, useDialog } from "../../Hooks/useDialog";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortConnection } from "../../Types/PortConnection";
import { PortDefinition } from "../../Types/PortDefinition";
import { PortType, PortTypeArray } from "../../Types/PortType";
import { createDefaultValue } from "../../Utils/createDefaultValue";
import { createPortConnection } from "../../Utils/createPortConnection";

export const Precompute: NodeDefinition = {
  id: "Precompute",
  description: "Precompute the input before executing the rest of the instruction. The random wont change and may help performance",
  icon: IconAssembly,
  tags: ["Control"],
  dataInputs: [],
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [
    { id: "when", type: "dropdown", defaultValue: "Everytime", options: ["Once", "Per frame", "Everytime"] },
    {
      id: "buttons",
      type: "buttons",
      defaultValue: undefined,
      buttons: [
        {
          label: "Add a new Port",
          icon: IconPlus,
          onClick: (node: NodeData) => addNewPort(node),
        },
      ],
    },
  ],
  canBeExecuted: true,
  getData: (portId, data, context) => {
    const target = context.blackboard[`${data.id}-cache`];
    return target[`${portId}-in`];
  },
  execute: (data, context) => {
    const when = data.settings.when || "Everytime";
    const keyCache = `${data.id}-cache`;
    const keyComputed = `${data.id}-is-computed`;
    let needRedraw = false;
    needRedraw ||= when === "Once" && !context.blackboard[keyComputed];
    needRedraw ||= when === "Per frame" && !context.frameBlackboard[keyComputed];
    needRedraw ||= when === "Everytime";
    if (needRedraw) {
      var fn: (args: [key: string, port: PortConnection]) => [string, any] = ([key, value]) => {
        var v = context.getInputValue(data, key, value.type);
        return [key, v];
      };
      const target = Object.fromEntries(Object.entries(data.dataInputs).map(fn));
      context.blackboard[keyComputed] = true;
      context.frameBlackboard[keyComputed] = true;
      context.blackboard[keyCache] = target;
    }

    context.execute(data.execOutputs["execute"] as string);
  },
  contextMenu: (node) => {
    return {
      ...Object.fromEntries(
        Object.values(node.dataOutputs).map((port: PortDefinition) => [
          `Delete ${port.id}`,
          (node: NodeData) => {
            delete node.dataOutputs[port.id];
            delete node.dataInputs[`${port.id}-in`];
          },
        ])
      ),
      "Add a new port": addNewPort,
      "Remove last port": (node) => {
        var entries = Object.entries(node.dataOutputs);
        if (entries.length > 0) {
          var [key] = entries[entries.length - 1];
          delete node.dataOutputs[key];
          delete node.dataInputs[`${key}-in`];
        }
      },
    };
  },
};

function addNewPort(node: NodeData): void {
  var count = Object.entries(node.dataInputs).length;
  var nodeId = node.id;
  var dialog: DialogData = {
    callback: function (button: any, fieldResult: { [key: string]: any } | undefined): void {
      if (button === "confirm" && fieldResult) {
        useTree.getState().dangerouselyUpdateNode(nodeId, (node: NodeData) => {
          node.dataInputs[`${fieldResult.name}-in`] = createPortConnection({
            id: `${fieldResult.name}-in`,
            type: fieldResult.type as PortType,
            defaultValue: createDefaultValue(fieldResult.type as PortType),
          });
          node.dataOutputs[fieldResult.name] = {
            id: fieldResult.name,
            type: fieldResult.type as PortType,
            defaultValue: createDefaultValue(fieldResult.type as PortType),
          };
        });
      }
    },
    buttons: [
      {
        key: "cancel",
        label: "Cancel",
        style: "invisible",
      },
      {
        key: "confirm",
        label: "Confirm",
        style: "normal",
      },
    ],
    fields: [
      {
        key: "name",
        label: "id",
        input: TextInput,
        defaultValue: `port-${count}`,
      },
      {
        key: "type",
        label: "type",
        input: DropdownInput,
        defaultValue: "number",
        passTrough: { options: PortTypeArray },
      },
    ],
  };
  useDialog.getState().open(dialog);
}
