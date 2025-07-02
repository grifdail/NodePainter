import { Vector2 } from "@use-gesture/react";
import { CodeBlockExpressionGenerator } from "../../Types/CodeBlock/CodeBlockExpressionGenerator";
import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { ImageData } from "../../Types/ImageData";
import { MaterialData, MeshData } from "../../Types/MaterialData";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { Color, Gradient, Quaternion, Vector, Vector3, Vector4 } from "../../Types/vectorDataType";
import { evaluateCodeBlockExpression } from "../../Utils/codeblock/evaluateCodeBlockExpression";
import { toStringCodeBlockExpression } from "../../Utils/codeblock/toStringCodeBlockExpression";
import { ExecutionContext, FunctionContext } from "../../Utils/graph/execution/createExecutionContext";
import { createNodeData } from "../../Utils/graph/modification/createNodeData";

function generateExpressionFromNodeData(def: NodeDefinition, nodeData: NodeData, mode: PortType | null): CodeBlockExpressionGenerator {
  const result: CodeBlockExpressionGenerator = {
    id: mode ? `${def.id}/${mode}` : def.id,
    create: function (type: PortType): CodeBlockStatement {
      return {
        type: result.id,
        parameters: Object.fromEntries(
          Object.values(nodeData.dataInputs).map((port) => [
            port.id,
            {
              label: port.label,
              type: "expression",
              targetType: port.type,
              constantValue: port.ownValue,
              expression: null,
            },
          ])
        ),
      };
    },
    canEvaluateTo: function (type: PortType): boolean {
      return Object.values(nodeData.dataOutputs)[0].type === type;
    },
    evaluate: function (statement: CodeBlockStatement, state: FunctionContext) {
      var option = Object.fromEntries(def.dataInputs.map((port) => [port.id, evaluateCodeBlockExpression(statement.parameters[port.id], state)]));

      var data = def.getData?.(def.dataOutputs[0].id, nodeData, generateFakeContext(state, def, option, nodeData));
      return data;
    },
    toString(statement) {
      const parametersName = Object.fromEntries(Object.entries(statement.parameters).map(([id, value]) => [id, toStringCodeBlockExpression(value)]));

      return def.toCodeblockString
        ? def.toCodeblockString(nodeData, parametersName)
        : `${def.label || def.id} - ${Object.entries(parametersName)
            .map((a) => `${a[0]}: ${a[1]}`)
            .join(" ")}`;
    },
  };
  return result;
}

export function generateExpressionFromNode(def: NodeDefinition): CodeBlockExpressionGenerator[] {
  if (def.availableTypes && def.availableTypes.length > 1 && def.onChangeType) {
    return def.availableTypes.map((mode) => {
      var nodeData = createNodeData(def, 0, 0, def.id);
      if (def.onChangeType) {
        def.onChangeType(nodeData, mode);
      }
      nodeData.selectedType = mode;
      return generateExpressionFromNodeData(def, nodeData, mode);
    });
  } else {
    return [generateExpressionFromNodeData(def, createNodeData(def, 0, 0, def.id), null)];
  }
}
function generateFakeContext(state: FunctionContext, def: NodeDefinition, option: { [k: string]: any }, nodeData: NodeData): ExecutionContext {
  var ctx: ExecutionContext = {
    deltaTime: 0,
    getInputValue: function <T>(nodeData: NodeData, portId: string, outputValue: PortType): T {
      return option[portId];
    },
    getInputValueVector: function (nodeData: NodeData, portId: string): Vector {
      return ctx.getInputValue(nodeData, portId, "vector") as Vector;
    },
    getInputValueVector2: function (nodeData: NodeData, portId: string): Vector2 {
      return ctx.getInputValue(nodeData, portId, "vector2") as Vector2;
    },
    getInputValueVector3: function (nodeData: NodeData, portId: string): Vector3 {
      return ctx.getInputValue(nodeData, portId, "vector2") as Vector3;
    },
    getInputValueVector4: function (nodeData: NodeData, portId: string): Vector4 {
      return ctx.getInputValue(nodeData, portId, "vector4") as Vector4;
    },
    getInputValueQuaternion: function (nodeData: NodeData, portId: string): Quaternion {
      return ctx.getInputValue(nodeData, portId, "quaternion") as Quaternion;
    },
    getInputValueNumber: function (nodeData: NodeData, portId: string): number {
      return ctx.getInputValue(nodeData, portId, "number") as number;
    },
    getInputValueColor: function (nodeData: NodeData, portId: string): Color {
      return ctx.getInputValue(nodeData, portId, "color") as Color;
    },
    getInputValueGradient: function (nodeData: NodeData, portId: string): Gradient {
      return ctx.getInputValue(nodeData, portId, "gradient") as Gradient;
    },
    getInputValueImage: function (nodeData: NodeData, portId: string): null | ImageData {
      return ctx.getInputValue(nodeData, portId, "image") as ImageData;
    },
    getInputValueString: function (nodeData: NodeData, portId: string): string {
      return ctx.getInputValue(nodeData, portId, "string") as string;
    },
    getInputValueBoolean: function (nodeData: NodeData, portId: string): boolean {
      return ctx.getInputValue(nodeData, portId, "bool") as boolean;
    },
    getInputValueMaterial: function (nodeData: NodeData, portId: string): MaterialData {
      return ctx.getInputValue(nodeData, portId, "material") as MaterialData;
    },
    getInputValueMesh: function (nodeData: NodeData, portId: string): MeshData {
      return ctx.getInputValue(nodeData, portId, "mesh") as MeshData;
    },
    getInputValueDrawing: function (nodeData: NodeData, portId: string): () => void {
      return ctx.getInputValue(nodeData, portId, "drawing2d") as () => void;
    },
    getInputValueVectorArray: function (nodeData: NodeData, portId: string): Vector[] {
      return ctx.getInputValue(nodeData, portId, "array-vector") as Vector[];
    },
  } as any;
  return ctx;
}
