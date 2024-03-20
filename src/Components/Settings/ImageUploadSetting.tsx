import { SettingDefinition } from "../../Types/SettingDefinition";
import { SettingComponent } from "./SettingsComponents";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { Menu, MenuButton } from "@szhsin/react-menu";
import { IconFileUpload, IconMenu2 } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

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
    background-color: rgba(0, 0, 0, 0.2);
    max-height: 180px;
  }
  & svg {
    height: 50%;
    width: 50%;
  }
`;

export const ImageUploadSetting: SettingComponent = function PaletteSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length >= 1) {
        var file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          onChange(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    accept: { "image/jpeg": [], "image/png": [] },
    maxFiles: 1,
  });

  return (
    <Body>
      {value === null && (
        <div className="file" {...getRootProps()}>
          <input {...getInputProps()}></input>
          <IconFileUpload />
        </div>
      )}
      {value !== null && <img src={value} alt="loaded"></img>}

      <ButtonGroup compact hidden={value !== null}>
        <button onClick={() => onChange(null)}>Reset</button>
        <Menu
          portal
          menuButton={
            <MenuButton className={"icon"}>
              <IconMenu2></IconMenu2>
            </MenuButton>
          }
        ></Menu>
      </ButtonGroup>
    </Body>
  );
};
ImageUploadSetting.getSize = function (value, def): number {
  return 250;
};
