import { ContextMenuData, NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createPortConnection } from "../modification/createPortConnection";


export function addAdvancedCacheOptionContextMenu(): NodeDefinition["contextMenu"] {
    return (node => {
        if (node.dataInputs.version) {
            return {} as ContextMenuData
        }
        return {
            "Add advanced cache controls": (node, tree) => {
                node.dataInputs["version"] = createPortConnection(Port.Version());
            }
        } as ContextMenuData
    })

}
