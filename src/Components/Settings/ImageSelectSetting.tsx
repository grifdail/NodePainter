import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { Fieldset } from "../StyledComponents/Fieldset";
import { DropdownInput } from "../Generics/Inputs/DropdownInput";
import { ImageSelectSettingDefinition } from "../../Types/SettingDefinition";
import styled from "styled-components";
import { MenuItem } from "@szhsin/react-menu";

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-direction: column;
  padding: 0;
  margin: 0;
  gap: var(--padding-tiny);

  & > div.file,
  & > img {
    flex-grow: 1;
    display: block flex;
    object-fit: contain;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    max-height: 180px;
    height: 180px;
    background: var(--gradient-transparent);
  }
`;

const ImprovedMenuItem = styled.span`
  display: inline-flex;
  flex-direction: row;
  gap: var(--padding-small);
  align-items: center;
`;

export const ImageSelectSetting: SettingComponent<ImageSelectSettingDefinition> = {
    UI: function ImageSelectSetting({ onChange, value, def }: SettingProps<ImageSelectSettingDefinition>) {
        if (value == null) {
            value = def.options[0];
        }
        return (
            <Body>
                <img src={value.url}
                    alt="loaded" />
                <Fieldset
                    input={DropdownInput}
                    passtrough={{
                        options: def.options,
                        useTemplateForField: true,
                        template: (item: any) => item.label,
                        templateRaw: (item: any, arg: any) => {
                            return (
                                <MenuItem
                                    onClick={arg.onClick}
                                    key={arg.key}>
                                    <ImprovedMenuItem>
                                        <img width="32"
                                            height="32"
                                            alt={item.url}
                                            src={item.url} />
                                        {item.label}
                                    </ImprovedMenuItem>
                                </MenuItem>
                            );
                        },
                    }}
                    value={value}
                    onChange={onChange}
                    label={def.label || def.id}
                />
            </Body>
        );
    },
    getSize: function (value, def): number {
        return 32 + 180 + 5;
    },
    initializeValue(clonedValue, setting) {
        return setting.options[0] as any;
    },
};
