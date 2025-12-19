import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconFileUpload, IconHelpHexagon } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Button } from "../Generics/Button";
import { ImagePreviewSettingDefinition, ImageUploadSettingDefinition } from "../../Types/SettingDefinition";

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-direction: column;
  padding: 0;
  margin: 0;
  & > div.file,
  & img {
    flex-grow: 1;
    display: block flex;
    object-fit: contain;
    justify-content: center;
    align-items: center;
    background: var(--gradient-transparent);
    max-height: 180px;
  }
  & svg {
    height: 50%;
    width: 50%;
  }
`;

export const ImagePreviewSetting: SettingComponent<ImagePreviewSettingDefinition> = {
    UI: function ImagePreviewSetting({ onChange, value, def }: SettingProps<ImagePreviewSettingDefinition>) {


        return (
            <Body>
                {value == null && (
                    <div className="file">
                        <IconHelpHexagon></IconHelpHexagon>
                    </div>
                )}
                {value != null && (
                    <img
                        src={value}
                        alt="loaded"></img>
                )}


            </Body>
        );
    },
    getSize: function (value, def): number {
        return 200;
    }
};
