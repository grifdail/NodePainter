import { current, original, produce } from "immer";
import { create } from "zustand";

import { NodeDefinition } from "../Types/NodeDefinition";

import { BlackboardNode } from "../Nodes/Misc/BlackboardNode";
import { NodeLibrary } from "../Nodes/Nodes";
import { START_NODE } from "../Nodes/StartNode";
import { CustomFunction } from "../Nodes/Technical/CustomFunction/CustomFunction";
import { RenderShader } from "../Nodes/Technical/ImageEffectShader/RenderShader";
import { ShaderMaterial } from "../Nodes/Technical/MaterialShader/ShaderMaterial";
import { CustomSimulation } from "../Nodes/Technical/Simulation/CustomSimulation";
import { CustomSimulationEnd } from "../Nodes/Technical/Simulation/CustomSimulationEnd";
import { CustomSimulationStart } from "../Nodes/Technical/Simulation/CustomSimulationStart";
import { BoundingBox } from "../Types/BoundingBox";
import { EDirection } from "../Types/EDirection";
import { NodeCollection } from "../Types/NodeCollection";
import { NodeData } from "../Types/NodeData";
import { PortConnection } from "../Types/PortConnection";
import { PortDefinition } from "../Types/PortDefinition";
import { PortTypeDefinitions } from "../Types/PortTypeDefinitions";
import { Port } from "../Types/PortTypeGenerator";
import { TreeStore } from "../Types/TreeStore";
import { createColor, createVector2 } from "../Types/vectorDataType";
import { canConvertCode, convertTypeValue } from "../Utils/graph/execution/convertTypeValue";
import { ExecutionContext } from "../Utils/graph/execution/createExecutionContext";
import { getInputPort, getNode, getNodeTypeDefinition, getOutputPort } from "../Utils/graph/execution/getNode";
import { getPortValue } from "../Utils/graph/execution/getPortValue";
import { createDefaultNodeConnection } from "../Utils/graph/modification/createDefaultNodeConnection";
import { createNodeData } from "../Utils/graph/modification/createNodeData";
import { createObjectFromOutputPortDefinition } from "../Utils/graph/modification/createObjectFromOutputPortDefinition";
import { createPortConnection } from "../Utils/graph/modification/createPortConnection";
import { createPortConnectionsForInputsDefinition } from "../Utils/graph/modification/createPortConnectionsForInputsDefinition";
import { createSettingObjectForSettingDefinition } from "../Utils/graph/modification/createSettingObjectForSettingDefinition";
import { duplicateNode } from "../Utils/graph/modification/duplicateNode";
import { ensureValidGraph } from "../Utils/graph/modification/ensureValidGraph";
import { loadSnippet, Snippet } from "../Utils/graph/modification/snippets";
import { sortAroundNode } from "../Utils/graph/modification/sortAroundNode";
import { SAVE_VERSION, upgradeTemplate } from "../Utils/graph/modification/upgradeTemplate";
import { buildBoundingBoxAroundTreeNodes } from "../Utils/ui/buildBoundingBox";
import { resetCamera } from "../Utils/ui/resetCamera";
import { copyInputPortsValues } from "./copyInputPortsValues";
import { createCustomFunction, getCustomFunctionEndId, getCustomFunctionStartId } from "./createFunction";
import { createStructType } from "./createStructType";
import { createNewFunctionDefinition } from "./useCustomNodeCreationContext";
import { usePortSelection } from "./usePortSelection";
import { toastSuccess } from "./useToast";

export const useTree = create<TreeStore>()((set, get) => {
  const a: TreeStore = {
    nodes: createDefaultNodeConnection(),
    customNodes: {} as { [key: string]: NodeDefinition },
    globalSettings: {},
    key: 0,
    nodeDeletionCount: 0,
    getNode(id: string) {
      return getNode(get(), id);
    },
    getInputPort(id: string, portId: string) {
      return getInputPort(get(), id, portId)
    },
    getOutputPort(id: string, portId: string) {
      return getOutputPort(get(), id, portId);
    },
    getSketchName() {
      return get().nodes[START_NODE].settings["name"] as string;
    },
    setSketchName(name) {
      set(
        produce((state) => {
          state.nodes[START_NODE].settings["name"] = name;
        })
      );
    },
    addNode(nodeType: string, posX: number, posY: number, modifier: ((node: NodeData, def: NodeDefinition) => void) | null = null) {
      const def = get().getNodeTypeDefinition(nodeType);
      const newNodeData = createNodeData(def, posX, posY);
      newNodeData.graph = get().editedGraph;
      if (modifier) {
        modifier(newNodeData, def);
      }
      set(
        produce((state) => {
          state.nodes[newNodeData.id] = newNodeData;
        })
      );
      return newNodeData;
    },
    getNodeTypeDefinition(node: string | NodeData) {
      return getNodeTypeDefinition(get(), node);
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
            port.hasConnection = true;
            port.connectedNode = sourceId;
            port.connectedPort = sourcePort;
          } else {
            node = tree.nodes[sourceId] as NodeData;

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
      return getPortValue(get(), nodeId, portId, context)
    },
    removeDataConnection(nodeId, portId) {
      set(
        produce((state) => {
          const node = state.nodes[nodeId] as NodeData;
          const port = node.dataInputs[portId];
          port.hasConnection = false;
          port.connectedNode = null;
          port.connectedPort = null;
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
        produce((state: TreeStore) => {
          const sourceNode = state.nodes[node] as NodeData;
          const newNode = duplicateNode(state, current(sourceNode), sourceNode.positionX + 200, sourceNode.positionY + 50, sourceNode.graph as string);
          state.nodes[newNode.id] = newNode;
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
          var portSelection = usePortSelection.getState();

          if (portSelection.hasSelection && portSelection.node === node) {
            portSelection.reset();
          }

          Object.values(nodes).forEach((item: NodeData) => {
            Object.values(item.dataInputs).forEach((port) => {
              if (port.hasConnection && port.connectedNode === node) {
                port.hasConnection = false;
                port.connectedNode = null;
                port.connectedPort = null;
              }
            });
          });
          state.nodeDeletionCount++;
          delete state.nodes[node];
        })
      );
    },
    deleteNodes(nodes) {
      var deleteNode = get().deleteNode;
      nodes.forEach(deleteNode);
    },
    resetNode(node) {
      set(
        produce((state) => {
          const def = state.getNodeTypeDefinition(state.nodes[node]) as NodeDefinition;

          state.nodes[node].inputData = createPortConnectionsForInputsDefinition(def);
          state.nodes[node].outputData = createObjectFromOutputPortDefinition(def);
          state.nodes[node].settings = createSettingObjectForSettingDefinition(def.settings);
        })
      );
    },
    reset() {
      set({ nodes: createDefaultNodeConnection(), customNodes: {}, editedGraph: undefined, globalSettings: {}, key: Math.random() });
      resetCamera();
    },
    loadTemplate(temp) {
      temp = upgradeTemplate(temp);
      set({ nodes: structuredClone(temp.nodes), customNodes: structuredClone(temp.customNodes), editedGraph: temp.editedGraph, globalSettings: temp.globalSettings || {}, key: Math.random() });
      resetCamera();
      toastSuccess("Sketch loaded !");
      return true;
    },
    exportTemplate() {
      var t = get();
      return structuredClone({ nodes: t.nodes, customNodes: t.customNodes, globalSettings: t.globalSettings, editedGraph: "main", version: SAVE_VERSION });
    },
    createStructType(ports: PortDefinition[], name: string) {
      set(
        produce((state) => {
          createStructType(ports, name, state);
        })
      );
      get().enforceValidGraph();
    },
    createFunction(def) {
      set(
        produce((state) => {
          createCustomFunction(def, state);
        })
      );
      get().enforceValidGraph();
    },

    createShader(def) {
      set(
        produce((state) => {
          const start = `${def.id}-start`;
          const end = `${def.id}-end`;
          const callNodDef: NodeDefinition = {
            ...def,
            dataInputs: [...def.dataInputs, Port.CacheId()],
          };
          state.customNodes[def.id] = callNodDef;
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

            settings: [],
            executeAs: "CustomShader-start",
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

            settings: [],
            executeAs: "CustomShader-end",
          };
          state.customNodes[start] = startNodeDef;
          state.customNodes[end] = endNodeDef;
          const newStartNode = createNodeData(startNodeDef, 0, 0, start, def.id);
          const newEndNode = createNodeData(endNodeDef, 600, 0, end, def.id);
          copyInputPortsValues(state.nodes[end], newEndNode);
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
    createShaderMaterial(def) {
      set(
        produce((state) => {
          const start = `${def.id}-start`;
          const end = `${def.id}-end`;
          const callNodDef: NodeDefinition = {
            ...def,
            dataInputs: [...def.dataInputs],
          };
          state.customNodes[def.id] = callNodDef;
          const startNodeDef: NodeDefinition = {
            IsUnique: true,
            hideInLibrary: true,
            description: "",
            id: start,
            tags: [],
            dataInputs: [],
            dataOutputs: [...structuredClone(def.dataInputs)],

            settings: [],
            executeAs: "ShaderMaterial-start",
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

            settings: [],
            executeAs: "ShaderMaterial-end",
          };
          state.customNodes[start] = startNodeDef;
          state.customNodes[end] = endNodeDef;
          const newStartNode = createNodeData(startNodeDef, 0, 0, start, def.id);
          const newEndNode = createNodeData(endNodeDef, 600, 0, end, def.id);
          copyInputPortsValues(state.nodes[end], newEndNode);
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
    createSimulation(def) {
      set(
        produce((state) => {
          const start = `${def.id}-start`;
          const end = `${def.id}-end`;
          const node: NodeDefinition = {
            ...def,
            dataInputs: [...structuredClone(CustomSimulation.dataInputs), ...structuredClone(def.dataInputs), ...structuredClone(def.dataOutputs)],
            settings: CustomSimulation.settings,
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

            settings: [],
            executeAs: CustomSimulationStart.id,
          };
          const endNodeDef: NodeDefinition = {
            IsUnique: true,
            description: "",
            hideInLibrary: true,
            id: end,
            tags: [],
            dataInputs: [...structuredClone(def.dataOutputs)],
            dataOutputs: [],

            settings: [],
            executeAs: CustomSimulationEnd.id,
          };
          state.customNodes[start] = startNodeDef;
          state.customNodes[end] = endNodeDef;
          const newStartNode = createNodeData(startNodeDef, 0, 0, start, def.id);
          const newEndNode = createNodeData(endNodeDef, 600, 0, end, def.id);
          copyInputPortsValues(state.nodes[end], newEndNode);
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
        case RenderShader.id:
          return "shader";
        case ShaderMaterial.id:
          return "shaderMaterial";
        case CustomSimulation.id:
          return "simulation";
        case CustomFunction.id:
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

          createCustomFunction(nodeDef, state);
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
    createBlackboardNode(ports, name, x, y, pairedNode) {
      const newNodeData = createNodeData(get().getNodeTypeDefinition(BlackboardNode.id), x, y);
      newNodeData.graph = get().editedGraph;
      newNodeData.label = name;
      ports.forEach((element, index) => {
        newNodeData.dataOutputs[element.id] = {
          id: element.id,
          label: element.label || element.id,
          type: element.type,
          defaultValue: PortTypeDefinitions[element.type].createDefaultValue(),
        };
      });
      newNodeData.pairedNode = pairedNode;
      newNodeData.settings.blackboardData = Object.fromEntries(ports.map((port) => [port.id, port]));
      set((state) => ({ nodes: { ...state.nodes, [newNodeData.id]: newNodeData } }));
    },
    dangerouselyUpdateNode(nodeId, cb) {
      set(
        produce((state) => {
          cb(state.nodes[nodeId]);
        })
      );
    },
    sortAroundNode(nodeId) {
      set(produce((state) => sortAroundNode(state, nodeId)));
    },
    replaceInputs(filter, ports) {
      set(
        produce((state) =>
          Object.values(state.nodes as NodeData[]).forEach((node) => {
            if (!filter(node)) {
              return;
            }
            ports.forEach((port) => {
              if (node.dataInputs[port.id]) {
                var oldPort = node.dataInputs[port.id];
                var typeChange = oldPort.type !== port.type;
                oldPort.label = port.label;
                if (typeChange) {
                  oldPort.ownValue = convertTypeValue(oldPort.ownValue, oldPort.type, port.type);

                  if (oldPort.hasConnection) {
                    var targetPort = state.nodes[oldPort.connectedNode as string].dataOutputs[oldPort.connectedPort as string] as PortDefinition;
                    if (!canConvertCode(targetPort.type, port.type)) {
                      oldPort.hasConnection = false;
                      oldPort.connectedNode = null;
                      oldPort.connectedPort = null;
                    }
                  }
                  oldPort.type = port.type;
                }
              } else {
                node.dataInputs[port.id] = createPortConnection(port);
              }
            });

            Object.keys(node.dataInputs)
              .filter((id) => !ports.some((port) => port.id === id))
              .forEach((id) => {
                delete node.dataInputs[id];
              });
          })
        )
      );
    },
    replaceOutput(filter, newPorts) {
      set(
        produce((state) =>
          Object.values(state.nodes as NodeData[]).forEach((node) => {
            if (!filter(node)) {
              return;
            }
            const allInputPorts = Object.values(state.nodes as NodeData[]).flatMap((node: NodeData) => Object.values(node.dataInputs));

            const removeAllConnections = (portId: string, extraFilter?: (port: PortConnection) => boolean) => {
              allInputPorts.forEach((port) => {
                if (port.hasConnection && port.connectedNode === node.id && port.connectedPort === portId && (!extraFilter || extraFilter(port))) {
                  port.hasConnection = false;
                  port.connectedNode = null;
                  port.connectedPort = null;
                }
              });
            };
            newPorts.forEach((newPort) => {
              if (node.dataOutputs[newPort.id]) {
                var oldPort = node.dataOutputs[newPort.id];
                var typeChange = oldPort.type !== newPort.type;
                oldPort.label = newPort.label;
                if (typeChange) {
                  removeAllConnections(newPort.id, (targetPort) => !canConvertCode(targetPort.type, newPort.type));
                  oldPort.type = newPort.type;
                  oldPort.defaultValue = newPort.defaultValue;
                }
              } else {
                node.dataOutputs[newPort.id] = structuredClone(newPort);
              }
            });

            Object.keys(node.dataOutputs)
              .filter((id) => !newPorts.some((port) => port.id === id))
              .forEach((id) => {
                removeAllConnections(id);
                delete node.dataOutputs[id];
              });
          })
        )
      );
    },
    align: function (nodeIds: string[], callback: (boundingBox: BoundingBox, nodes: { node: NodeData; boundingBox: BoundingBox }[]) => void): void {
      if (nodeIds.length <= 1) {
        return;
      }

      set(
        produce((state) => {
          var { bb, nodes } = buildBoundingBoxAroundTreeNodes(nodeIds, state);
          callback(bb, nodes);
        })
      );
    },
    loadSnipets: function (snipets: Snippet, posX: number, posY: number, callback: (arg: Record<string, string>) => void): void {
      set(
        produce((state) => {
          const newNames = loadSnippet(snipets, state, [posX, posY]);
          callback(newNames);
        })
      );
    },
  };
  return a;
});

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
