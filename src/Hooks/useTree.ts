import { create } from "zustand";
import { produce } from "immer";

import { nanoid } from "nanoid";
import { ExecutionContext, PortDefinition, SettingDefinition } from "../Data/NodeDefinition";
import { NodeLibrary } from "../Data/NodeLibrary";
import { PortType } from "../Data/PortType";

import { persist } from "zustand/middleware";

export type NodeCollection = { [key: string]: NodeData };

export type TreeStore = {
  nodes: NodeCollection;
  getNode: (id: string) => NodeData;
  getInputPort: (id: string, portId: string) => PortConnection;
  setNodePosition: (id: string, x: number, y: number) => void;
  addNode: (nodeType: string, posX: number, posY: number) => void;
  addEdge: (sourceId: string, sourcePort: string, targetId: string, targetPort: string) => void;
  getPortValue: (nodeId: string, portId: string, context: ExecutionContext) => any;
  removeDataConnection: (node: string, port: string) => void;
  removeOutputConnection: (node: string, port: string) => void;
  setNodeInputValue: (node: string, portId: string, newValue: any) => void;
  resetNode: (node: string) => void;
  deleteNode: (node: string) => void;
  duplicateNode: (node: string) => void;
  reset: () => void;
  load: (source: NodeCollection) => boolean;
};

export type NodeData = {
  id: string;
  type: string;
  inputs: { [key: string]: PortConnection };
  output: { [key: string]: string | null };
  settings: { [key: string]: any };
  positionX: number;
  positionY: number;
};

export type PortConnection = {
  hasConnection: boolean;
  ownValue: any;
  connectedNode: string | null;
  connectedPort: string | null;
  type: PortType;
};

export const useTree = create<TreeStore>()(
  persist(
    (set, get) => {
      return {
        nodes: { start: createNodeData("Start", 200, 200, "start") },
        getNode(id: string) {
          return get().nodes[id];
        },
        getInputPort(id: string, portId: string) {
          return get().nodes[id].inputs[portId];
        },
        addNode(nodeType: string, posX: number, posY: number) {
          var newNodeData = createNodeData(nodeType, posX, posY);
          set(
            produce((state) => {
              state.nodes[newNodeData.id] = newNodeData;
            })
          );
          return newNodeData;
        },
        addEdge(sourceId: string, sourcePort: string, targetId: string, targetPort: string) {
          set(
            produce((tree) => {
              var port = tree.nodes[targetId].inputs[targetPort];
              // eslint-disable-next-line eqeqeq
              if (port != undefined) {
                port.hasConnection = true;
                port.connectedNode = sourceId;
                port.connectedPort = sourcePort;
              } else {
                tree.nodes[sourceId].output[sourcePort] = targetId;
              }
            })
          );
        },
        setNodePosition(id: string, x: number, y: number) {
          set(
            produce((state) => {
              state.nodes[id].positionX = x;
              state.nodes[id].positionY = y;
            })
          );
        },
        getPortValue(nodeId: string, portId: string, context: ExecutionContext) {
          var node = get().nodes[nodeId];
          var def = getNodeTypeDefinition(node);
          return def.getData(portId, node, context);
        },
        removeDataConnection(nodeId, portId) {
          set(
            produce((state) => {
              var port = state.nodes[nodeId].inputs[portId];
              port.hasConnection = false;
              port.connectedNode = null;
              port.connectedPort = null;
            })
          );
        },
        removeOutputConnection(nodeId, portId) {
          set(
            produce((state) => {
              state.nodes[nodeId].output[portId] = null;
            })
          );
        },
        setNodeInputValue(node, portId, newValue) {
          set(
            produce((state) => {
              state.nodes[node].inputs[portId].ownValue = newValue;
            })
          );
        },
        duplicateNode(node) {
          set(
            produce((state) => {
              var sourceNode = state.nodes[node];
              var clone = createNodeData(sourceNode.type, sourceNode.positionX + 50, sourceNode.positionY + 50);
              for (const key in sourceNode.inputs) {
                clone.inputs[key] = {
                  ...sourceNode.inputs[key],
                };
              }
              for (const key in sourceNode.output) {
                clone.output[key] = sourceNode.output[key];
              }
              for (const key in sourceNode.settings) {
                clone.settings[key] = sourceNode.settings[key];
              }
              state.nodes[clone.id] = clone;
            })
          );
        },
        deleteNode(node) {
          set(
            produce((state) => {
              var nodes = state.nodes as { [key: string]: NodeData };

              Object.values(nodes).forEach((item: NodeData) => {
                Object.values(item.inputs).forEach((port) => {
                  if (port.hasConnection && port.connectedNode === node) {
                    port.hasConnection = false;
                    port.connectedNode = null;
                    port.connectedPort = null;
                  }
                });
                Object.entries(item.output).forEach(([key, target]) => {
                  if (target === node) {
                    item.output[target] = null;
                  }
                });
              });
              delete state.nodes[node];
            })
          );
        },
        resetNode(node) {
          set(
            produce((state) => {
              var sourceNode = state.nodes[node] as NodeData;
              var def = getNodeTypeDefinition(sourceNode);
              def.inputPorts.forEach((port) => {
                sourceNode.inputs[port.id].hasConnection = false;
                sourceNode.inputs[port.id].ownValue = port.defaultValue;
              });

              for (const key in sourceNode.output) {
                sourceNode.output[key] = null;
              }
              for (const key in def.settings) {
                sourceNode.settings[key] = def.settings[key].defaultValue;
              }
            })
          );
        },
        reset() {
          set({ nodes: { start: createNodeData("Start", 200, 200, "start") } });
        },
        load(source) {
          try {
            var nodes: NodeCollection = {};
            Object.entries(source).forEach(([sourceKey, sourceNode]) => {
              var newNode = createNodeData(sourceNode.type, sourceNode.positionX || 0, sourceNode.positionY, sourceKey);
              var def = getNodeTypeDefinition(newNode);
              if (!def) {
                throw new Error("No node of that type");
              }
              for (const key in sourceNode.inputs) {
                var inputDef = def.inputPorts.find((item) => item.id === key);
                if (!inputDef) {
                  throw new Error("invalid input port");
                }

                newNode.inputs[key] = {
                  ...sourceNode.inputs[key],
                };
              }
              for (const key in sourceNode.output) {
                newNode.output[key] = sourceNode.output[key];
              }
              for (const key in sourceNode.settings) {
                newNode.settings[key] = sourceNode.settings[key];
              }
              nodes[newNode.id] = newNode;
            });
            set({ nodes });
            return true;
          } catch (err) {
            console.error("Error loading save", err);
            return false;
          }
        },
      };
    },
    {
      name: "node-painter-current-tree", // name of the item in the storage (must be unique)
    }
  )
);

function createNodeData(nodeType: string, x: number, y: number, id: string | null = null): NodeData {
  const def = NodeLibrary[nodeType];
  return {
    type: nodeType,
    id: id || nanoid(),
    inputs: def.inputPorts.reduce((old: any, port: PortDefinition) => {
      const connection = createPortConnection(port);
      old[port.id] = connection;
      return old;
    }, {}),
    settings: def.settings.reduce((old: any, setting: SettingDefinition) => {
      old[setting.id] = setting.defaultValue;
      return old;
    }, {}),
    positionX: x,
    positionY: y,
    output: {},
  };
}

function createPortConnection(def: PortDefinition): PortConnection {
  return {
    type: def.type,
    ownValue: def.defaultValue,
    hasConnection: false,
    connectedNode: null,
    connectedPort: null,
  };
}

export function getNodeTypeDefinition(nodeData: NodeData) {
  return NodeLibrary[nodeData.type];
}
