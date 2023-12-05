import { create } from "zustand";
import { produce } from "immer";

import { nanoid } from "nanoid";
import { ExecutionContext, NodeDefinition, PortDefinition, SettingDefinition } from "../Data/NodeDefinition";
import { NodeLibrary } from "../Data/NodeLibrary";
import { PortType } from "../Data/PortType";

import { persist } from "zustand/middleware";

export type NodeCollection = { [key: string]: NodeData };

export type TreeStore = {
  nodes: NodeCollection;
  editedGraph?: string;
  customNodes: { [key: string]: NodeDefinition };
  getNodeLibrary: () => { [key: string]: NodeDefinition };
  getNodeTypeDefinition: (type: string | NodeData) => NodeDefinition;
  getNode: (id: string) => NodeData;
  getInputPort: (id: string, portId: string) => PortConnection;
  setNodePosition: (id: string, x: number, y: number) => void;
  addNode: (nodeType: string, posX: number, posY: number) => void;
  addEdge: (sourceId: string, sourcePort: string, targetId: string, targetPort: string) => void;
  getPortValue: (nodeId: string, portId: string, context: ExecutionContext) => any;
  removeDataConnection: (node: string, port: string) => void;
  removeOutputConnection: (node: string, port: string) => void;
  setNodeInputValue: (node: string, portId: string, newValue: any) => void;
  setNodeSetting: (node: string, settingId: string, newValue: any) => void;
  resetNode: (node: string) => void;
  deleteNode: (node: string) => void;
  duplicateNode: (node: string) => void;
  reset: () => void;
  load: (source: NodeCollection) => boolean;
  createFunction: (def: NodeDefinition) => void;
  setEditedGraph: (graph: string | undefined) => void;
  enforceValidGraph: () => void;
};

export type NodeData = {
  id: string;
  type: string;
  graph?: string;
  inputs: { [key: string]: PortConnection };
  output: { [key: string]: any };
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
        nodes: { start: createNodeData(NodeLibrary["Start"], 200, 200, "start") } as NodeCollection,
        customNodes: {} as { [key: string]: NodeDefinition },
        getNode(id: string) {
          return get().nodes[id];
        },
        getInputPort(id: string, portId: string) {
          return get().nodes[id].inputs[portId];
        },

        addNode(nodeType: string, posX: number, posY: number) {
          var newNodeData = createNodeData(get().getNodeTypeDefinition(nodeType), posX, posY);
          console.log(newNodeData);
          set(
            produce((state) => {
              state.nodes[newNodeData.id] = newNodeData;
            })
          );
        },
        getNodeTypeDefinition(node: string | NodeData) {
          var type = typeof node === "string" ? node : node.type;
          return NodeLibrary[type] || get().customNodes[type];
        },
        getNodeLibrary() {
          return { ...NodeLibrary, ...get().customNodes };
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
          const nodes = get().nodes;
          const node = nodes[nodeId];
          let def = get().getNodeTypeDefinition(node);
          if (def.executeAs) {
            def = get().getNodeTypeDefinition(def.executeAs);
          }
          if (def.getData) {
            return def.getData(portId, node, context);
          }
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
        setNodeSetting(node, settingId, newValue) {
          set(
            produce((state) => {
              state.nodes[node].settings[settingId] = newValue;
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
              var def = state.getNodeTypeDefinition(state.nodes[node]) as NodeDefinition;

              def.inputPorts.forEach((port) => {
                state.nodes[node].inputs[port.id].hasConnection = false;
                state.nodes[node].inputs[port.id].ownValue = structuredClone(port.defaultValue);
              });

              for (const key in state.nodes[node].output) {
                state.nodes[node].output[key] = null;
              }
              for (const key in def.settings) {
                state.nodes[node].settings[def.settings[key].id] = structuredClone(def.settings[key].defaultValue);
              }
            })
          );
        },
        reset() {
          set({ nodes: { start: createNodeData(get().getNodeTypeDefinition("Start"), 200, 200, "start") }, customNodes: {} });
        },
        load(source) {
          try {
            var nodes: NodeCollection = {};

            Object.entries(source).forEach(([sourceKey, sourceNode]) => {
              var newNode = createNodeData(get().getNodeTypeDefinition(sourceNode.id), sourceNode.positionX || 0, sourceNode.positionY, sourceKey);
              var def = get().getNodeTypeDefinition(newNode);
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
                newNode.settings[key] = structuredClone(sourceNode.settings[key]);
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
        createFunction(def) {
          set(
            produce((state) => {
              var start = `${def.id}-start`;
              var end = `${def.id}-end`;
              state.customNodes[def.id] = def;
              var startNodeDef: NodeDefinition = {
                IsUnique: true,
                hideInLibrary: true,
                description: "",
                id: start,
                tags: [],
                inputPorts: [],
                outputPorts: structuredClone(def.inputPorts),
                executeOutputPorts: def.canBeExecuted ? ["execute"] : [],
                settings: [],
                getData: null,
                execute: null,
                executeAs: "CustomFunction-start",
                canBeExecuted: false,
              };
              var endNodeDef: NodeDefinition = {
                IsUnique: true,
                description: "",
                hideInLibrary: true,
                id: end,
                tags: [],
                inputPorts: structuredClone(def.outputPorts),
                outputPorts: [],
                executeOutputPorts: [],
                settings: [],
                getData: null,
                execute: null,
                executeAs: "CustomFunction-end",
                canBeExecuted: false,
              };
              state.customNodes[start] = startNodeDef;
              state.customNodes[end] = endNodeDef;
              var newStartNode = createNodeData(startNodeDef, 0, 0, start, def.id);
              var newEndNode = createNodeData(endNodeDef, 600, 0, end, def.id);
              state.nodes[start] = newStartNode;
              state.nodes[end] = newEndNode;
              state.editedGraph = def.id;
            })
          );
          get().enforceValidGraph();
        },
        setEditedGraph(graph) {
          set({ editedGraph: graph });
        },
        enforceValidGraph() {
          set(
            produce((state) => {
              for (var node in state.nodes) {
                for (var input in state.nodes[node].inputs) {
                  let port = state.nodes[node].inputs[input] as PortConnection;
                  if (port.hasConnection) {
                    let targetNode = state.nodes[port.connectedNode as string];
                    if (!targetNode) {
                      port.hasConnection = false;
                      port.connectedNode = null;
                      port.connectedPort = null;
                    }
                    let def = state.getNodeTypeDefinition(targetNode);
                    let defPort = def.outputPorts.find((defPort: PortDefinition) => defPort.id === port.connectedPort);
                    if (!defPort || defPort.type !== port.type) {
                      port.hasConnection = false;
                      port.connectedNode = null;
                      port.connectedPort = null;
                    }
                  }
                }
              }
            })
          );
        },
      };
    },

    {
      name: "node-painter-current-tree", // name of the item in the storage (must be unique)
    }
  )
);

function createNodeData(def: NodeDefinition, x: number, y: number, id: string | null = null, graph: string | undefined = undefined): NodeData {
  return {
    type: def.id,
    id: id || nanoid(),
    inputs: def.inputPorts.reduce((old: any, port: PortDefinition) => {
      const connection = createPortConnection(port);
      old[port.id] = connection;
      return old;
    }, {}),
    settings: def.settings.reduce((old: any, setting: SettingDefinition) => {
      old[setting.id] = structuredClone(setting.defaultValue);
      return old;
    }, {}),
    positionX: x,
    positionY: y,
    output: {},
    graph: graph,
  };
}

function createPortConnection(def: PortDefinition): PortConnection {
  return {
    type: def.type,
    ownValue: structuredClone(def.defaultValue),
    hasConnection: false,
    connectedNode: null,
    connectedPort: null,
  };
}
