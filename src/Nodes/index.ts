import { ColorNodes } from "./Color";
import { DrawNodes } from "./Draw";
import { InputNodes } from "./Inputs";
import { LogicNodes } from "./Logic";
import { MathNodes } from "./Math";
import { SystemNodes } from "./System";
import { VectorNodes } from "./Vector";
import { ImageNode } from "./Image";

const NodeLibraryArray = [SystemNodes, DrawNodes, ColorNodes, DrawNodes, InputNodes, LogicNodes, MathNodes, VectorNodes, ImageNode].flat();
export const NodeLibrary = Object.fromEntries(NodeLibraryArray.map((node) => [node.id, node]));
