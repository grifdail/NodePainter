import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { useMemo } from "react";
import { CurvePreviewSettingDefinition } from "../../Types/SettingDefinition";
import { FunctionPreview } from "./FunctionPreview";
import { NodeData } from "../../Types/NodeData";

export const CurvePreviewSetting: SettingComponent<CurvePreviewSettingDefinition> = {
    UI: function CurvePreviewSettingSetting({ onChange, value, def, node }: SettingProps<CurvePreviewSettingDefinition>) {

        const display = useMemo(() => canDisplay(def, node), [def, node])
        var fn = useMemo(() => (x: number) => def.getValue(x, node), [def, node]);

        return (
            <div>
                {display &&
                    <FunctionPreview
                        fn={fn}
                        width={272}
                        height={def.height}
                        resolution={100}></FunctionPreview>
                }
            </div>
        );
    },
    getSize: function (value, def, node): number {
        return 8 + 32 + 10 + (node ? (canDisplay(def, node) ? def.height : 0) : 0);
    }
};

function canDisplay(def: CurvePreviewSettingDefinition, node: NodeData) {
    return def.requirePort ? def.requirePort.every(portId => !node.dataInputs[portId].hasConnection) : true;
}

