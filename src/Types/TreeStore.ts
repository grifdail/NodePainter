import { SketchTemplate } from "../Data/templates";
import { ExecutionContext } from "../Utils/createExecutionContext";
import { CustomNodeEditingType } from "./CustomFunctionCreationContextStore";
import { EDirection } from "./EDirection";
import { ExportedCustomFunction } from "./ExportedCustomFunction";
import { NodeCollection } from "./NodeCollection";
import { NodeData } from "./NodeData";
import { NodeDefinition } from "./NodeDefinition";
import { PortConnection } from "./PortConnection";
import { PortDefinition } from "./PortDefinition";
import { PortType } from "./PortType";

export type TreeStore = {
  key: number;
  nodes: NodeCollection;
  editedGraph?: string;
  customNodes: { [key: string]: NodeDefinition };
  nodeDeletionCount: number;
  globalSettings: { [key: string]: any };
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
  setGlobalSetting: (settingId: string, newValue: any) => void;
  resetNode: (node: string) => void;
  deleteNode: (node: string) => void;
  duplicateNode: (node: string) => void;
  reset: () => void;
  loadTemplate: (temp: SketchTemplate) => boolean;
  exportTemplate: () => SketchTemplate;
  createFunction: (def: NodeDefinition) => void;
  createShader: (def: NodeDefinition) => void;
  createSimulation: (def: NodeDefinition) => void;
  setEditedGraph: (graph: string | undefined) => void;
  enforceValidGraph: () => void;
  executeCallback: (nodeId: string, fn: (node: NodeData, tree: TreeStore) => void) => void;
  changeNodeType: (id: string, type: PortType) => void;
  getCustomNodeEditingType: () => CustomNodeEditingType;
  createFunctionFromNodes: (nodesId: string[], id: string) => boolean;
  exportCustomeFunction: (id: string) => { definitions: NodeDefinition[]; nodes: NodeCollection };
  loadCustomeFunction: (customFunctionData: ExportedCustomFunction) => void;
  getSketchName: () => string;
  freeSpace: (direction: EDirection, amount: number, offsetX: number, offsetY: number) => void;
  createBlackboardNode: (type: PortType, key: string, name: string, x: number, y: number) => void;
  dangerouselyUpdateNode: (nodeId: string, cb: (node: NodeData) => void) => void;
  sortAroundNode: (nodeId: string) => void;
};
