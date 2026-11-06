import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconAdjustments, IconArrowDown, IconArrowUp, IconTrash } from "@tabler/icons-react";
import { Button } from "../Generics/Button";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useListManipulator } from "../../Hooks/useListManipulator";
import { ColorInput } from "../Generics/Inputs/ColorInput";
import { PostProcessListSettingDefinition } from "../../Types/SettingDefinition";
import { createPostProcessLayer, PostProcessLayer, PostProcessLayerType, PostProcessLayerUtils } from "../../Types/PostProcessLayer";
import { Fieldset } from "../StyledComponents/Fieldset";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { camelCaseToWords } from "../../Utils/ui/camelCaseToWords";
import { BoolInput } from "../Generics/Inputs/BoolInput";
import { VectorInput } from "../Generics/Inputs/VectorInput";
import { TextInput } from "../Generics/Inputs/TextInput";

const ColorList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: stretch;
  justify-content: start;
  padding: 0;
  margin: 0;
      gap: 5px;

  & > li {
    padding: 0;
    margin: 0;
    flex: 0 0 30px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;

    & > div.header {
        flex: 0 0 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: stretch;

        & > span {
            width: 50px;
            flex: 0 0 30px;
            text-align: center;
        }

        & > .title {
            flex: 1 1 50px;
        }

        & > button {
        flex: 1 0 50px;
        }

        & > button.delete {
            flex: 0 0 30px;
            border: none;
            cursor: pointer;
        }
    }
    & > div.body {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: start;

    border-left: var(--color-border) solid var(--border-size);
    padding: var(--padding-tiny);

        & > fieldset {
            flex: 0 0 30px;
        }
    }
    
  }
`;

export const PostProcessListSetting: SettingComponent<PostProcessListSettingDefinition> = {
    UI: function ({ onChange, value }: SettingProps<PostProcessListSettingDefinition>) {
        var list = value as Array<PostProcessLayer>;
        console.log(list);


        const { change: onChangeLayer, remove: removeLayer, move, addNew: addNewColor } = useListManipulator(list, onChange, createPostProcessLayer);

        const changeProperty = (i: number, layer: PostProcessLayer, property: string) => {
            return (v: number) => {
                var n = { ...layer, [property]: v } as PostProcessLayer;
                onChangeLayer(i, n)
            }
        }

        return (
            <div>
                <div>Post process</div>
                <ColorList>
                    {list.map((layer: PostProcessLayer, i: number) => (
                        <li key={i}>
                            <div className="header">
                                <span>{i}</span>
                                <span className="title">{layer.type}</span>
                                <Menu
                                    menuButton={
                                        <button className="delete">
                                            <IconAdjustments />
                                        </button>
                                    }>
                                    <MenuItem
                                        onClick={() => removeLayer(i)}>
                                        <IconTrash></IconTrash> Delete
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => move(i, "up")}
                                        disabled={i === 0}>
                                        <IconArrowUp></IconArrowUp>Move Up
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => move(i, "down")}
                                        disabled={i === list.length - 1}>
                                        <IconArrowDown></IconArrowDown> Move Down
                                    </MenuItem>
                                </Menu>
                            </div>
                            <div className="body">
                                {
                                    Object.keys(layer).filter(key => key !== "type").map(key => {


                                        return <Fieldset
                                            key={key}
                                            label={key}
                                            value={layer[key as keyof PostProcessLayer]}
                                            onChange={changeProperty(i, layer, key)}
                                            input={inputForValue(layer[key as keyof PostProcessLayer])}></Fieldset>
                                    })
                                }
                            </div>
                        </li>
                    ))}
                </ColorList>

                <ButtonGroup><Menu
                    portal
                    menuButton={
                        <Button
                            label="Add"
                        />
                    }>
                    {
                        Object.keys(PostProcessLayerUtils).map(key => {
                            return <MenuItem key={key}
                                onClick={() => addNewColor(createPostProcessLayer(key as PostProcessLayerType))}>
                                {camelCaseToWords(key)}
                            </MenuItem>
                        })
                    }

                </Menu>

                </ButtonGroup>
            </div >
        );
    },
    getSize: function (value, def): number {
        var list = value as Array<PostProcessLayer>;
        return 70 + list.reduce((size, layer) => {

            return size + 35 + (Object.keys(layer).length - 1) * 35
        }, 0)
    }
};

function inputForValue(value: any) {
    if (typeof value === "number") {
        return NumberInput;
    }
    if (typeof value === "boolean") {
        return BoolInput;
    }
    if (Array.isArray(value)) {
        if (value.length === 4) {
            return ColorInput;
        } else {
            return VectorInput
        }
    }
    return TextInput;
}