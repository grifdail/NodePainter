import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { GraphAreaSettingDefinition } from "../../Types/SettingDefinition";
import { useCallback } from "react";
import { Fieldset } from "../StyledComponents/Fieldset";
import { BoolInput } from "../Generics/Inputs/BoolInput";
import { GraphArea } from "../../Types/GraphArea";
import { ColorInput } from "../Generics/Inputs/ColorInput";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { TextInput } from "../Generics/Inputs/TextInput";
import { NODE_HEADER_HEIGHT, NODE_WIDTH } from "../Graph/NodeVisualConst";
import { useTree } from "../../Hooks/useTree";

export const GraphAreaSetting: SettingComponent<GraphAreaSettingDefinition> = {
    UI: function GraphAreaSetting({ onChange, value, def, node }: SettingProps<GraphAreaSettingDefinition>) {
        const area = value as GraphArea;

        const setWidth = useCallback(
            (value: number) => {
                onChange({ ...area, width: value, x: -value, relative: true });
            },
            [area]
        );
        const setHeight = useCallback(
            (value: number) => {
                onChange({ ...area, height: value, y: -value, relative: true });
            },
            [area]
        );
        const setColor = useCallback(
            (color: any) => {
                onChange({ ...area, color: color });
            },
            [area]
        );
        const setRelative = useCallback(
            (value: any) => {
                const n = useTree.getState().getNode(node.id);
                if (value) {
                    onChange({ ...area, relative: value, x: area.x - (n.positionX + NODE_WIDTH * 0.5), y: area.y - (n.positionY + NODE_HEADER_HEIGHT * 0.5) });
                } else {
                    onChange({ ...area, relative: value, x: n.positionX + NODE_WIDTH * 0.5 + area.x, y: n.positionY + NODE_HEADER_HEIGHT * 0.5 + area.y });
                }
            },
            [area]
        );
        const setName = useCallback(
            (value: any) => {
                onChange({ ...area, name: value });
            },
            [area]
        );
        return (
            <div>
                <Fieldset
                    label={"Name"}
                    input={TextInput}
                    onChange={setName}
                    value={area.name}></Fieldset>
                <Fieldset
                    label={"Color"}
                    input={ColorInput}
                    onChange={setColor}
                    value={area.color}></Fieldset>
                <Fieldset
                    label={"Width"}
                    input={NumberInput}
                    onChange={setWidth}
                    value={area.width}></Fieldset>
                <Fieldset
                    label={"Height"}
                    input={NumberInput}
                    onChange={setHeight}
                    value={area.height}></Fieldset>
                <Fieldset
                    label={"Relative"}
                    tooltip="Is the area relative to the position of this node"
                    input={BoolInput}
                    onChange={setRelative}
                    value={area.relative}></Fieldset>
            </div>
        );
    },
    getSize: function (value, def): number {
        return 150;
    },
    initializeValue(clonedValue, setting) {
        return ({ name: "", relative: true, x: -400, y: -400, width: 400, height: 400, color: [0, 0.3, 0.9, 0.8] });
    },
};
