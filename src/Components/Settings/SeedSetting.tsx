import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { SeedSettingDefinition } from "../../Types/SettingDefinition";
import { Fieldset } from "../StyledComponents/Fieldset";
import { DropdownInput } from "../Generics/Inputs/DropdownInput";
import { useCallback } from "react";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { SeedSettingData } from "../../Types/SeedSettingData";
import { Button, InvisibleButton } from "../Generics/Button";
import { IconDice } from "@tabler/icons-react";
import styled from "styled-components";

const DDiv = styled.div`
    display: flex;
    align-items: center;

    fieldset {
        flex: 1 1 auto;
    }
`

export const SeedSetting: SettingComponent<SeedSettingDefinition> = {
    UI: function ({ onChange, value }: SettingProps<SeedSettingDefinition>) {
        var seedData = value as SeedSettingData || { mode: "auto" };

        const changeMode = useCallback((newMode: SeedSettingData["mode"]) => {
            if (newMode !== seedData.mode) {
                let next: SeedSettingData;
                if (newMode === "auto") {
                    next = { mode: "auto" };
                } else {
                    next = { mode: "static", seed: rnSeed() }
                }
                onChange(next);
            }
        }, [onChange, seedData.mode])

        return (
            <div>
                <Fieldset
                    label="Seed"
                    input={DropdownInput}
                    onChange={changeMode}
                    passtrough={{
                        options: ["static", "auto"],

                    }}
                    value={seedData.mode}></Fieldset>
                {
                    seedData.mode === "static" && <DDiv>
                        <Fieldset
                            label="seed value"
                            input={NumberInput}
                            onChange={(v) => onChange({ ...seedData, width: v })}
                            value={seedData.seed}></Fieldset>
                        <InvisibleButton onClick={() => onChange({ ...seedData, seed: rnSeed() })} icon={IconDice}></InvisibleButton>
                    </DDiv>
                }
            </div>
        );
    },
    getSize: function (value, def): number {
        var resolutionData = value as SeedSettingData || { mode: "auto" };
        var extra = (resolutionData.mode === "static" ? 2 : 0)
        return 32 * extra + 30;
    }
};
function rnSeed() {
    return Math.floor(Math.random() * 10000000);
}

