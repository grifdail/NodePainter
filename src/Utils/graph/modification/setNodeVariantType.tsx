import { NodeData } from "../../../Types/NodeData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortType } from "../../../Types/PortType";

export function setNodeVariantType(node: NodeData, def: NodeDefinition, typeChange: PortType | null): void {
    if (typeChange !== null && def.availableTypes && def.availableTypes.includes(typeChange)) {
        if (def.onChangeType) {
            def.onChangeType(node, typeChange);
        }
        node.selectedType = typeChange;
    }
}
