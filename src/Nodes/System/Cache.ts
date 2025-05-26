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
import { Port } from "../../Types/PortTypeGenerator";
import { Constraints } from "../../Utils/applyConstraints";
import { createDefaultValue } from "../../Utils/createDefaultValue";
import { createPortConnection } from "../../Utils/createPortConnection";
import { createOrSelectFromCache } from "../../Utils/useCache";

export const CacheNode: NodeDefinition = {
  id: "Cache",
  description: "Precompute and cache the input. The randomness wont change and it may help performance",
  icon: IconAssembly,
  tags: ["Control"],
  dataInputs: [Port.number("cache-id", 0, "The first time node is call it will save it result in a cache with this name. After that is will reuse the cache if one already exist instead of generating a new number", [Constraints.Integer()])],
  dataOutputs: [],
  settings: [
    {
      id: "buttons",
      type: "buttons",
      buttons: [
        {
          label: "Add a new Port",
          icon: IconPlus,
          onClick: (node: NodeData) => addNewPort(node),
        },
      ],
    },
  ],
  getData: (portId, data, context) => {
    var target = createOrSelectFromCache(context, data, () => {
      var fn: (args: [key: string, port: PortConnection]) => [string, any] = ([key, value]) => {
        var v = context.getInputValue(data, key, value.type);
        return [key, v];
      };
      return Object.fromEntries(Object.entries(data.dataInputs).map(fn));
    });
    return target[`${portId}-in`];
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
