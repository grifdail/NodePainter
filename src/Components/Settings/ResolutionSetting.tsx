import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import styled from "styled-components";
import { ResolutionSettingDefinition } from "../../Types/SettingDefinition";
import { ResolutionSettingData } from "../../Types/ResolutionSettingData";
import { Fieldset } from "../StyledComponents/Fieldset";
import { DropdownInput } from "../Generics/Inputs/DropdownInput";
import { useCallback } from "react";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { Constraints } from "../../Utils/ui/applyConstraints";



export const ResolutionSetting: SettingComponent<ResolutionSettingDefinition> = {
    UI: function ({ onChange, value }: SettingProps<ResolutionSettingDefinition>) {
        var resolutionData = value as ResolutionSettingData;

        const changeMode = useCallback((newMode: ResolutionSettingData["mode"]) => {
            if (newMode !== resolutionData.mode) {
                let next: ResolutionSettingData;
                if (newMode === "original") {
                    next = {
                        "mode": "original"
                    }
                } else if (newMode === "scaled") {
                    next = { mode: "scaled", scale: 1 }
                } else {
                    next = { mode: "static", width: 400, height: 400 }
                }
                onChange(next);
            }
        }, [onChange, resolutionData.mode])

        return (
            <div>
                <Fieldset
                    label="resolution"
                    input={DropdownInput}
                    onChange={changeMode}
                    passtrough={{
                        options: ["scaled", "static", "original"],

                    }}
                    value={resolutionData.mode}></Fieldset>
                {
                    resolutionData.mode === "scaled" && <>
                        <Fieldset
                            label="scale"
                            input={NumberInput}
                            onChange={(v) => onChange({ ...resolutionData, scale: v })}
                            constrains={[Constraints.Positive()]}
                            value={resolutionData.scale}></Fieldset>
                    </>
                }
                {
                    resolutionData.mode === "static" && <>
                        <Fieldset
                            label="width"
                            input={NumberInput}
                            onChange={(v) => onChange({ ...resolutionData, width: v })}
                            constrains={[Constraints.Positive()]}
                            value={resolutionData.width}></Fieldset>
                        <Fieldset
                            label="height"
                            input={NumberInput}
                            onChange={(v) => onChange({ ...resolutionData, height: v })}
                            constrains={[Constraints.Positive()]}
                            value={resolutionData.height}></Fieldset>
                    </>
                }
            </div>
        );
    },
    getSize: function (value, def): number {
        var resolutionData = value as ResolutionSettingData;
        var extra = resolutionData.mode === "scaled" ? 1 : (resolutionData.mode === "static" ? 2 : 0)
        return 32 * extra + 30;
    }
};
