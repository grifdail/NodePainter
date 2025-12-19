import { NodeData } from "../Types/NodeData";
import { PortConnection } from "../Types/PortConnection";
import { PortDefinition } from "../Types/PortDefinition";

export function preparePortForFunctions(inputs: { node: NodeData; port: PortConnection; portId: string; }[]): PortDefinition[] {
    const dic: { [key: string]: number; } = {};

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
