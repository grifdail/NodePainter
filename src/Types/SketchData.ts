import { NodeCollection } from "./NodeCollection";
import { NodeDefinition } from "./NodeDefinition";



export type SketchData = {
    nodes: NodeCollection;
    customNodes: { [key: string]: NodeDefinition; };
    globalSettings: { [key: string]: any; };
};
