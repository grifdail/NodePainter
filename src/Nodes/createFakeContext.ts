import { NodeData } from "../Types/NodeData";
import { NodeDefinition } from "../Types/NodeDefinition";
import { PortConnection } from "../Types/PortConnection";
import { PortType } from "../Types/PortType";
import { ExecutionContext, FunctionContext, getInputValueGenerator } from "../Utils/graph/execution/createExecutionContext";

export function createFakeContext(params: any[], def: NodeDefinition): [NodeData, ExecutionContext] {
    var n: NodeData = {
        id: "",
        type: "",
        dataInputs: {},
        dataOutputs: {},
        settings: {},
        positionX: 0,
        positionY: 0,
        selectedType: "string"
    }
    const paramsByName = Object.fromEntries(def.dataInputs.map((n, i) => [n.id, params[i]]))

    var context: ExecutionContext = {
        update(): void {
        },
        render: function (): void {
        },
        deltaTime: 0,
        deltaTimeMs: 0,
        getShaderVar: function (nodeData: NodeData, portId: string, type: PortType, isOutput?: boolean): string {
            throw new Error("Function not implemented.");
        },
        getImageEffectShaderCode: function (shader: string, uniforms: PortConnection[]): string {
            throw new Error("Function not implemented.");
        },
        getMaterialShaderCode: function (shader: string, uniforms: PortConnection[]): { vertex: string; frag: string; } {
            throw new Error("Function not implemented.");
        },
        findNodeOfType: function (type: string): NodeData | null {
            throw new Error("Function not implemented.");
        },
        getNodeDefinition: function (type: string): NodeDefinition | undefined {
            throw new Error("Function not implemented.");
        },
        createFunctionContext: function (node: NodeData): FunctionContext {
            throw new Error("Function not implemented.");
        },
        functionStack: [],
        time: 0,
        timeMs: 0,
        target: undefined as unknown as any,
        lastVisitedNode: "",
        blackboard: {},
        callCounts: {},
        frameBlackboard: {},
        getNodeOutput: function (nodeId: string, portId: string) {
            throw new Error("Function not implemented.");
        },
        p5: undefined as unknown as any,
        RNG: undefined as unknown as any,
        getInputValue: function <T>(nodeData: NodeData, portId: string, outputValue: PortType): T {
            return paramsByName[portId];
        },
        ...getInputValueGenerator((n, p, t) => context.getInputValue(n, p, t)),
        getGlobalSetting: function <T>(arg0: string): T {
            throw new Error("Function not implemented.");
        },
        getCallId: function (node: NodeData, ...args: any[]): string {
            throw new Error("Function not implemented.");
        },
        endOfFrameCleanup: function (): void {
            throw new Error("Function not implemented.");
        },
        endOfRunCleanup: function (): void {
            throw new Error("Function not implemented.");
        }
    }
    return [n, context];
}
