import { create } from "zustand";
import { current, original, produce } from "immer";

import { nanoid } from "nanoid";
import { NodeDefinition, PortDefinition, SettingDefinition } from "../Data/NodeDefinition";
import { PortType } from "../Data/NodeDefinition";

import { persist } from "zustand/middleware";
import { CUSTOM_SHADER } from "../Nodes/Shaders/RenderShader";
import { START_NODE } from "../Nodes/System/StartNode";
import { NodeLibrary } from "../Nodes";
import { createPortConnection } from "../Data/createPortConnection";
import { resetCamera } from "../Data/resetCamera";
import { ExecutionContext } from "../Data/createExecutionContext";
import { createColor, createVector2 } from "../Data/vectorDataType";
import { canConvert } from "../Data/convertTypeValue";
import { Template } from "./templates";

export type NodeCollection = { [key: string]: NodeData };
export type ShaderData = {
  id: string;
};

export type TreeStore = {
  isEditingShader(): boolean;
  nodes: NodeCollection;
  editedGraph?: string;
  customNodes: { [key: string]: NodeDefinition };
  getNodeLibrary: () => { [key: string]: NodeDefinition };
  getNodeTypeDefinition: (type: string | NodeData) => NodeDefinition;
  getNode: (id: string) => NodeData;
  getInputPort: (id: string, portId: string) => PortConnection;
  getOutputPort: (id: string, portId: string) => PortDefinition;
  setNodePosition: (id: string, x: number, y: number) => void;
  addNode: (nodeType: string, posX: number, posY: number) => void;
  addEdge: (sourceId: string, sourcePort: string, targetId: string, targetPort: string) => void;
  getPortValue: (nodeId: string, portId: string, context: ExecutionContext) => [any, PortType];
  removeDataConnection: (node: string, port: string) => void;
  removeOutputConnection: (node: string, port: string) => void;
  setNodeInputValue: (node: string, portId: string, newValue: any) => void;
  setNodeSetting: (node: string, settingId: string, newValue: any) => void;
  resetNode: (node: string) => void;
  deleteNode: (node: string) => void;
  duplicateNode: (node: string) => void;
  reset: () => void;
  loadTemplate: (temp: Template) => void;
  load: (source: NodeCollection) => boolean;
  createFunction: (def: NodeDefinition) => void;
  createShader(def: NodeDefinition): unknown;
  setEditedGraph: (graph: string | undefined) => void;
  enforceValidGraph: () => void;
  executeCallback: (nodeId: string, fn: (node: NodeData) => void) => void;
  changeNodeType: (id: string, type: PortType) => void;
};

export type NodeData = {
  id: string;
  type: string;
  graph?: string;
  dataInputs: { [key: string]: PortConnection }; //Hold the potential connection to another node
  execOutputs: { [key: string]: string | null }; //Hold the refference to another node
  dataOutputs: { [key: string]: PortDefinition }; //Hold the definition
  settings: { [key: string]: any };
  positionX: number;
  positionY: number;
  selectedType: PortType;
};

export type PortConnection = {
  label?: string;
  id: string;
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
        nodes: createDefaultNodeConnection(),
        shaders: [],
        customNodes: {} as { [key: string]: NodeDefinition },
        getNode(id: string) {
          return get().nodes[id];
        },
        getInputPort(id: string, portId: string) {
          return get().nodes[id].dataInputs[portId];
        },
        getOutputPort(id: string, portId: string) {
          return get().nodes[id].dataOutputs[portId];
        },

        addNode(nodeType: string, posX: number, posY: number) {
          const newNodeData = createNodeData(get().getNodeTypeDefinition(nodeType), posX, posY);
          newNodeData.graph = get().editedGraph;
          set(
            produce((state) => {
              state.nodes[newNodeData.id] = newNodeData;
            })
          );
        },
        getNodeTypeDefinition(node: string | NodeData) {
          const type = typeof node === "string" ? node : node.type;
          return NodeLibrary[type] || get().customNodes[type];
        },
        getNodeLibrary() {
          return { ...NodeLibrary, ...get().customNodes };
        },
        addEdge(sourceId: string, sourcePort: string, targetId: string, targetPort: string) {
          set(
            produce((tree) => {
              let node = tree.nodes[targetId] as NodeData;
              const port = node.dataInputs[targetPort];
              // eslint-disable-next-line eqeqeq

              if (port !== undefined) {
                // If were binding data port.
                const def = tree.getNodeTypeDefinition(node);
                if (def.bindPort != null) {
                  const canBind = def.bindPort(targetPort, node, tree.nodes[sourceId].dataOutputs[sourcePort], "outputData");
                  if (!canBind) {
                    return;
                  }
                }
                port.hasConnection = true;
                port.connectedNode = sourceId;
                port.connectedPort = sourcePort;
              } else {
                node = tree.nodes[sourceId] as NodeData;
                const def = tree.getNodeTypeDefinition(node);
                if (def.bindPort != null) {
                  const canBind = def.bindPort(sourcePort, node, null, "outputExec");
                  if (!canBind) {
                    return;
                  }
                }
                tree.nodes[sourceId].execOutputs[sourcePort] = targetId;
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
          var port = node.dataOutputs[portId];
          if (def.getData) {
            return [def.getData(portId, node, context), port.type];
          }
          return [undefined, "unknown"];
        },

        removeDataConnection(nodeId, portId) {
          set(
            produce((state) => {
              const node = state.nodes[nodeId] as NodeData;
              const port = node.dataInputs[portId];
              const def = state.getNodeTypeDefinition(node) as NodeDefinition;
              port.hasConnection = false;
              port.connectedNode = null;
              port.connectedPort = null;
              if (def.unbindPort != null) {
                def.unbindPort(portId, node, "inputData");
              }
            })
          );
        },
        removeOutputConnection(nodeId, portId) {
          set(
            produce((state) => {
              state.nodes[nodeId].execOutputs[portId] = null;
            })
          );
        },
        setNodeInputValue(node, portId, newValue) {
          set(
            produce((state) => {
              state.nodes[node].dataInputs[portId].ownValue = newValue;
            })
          );
        },
        setNodeSetting(nodeId, settingId, newValue) {
          set(
            produce((state) => {
              const node = state.nodes[nodeId];
              node.settings[settingId] = newValue;
              const def = get().getNodeTypeDefinition(node);
              if (def.onSettingChange !== undefined) {
                def.onSettingChange(node, settingId, newValue, get());
              }
            })
          );
        },
        executeCallback(nodeId, fn) {
          set(
            produce((state) => {
              fn(state.nodes[nodeId]);
            })
          );
        },
        duplicateNode(node) {
          set(
            produce((state) => {
              const sourceNode = state.nodes[node] as NodeData;
              const clone = createNodeData(state.getNodeTypeDefinition(sourceNode), sourceNode.positionX + 200, sourceNode.positionY + 50);
              clone.dataInputs = structuredClone(current(sourceNode.dataInputs));
              clone.dataOutputs = structuredClone(current(sourceNode.dataOutputs));
              clone.execOutputs = structuredClone(current(sourceNode.execOutputs));
              clone.settings = structuredClone(current(sourceNode.settings));
              clone.graph = sourceNode.graph;
              state.nodes[clone.id] = clone;
            })
          );
        },
        changeNodeType(nodeId, type) {
          set(
            produce((state) => {
              const sourceNode = state.nodes[nodeId] as NodeData;
              const def = (state as TreeStore).getNodeTypeDefinition(sourceNode);
              if (def.availableTypes && def.availableTypes.includes(type)) {
                if (def.onChangeType) {
                  def.onChangeType(sourceNode, type);
                }
                sourceNode.selectedType = type;
                ensureValidGraph(state);
              }
            })
          );
        },
        deleteNode(node) {
          set(
            produce((state) => {
              const nodes = state.nodes as { [key: string]: NodeData };

              Object.values(nodes).forEach((item: NodeData) => {
                var def = state.getNodeTypeDefinition(item);
                Object.values(item.dataInputs).forEach((port) => {
                  if (port.hasConnection && port.connectedNode === node) {
                    if (def.unbindPort != null) {
                      def.unbindPort(port.id, item, "inputData");
                    }

                    port.hasConnection = false;
                    port.connectedNode = null;
                    port.connectedPort = null;
                  }
                });
                Object.entries(item.execOutputs).forEach(([key, target]) => {
                  if (target === node) {
                    if (def.unbindPort != null) {
                      def.unbindPort(key, item, "outputExecute");
                    }
                    item.execOutputs[key] = null;
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
              const def = state.getNodeTypeDefinition(state.nodes[node]) as NodeDefinition;

              state.nodes[node].inputData = createPortConnectionsForInputsDefinition(def);
              state.nodes[node].outputData = createDataOutputData(def);
              state.nodes[node].settings = createSettingObjectForSettingDefinition(def);
              state.nodes[node].outputExecute = createExecOutputData(def);
            })
          );
        },
        reset() {
          set({ nodes: createDefaultNodeConnection(), customNodes: {}, editedGraph: undefined });
          resetCamera();
        },
        loadTemplate(temp) {
          set({ nodes: structuredClone(temp.nodes), customNodes: structuredClone(temp.customNodes), editedGraph: temp.editedGraph });
          resetCamera();
        },
        load(source) {
          try {
            set({ nodes: source });
            return true;
          } catch (err) {
            console.error("Error loading save", err);
            return false;
          }
        },
        createFunction(def) {
          set(
            produce((state) => {
              const start = `${def.id}-start`;
              const end = `${def.id}-end`;
              state.customNodes[def.id] = def;
              const startNodeDef: NodeDefinition = {
                IsUnique: true,
                hideInLibrary: true,
                description: "",
                id: start,
                tags: [],
                dataInputs: [],
                dataOutputs: structuredClone(def.dataInputs),
                executeOutputs: def.canBeExecuted ? ["execute"] : [],
                settings: [],
                executeAs: "CustomFunction-start",
                canBeExecuted: false,
              };
              const endNodeDef: NodeDefinition = {
                IsUnique: true,
                description: "",
                hideInLibrary: true,
                id: end,
                tags: [],
                dataInputs: structuredClone(def.dataOutputs),
                dataOutputs: [],
                executeOutputs: [],
                settings: [],
                executeAs: "CustomFunction-end",
                canBeExecuted: false,
              };
              state.customNodes[start] = startNodeDef;
              state.customNodes[end] = endNodeDef;
              const newStartNode = createNodeData(startNodeDef, 0, 0, start, def.id);
              const newEndNode = createNodeData(endNodeDef, 600, 0, end, def.id);
              state.nodes[start] = newStartNode;
              state.nodes[end] = newEndNode;
              for (let nodeId in original(state.nodes)) {
                let node = state.nodes[nodeId];
                if (node.type === def.id) {
                  def.dataInputs.forEach((port) => {
                    if (node.dataInputs[port.id] === undefined || node.dataInputs[port.id].type !== port.type) {
                      node.dataInputs[port.id] = createPortConnection(port);
                    }
                  });
                  def.dataOutputs.forEach((port) => {
                    if (node.dataOutputs[port.id] === undefined || node.dataOutputs[port.id].type !== port.type) {
                      node.dataOutputs[port.id] = createPortConnection(port);
                    }
                  });
                }
              }
              state.editedGraph = def.id;
            })
          );
          get().enforceValidGraph();
        },

        createShader(def) {
          set(
            produce((state) => {
              const start = `${def.id}-start`;
              const end = `${def.id}-end`;
              state.customNodes[def.id] = def;
              const startNodeDef: NodeDefinition = {
                IsUnique: true,
                hideInLibrary: true,
                description: "",
                id: start,
                tags: [],
                dataInputs: [],
                dataOutputs: [
                  {
                    id: "uv",
                    type: "vector2",
                    defaultValue: createVector2(),
                  },
                  ...structuredClone(def.dataInputs),
                ],
                executeOutputs: [],
                settings: [],
                executeAs: "CustomShader-start",
                canBeExecuted: false,
              };
              const endNodeDef: NodeDefinition = {
                IsUnique: true,
                description: "",
                hideInLibrary: true,
                id: end,
                tags: [],
                dataInputs: [
                  {
                    id: "color",
                    type: "color",
                    defaultValue: createColor(),
                  },
                ],
                dataOutputs: [],
                executeOutputs: [],
                settings: [],
                executeAs: "CustomShader-end",
                canBeExecuted: false,
              };
              state.customNodes[start] = startNodeDef;
              state.customNodes[end] = endNodeDef;
              const newStartNode = createNodeData(startNodeDef, 0, 0, start, def.id);
              const newEndNode = createNodeData(endNodeDef, 600, 0, end, def.id);
              state.nodes[start] = newStartNode;
              state.nodes[end] = newEndNode;
              for (let nodeId in original(state.nodes)) {
                let node = state.nodes[nodeId];
                if (node.type === def.id) {
                  def.dataInputs.forEach((port) => {
                    if (node.dataInputs[port.id] === undefined || node.dataInputs[port.id].type !== port.type) {
                      node.dataInputs[port.id] = createPortConnection(port);
                    }
                  });
                }
              }
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
              ensureValidGraph(state);
            })
          );
        },
        isEditingShader() {
          var tree = get();
          if (tree.editedGraph === undefined || tree.editedGraph === "main") {
            return false;
          }
          return tree.getNodeTypeDefinition(tree.editedGraph).executeAs === CUSTOM_SHADER;
        },
      };
    },

    {
      name: "node-painter-current-tree", // name of the item in the storage (must be unique)
    }
  )
);

function ensureValidGraph(state: any) {
  for (let nodeId in state.nodes) {
    const selfNode = state.nodes[nodeId] as NodeData;
    for (let input in selfNode.dataInputs) {
      let port = selfNode.dataInputs[input] as PortConnection;
      if (port.hasConnection) {
        let targetNode = state.nodes[port.connectedNode as string] as NodeData;
        if (!targetNode) {
          var def = state.getNodeTypeDefinition(selfNode);
          if (def.unbindPort != null) {
            def.unbindPort(port.id, selfNode, "inputData");
          }
          port.hasConnection = false;
          port.connectedNode = null;
          port.connectedPort = null;
        }

        let defPort = targetNode.dataOutputs[port.connectedPort as string];
        if (!defPort || !canConvert(defPort.type, port.type)) {
          port.hasConnection = false;
          port.connectedNode = null;
          port.connectedPort = null;
        }
      }
    }
  }
}

function createNodeData(def: NodeDefinition, x: number, y: number, id: string | null = null, graph: string | undefined = undefined): NodeData {
  return {
    type: def.id,
    id: id || "node" + nanoid().replaceAll("_", "y"),
    dataInputs: createPortConnectionsForInputsDefinition(def),
    settings: createSettingObjectForSettingDefinition(def),
    dataOutputs: createDataOutputData(def),
    execOutputs: createExecOutputData(def),
    positionX: x,
    positionY: y,
    selectedType: def.defaultType ? def.defaultType : def.availableTypes ? def.availableTypes[0] : "unknown",
    graph: graph,
  };
}

function createDataOutputData(def: NodeDefinition): { [key: string]: PortDefinition } {
  return Object.fromEntries(def.dataOutputs.map((port) => [port.id, port]));
}

function createExecOutputData(def: NodeDefinition): { [key: string]: string | null } {
  return Object.fromEntries(def.executeOutputs.map((port) => [port, null]));
}

function createSettingObjectForSettingDefinition(def: NodeDefinition): { [key: string]: any } {
  return def.settings.reduce((old: any, setting: SettingDefinition) => {
    old[setting.id] = structuredClone(setting.defaultValue);
    return old;
  }, {});
}

function createPortConnectionsForInputsDefinition(def: NodeDefinition): { [key: string]: PortConnection } {
  return def.dataInputs.reduce((old: any, port: PortDefinition) => {
    const connection = createPortConnection(port);
    old[port.id] = connection;
    return old;
  }, {});
}

function createDefaultNodeConnection(): NodeCollection {
  const start = createNodeData(NodeLibrary.Start, 0, 0, START_NODE);
  const nthen = createNodeData(NodeLibrary.Then, 400, 0);
  const background = createNodeData(NodeLibrary.FillBackground, 800, 0);
  start.execOutputs.execute = nthen.id;
  nthen.execOutputs[0] = background.id;
  nthen.execOutputs[1] = null;
  return {
    [start.id]: start,
    [nthen.id]: nthen,
    [background.id]: background,
  };
}

console.log(useTree);
