import { create } from "zustand";
import { produce } from "immer";
import { ExecutionContext, PortDefinition, SettingDefinition } from "./NodeDefinition";
import { NodeLibrary } from "./NodeLibrary";
import { PortType } from "./PortType";
import { debug } from "console";

export type Viewbox = {
  x: number;
  y: number;
  scale: number;
  set: (x: number, y: number, s: number) => void;
};

export const useViewbox = create<Viewbox>()((set) => ({
  x: 0,
  y: 0,
  scale: 1,
  set: (x, y, scale) => set((state) => ({ x, y, scale })),
}));

export type TreeStore = {
  nodes: { [key: string]: NodeData };
  getNode: (id: string) => NodeData;
  getInputPort: (id: string, portId: string) => PortConnection;
  setNodePosition: (id: string, x: number, y: number) => void;
  addNode: (nodeType: string, posX: number, posY: number) => void;
  addEdge: (sourceId: string, sourcePort: string, targetId: string, targetPort: string) => void;
  getPortValue: (nodeId: string, portId: string, context: ExecutionContext) => any;
  removeDataConnection: (node: string, port: string) => void;
  removeOutputConnection: (node: string, port: string) => void;
  setNodeInputValue: (node: string, portId: string, newValue: any) => void;
};

export type NodeData = {
  id: string;
  type: string;
  inputs: { [key: string]: PortConnection };
  output: { [key: string]: string | null };
  settings: { [key: string]: any };
  blackboard: { [key: string]: any };
  positionX: number;
  positionY: number;
};

export const useTree = create<TreeStore>()((set, get) => {
  return {
    nodes: { start: createNodeData("Start", 200, 200, "start"), test: createNodeData("AddNumber", 200, 500, "test"), test2: createNodeData("AddNumber", 600, 500, "test2") },
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
      console.log(node, portId, newValue);
      set(
        produce((state) => {
          state.nodes[node].inputs[portId].ownValue = newValue;
        })
      );
    },
  };
});

function createNodeData(nodeType: string, x: number, y: number, id: string | null = null): NodeData {
  const def = NodeLibrary[nodeType];
  return {
    type: nodeType,
    id: id || crypto.randomUUID(),
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
    blackboard: {},
  };
}

export type PortConnection = {
  hasConnection: boolean;
  ownValue: any;
  connectedNode: string | null;
  connectedPort: string | null;
  type: PortType;
};

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
