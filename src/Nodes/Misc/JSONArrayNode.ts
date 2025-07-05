import { IconEqual } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { createOrSelectFromCache } from "../../Utils/graph/execution/blackboardCache";

export const JSONArrayNode: NodeDefinition = {
  id: "Misc/JSONArray",
  label: "JSON Array",
  description: "Import json list as an array",
  icon: IconEqual,
  tags: ["Misc", "Array"],
  alias: "Constant Redirect",
  dataInputs: [],
  dataOutputs: [
    {
      id: "out",
      type: "array-number",
      defaultValue: 0,
    },
  ],

  settings: [
    {
      type: "text-area",
      id: "json",
      defaultValue: "[]",
      validation(value, node) {
        try {
          const parsed = JSON.parse(value);
          if (!Array.isArray(parsed)) {
            return "Content is not a JSON List";
          }
          if (parsed.length === 0) {
            return null;
          }
          var targetType = node.selectedType;
          if (targetType === "number") {
            if (parsed.some(Number.isNaN)) {
              return "Content is not all number";
            }
            return null;
          }
          const vectorLength = PortTypeDefinitions[targetType].vectorLength;
          if (vectorLength) {
            if (typeof parsed[0] === "number") {
              if (parsed.length % vectorLength !== 0) {
                return "Content cannot be converted to a vector of the right length";
              }
              if (parsed.some(Number.isNaN)) {
                return "Content is not all number";
              }
            } else {
              if (parsed.some((item) => !Array.isArray(item) || item.some(Number.isNaN))) {
                return "Content is not vector";
              }
            }
          }
        } catch (err) {
          return "Invalid JSON";
        }
        return null;
      },
    },
  ],
  ...changeTypeGenerator(["number", "vector2", "vector3", "color", "quaternion"], [], [], [], ["out"]),
  getData: (portId, nodeData, context) => {
    const content = createOrSelectFromCache(
      context,
      nodeData,
      () => {
        try {
          const parsed = JSON.parse(nodeData.settings.json);
          if (!Array.isArray(parsed)) {
            throw new Error("Content is not a JSON List");
          }
          if (parsed.length === 0) {
            return [];
          }
          var targetType = nodeData.selectedType;
          if (targetType === "number") {
            if (parsed.some(Number.isNaN)) {
              return "Content is not all number";
            }
            return parsed;
          }
          const vectorLength = PortTypeDefinitions[targetType].vectorLength;
          if (vectorLength) {
            if (typeof parsed[0] === "number") {
              if (parsed.length % vectorLength !== 0) {
                throw new Error("Content cannot be converted to a vector of the right length");
              }
              if (parsed.some(Number.isNaN)) {
                throw new Error("Content is not all number");
              }
              return parsed.reduce(
                (old, n) => {
                  old.current.push(n);
                  if (old.current.length === vectorLength) {
                    old.list.push(old.current);
                    old.current = [];
                  }
                  return old;
                },
                { list: [], current: [] }
              ).list;
            } else {
              if (parsed.some((item) => !Array.isArray(item) || item.length !== vectorLength || item.some(Number.isNaN))) {
                throw new Error("Content is not vectors");
              }
              return parsed;
            }
          }
        } catch {
          return [];
        }
      },
      "json"
    );
    return content;
  },
};
