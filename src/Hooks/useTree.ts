import { current, original, produce } from "immer";
import { create } from "zustand";

import { NodeDefinition } from "../Types/NodeDefinition";

import { persist } from "zustand/middleware";
import { CUSTOM_FUNCTION } from "../Nodes/CustomFunction/CustomFunction";
import { CUSTOM_SIMULATION } from "../Nodes/CustomFunction/CustomSimulation";
import { NodeLibrary } from "../Nodes/Nodes";
import { CUSTOM_SHADER } from "../Nodes/Shaders/RenderShader";
import { START_NODE } from "../Nodes/System/StartNode";
import { EDirection } from "../Types/EDirection";
import { NodeCollection } from "../Types/NodeCollection";
import { NodeData } from "../Types/NodeData";
import { PortConnection } from "../Types/PortConnection";
import { PortDefinition } from "../Types/PortDefinition";
import { TreeStore } from "../Types/TreeStore";
import { createColor, createVector2 } from "../Types/vectorDataType";
import { createDataOutputData } from "../Utils/createDataOutputData";
import { createDefaultNodeConnection } from "../Utils/createDefaultNodeConnection";
import { createExecOutputData } from "../Utils/createExecOutputData";
import { ExecutionContext } from "../Utils/createExecutionContext";
import { createNodeData } from "../Utils/createNodeData";
import { createPortConnection } from "../Utils/createPortConnection";
import { createPortConnectionsForInputsDefinition } from "../Utils/createPortConnectionsForInputsDefinition";
import { createSettingObjectForSettingDefinition } from "../Utils/createSettingObjectForSettingDefinition";
import { ensureValidGraph } from "../Utils/ensureValidGraph";
import { resetCamera } from "../Utils/resetCamera";
import { createFunction, getCustomFunctionEndId, getCustomFunctionStartId } from "./createFunction";
import { createNewFunctionDefinition } from "./useCustomNodeCreationContext";

export const useTree = create<TreeStore>()(
  persist(
    (set, get) => {
      const a: TreeStore = {
        nodes: createDefaultNodeConnection(),
        customNodes: {} as { [key: string]: NodeDefinition },
        globalSettings: {},
        key: 0,
        getNode(id: string) {
          return get().nodes[id];
        },
        getInputPort(id: string, portId: string) {
          return get().nodes[id].dataInputs[portId];
        },
        getOutputPort(id: string, portId: string) {
          return get().nodes[id].dataOutputs[portId];
        },
        getSketchName() {
          return get().nodes[START_NODE].settings["name"] as string;
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
        setGlobalSetting(settingId, newValue) {
          set((state) => ({ globalSettings: { ...state.globalSettings, [settingId]: newValue } }));
        },
        executeCallback(nodeId, fn) {
          set(
            produce((state) => {
              fn(state.nodes[nodeId], state as TreeStore);
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
              clone.selectedType = sourceNode.selectedType;
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
              state.key++;
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
          set({ nodes: createDefaultNodeConnection(), customNodes: {}, editedGraph: undefined, globalSettings: {}, key: Math.random() });
          resetCamera();
        },
        loadTemplate(temp) {
          set({ nodes: structuredClone(temp.nodes), customNodes: structuredClone(temp.customNodes), editedGraph: temp.editedGraph, globalSettings: temp.globalSettings || {}, key: Math.random() });
          resetCamera();
          return true;
        },
        exportTemplate() {
          var t = get();
          return structuredClone({ nodes: t.nodes, customNodes: t.customNodes, globalSettings: t.globalSettings, editedGraph: undefined });
        },
        createFunction(def) {
          set(
            produce((state) => {
              createFunction(def, state);
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
        createSimulation(def) {
          set(
            produce((state) => {
              const start = `${def.id}-start`;
              const end = `${def.id}-end`;
              const node: NodeDefinition = {
                ...def,
                dataInputs: [{ id: "progress", type: "number", defaultValue: 0 }, ...structuredClone(def.dataInputs), ...structuredClone(def.dataOutputs)],
              };
              state.customNodes[def.id] = node;
              const startNodeDef: NodeDefinition = {
                IsUnique: true,
                hideInLibrary: true,
                description: "",
                id: start,
                tags: [],
                dataInputs: [],
                dataOutputs: [...structuredClone(def.dataInputs), ...structuredClone(def.dataOutputs)],
                executeOutputs: [],
                settings: [],
                executeAs: "CustomSimulation-start",
                canBeExecuted: false,
              };
              const endNodeDef: NodeDefinition = {
                IsUnique: true,
                description: "",
                hideInLibrary: true,
                id: end,
                tags: [],
                dataInputs: [...structuredClone(def.dataOutputs)],
                dataOutputs: [],
                executeOutputs: [],
                settings: [],
                executeAs: "CustomSimulation-end",
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
              resetCamera();
            })
          );
          get().enforceValidGraph();
        },
        setEditedGraph(graph) {
          set({ editedGraph: graph, key: Math.random() });
        },
        enforceValidGraph() {
          set(
            produce((state) => {
              ensureValidGraph(state);
            })
          );
        },
        getCustomNodeEditingType() {
          var tree = get();
          if (tree.editedGraph === undefined || tree.editedGraph === "main") {
            return "function";
          }
          var executeAs = tree.getNodeTypeDefinition(tree.editedGraph).executeAs;
          switch (executeAs) {
            case CUSTOM_SHADER:
              return "shader";
            case CUSTOM_SIMULATION:
              return "simulation";
            case CUSTOM_FUNCTION:
              return "function";
            default:
              return "function";
          }
        },
        createFunctionFromNodes(selectedNodesId, id) {
          set(
            produce((_state) => {
              const state = _state as TreeStore;
              state.key++;
              const currentGraph = state.editedGraph;
              const selectedNodes = selectedNodesId.map((x) => state.nodes[x]);
              const inputs = selectedNodes.flatMap((node) => {
                return Object.values(node.dataInputs).flatMap((port) => (port.hasConnection && !selectedNodes.some((item) => item.id === port.connectedNode) ? [{ node, port: structuredClone(current(port)), portId: port.id }] : []));
              });
              const canBeExecuted = selectedNodes.some((node) => get().getNodeTypeDefinition(node).canBeExecuted);
              const outputs = Object.values(state.nodes).flatMap((node) => {
                if (selectedNodes.some((item) => item.id === node.id)) {
                  return [];
                }
                return Object.values(node.dataInputs).flatMap((port) => (port.hasConnection && selectedNodes.some((item) => item.id === port.connectedNode) ? [{ node, port: structuredClone(current(port)), portId: port.id }] : []));
              });

              const nodeDef = createNewFunctionDefinition("function");
              nodeDef.id = id;
              nodeDef.dataInputs = preparePortForFunctions(inputs);
              nodeDef.dataOutputs = preparePortForFunctions(outputs);
              nodeDef.canBeExecuted = canBeExecuted;

              createFunction(nodeDef, state);
              const newNode = createNodeData(
                nodeDef,
                selectedNodes.reduce((o, n) => o + n.positionX / selectedNodes.length, 0),
                selectedNodes.reduce((o, n) => o + n.positionY / selectedNodes.length, 0),
                null,
                currentGraph
              );
              state.nodes[newNode.id] = newNode;
              selectedNodes.forEach((item) => {
                item.graph = id;
              });
              inputs.forEach(({ node, port, portId }) => {
                node.dataInputs[port.id].connectedNode = getCustomFunctionStartId(nodeDef);
                node.dataInputs[port.id].connectedPort = portId;
                newNode.dataInputs[portId].hasConnection = true;
                newNode.dataInputs[portId].connectedNode = port.connectedNode;
                newNode.dataInputs[portId].connectedPort = port.connectedPort;
              });
              var endNode = state.nodes[getCustomFunctionEndId(nodeDef)];
              var startNode = state.nodes[getCustomFunctionStartId(nodeDef)];
              outputs.forEach(({ node, port, portId }) => {
                node.dataInputs[port.id].connectedNode = newNode.id;
                node.dataInputs[port.id].connectedPort = portId;
                endNode.dataInputs[portId].hasConnection = true;
                endNode.dataInputs[portId].connectedNode = port.connectedNode;
                endNode.dataInputs[portId].connectedPort = port.connectedPort;
              });
              Object.keys(state.nodes).forEach((nodeId) => {
                const node = state.nodes[nodeId];
                if (nodeId === startNode.id) {
                  return;
                }
                if (selectedNodesId.includes(nodeId)) {
                  Object.entries(node.execOutputs).forEach(([portKey, target]) => {
                    if (target != null && !selectedNodesId.includes(target)) {
                      node.execOutputs[portKey] = null;
                    }
                  });
                } else {
                  Object.entries(node.execOutputs).forEach(([portKey, target]) => {
                    if (target != null && selectedNodesId.includes(target)) {
                      startNode.execOutputs["execute"] = target;
                      node.execOutputs[portKey] = newNode.id;
                    }
                  });
                }
              });
              resetCamera();
            })
          );
          return true;
        },
        exportCustomeFunction(id) {
          var state = get();

          var obj = {
            nodes: Object.fromEntries(
              Object.values(state.nodes)
                .filter((node) => node.graph === id)
                .map((item) => [item.id, structuredClone(item)])
            ),
            definitions: [state.customNodes[id], state.customNodes[getCustomFunctionEndId(id)], state.customNodes[getCustomFunctionStartId(id)]],
          };

          return obj;
        },
        loadCustomeFunction(customFunctionData) {
          set((state) => ({
            nodes: { ...state.nodes, ...customFunctionData.nodes },
            customNodes: { ...state.customNodes, ...Object.fromEntries(customFunctionData.definitions.map((item) => [item.id, item])) },
          }));
          resetCamera();
        },
        freeSpace(direction, amount, offsetX, offsetY) {
          set(
            produce((state) => {
              Object.entries(state.nodes as NodeCollection).forEach(([key, node]) => {
                if (node.graph === state.editedGraph) {
                  if (direction & EDirection.Horizontal) {
                    if (node.positionX < offsetX) {
                      state.nodes[key].positionX -= amount;
                    } else {
                      state.nodes[key].positionX += amount;
                    }
                  }
                  if (direction & EDirection.Vertical) {
                    if (node.positionY < offsetY) {
                      state.nodes[key].positionY -= amount;
                    } else {
                      state.nodes[key].positionY += amount;
                    }
                  }
                }
              });
            })
          );
        },
        createBlackboardNode(type, key, name, x, y) {
          const newNodeData = createNodeData(get().getNodeTypeDefinition("Blackboard"), x, y);
          newNodeData.graph = get().editedGraph;
          newNodeData.label = name;
          newNodeData.dataOutputs["value"].type = type;
          newNodeData.settings.key = key;
          console.log(newNodeData);
          set((state) => ({ nodes: { ...state.nodes, [newNodeData.id]: newNodeData } }));
        },
      };
      return a;
    },

    {
      name: "node-painter-current-tree", // name of the item in the storage (must be unique)
    }
  )
);
function preparePortForFunctions(inputs: { node: NodeData; port: PortConnection; portId: string }[]): PortDefinition[] {
  var dic: { [key: string]: number } = {};

  return inputs.map((element) => {
    dic[element.portId] = dic[element.portId] !== undefined ? dic[element.portId] + 1 : 0;
    element.portId = dic[element.portId] > 0 ? `${element.port.id}_${dic[element.portId]}` : element.port.id;
    return {
      id: element.portId,
      defaultValue: element.port.ownValue,
      type: element.port.type,
      label: element.port.label,
    };
  });
}
