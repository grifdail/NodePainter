import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import styled from "styled-components";
import { useMemo } from "react";
import { EasingFunctionType, evaluate } from "../../libs/easing";
import { EasingPreviewSettingDefinition } from "../../Types/SettingDefinition";
import { EasingDropdownFieldset } from "../Generics/EasingDropdownFieldset";
import { FunctionPreview } from "./FunctionPreview";

export const EasingSetting: SettingComponent<EasingPreviewSettingDefinition> = {
    UI: function GradientSetting({ onChange, value, def, node }: SettingProps<EasingPreviewSettingDefinition>) {
        const functionName = value as EasingFunctionType;

        var fn = useMemo(() => (x: number) => evaluate(functionName, x), [functionName]);

        return (
            <div>
                <FunctionPreview
                    fn={fn}
                    width={272}
                    height={100}
                    resolution={100}></FunctionPreview>

                <EasingDropdownFieldset onChange={onChange} value={value} />
            </div>
        );
    },
    getSize: function (value, def): number {
        return 108 + 32 + 10;
    }
};

