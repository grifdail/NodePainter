export type NodeTags = "Math" | "Vector" | "Logic" | "Input" | "Drawing" | "Color" | "Image" | "Array" | "Text" | "State" | "3D" | "Material" | "Mesh" | "Light" | "Misc" | "Shader" | "Custom";

export const NodeTagPriority: { [key in NodeTags]?: number } = {
  Misc: 100,
  Math: 90,
  Drawing: 95,
  Vector: 80,
  Logic: 70,
  Input: 75,
};
