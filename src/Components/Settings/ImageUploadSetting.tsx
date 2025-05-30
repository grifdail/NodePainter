import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconFileUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Button } from "../Generics/Button";
import { ImageUploadSettingDefinition } from "../../Types/SettingDefinition";

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

export const ImageUploadSetting: SettingComponent<ImageUploadSettingDefinition> = function PaletteSetting({ onChange, value, def }: SettingProps<ImageUploadSettingDefinition>) {
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
        <div
          className="file"
          {...getRootProps()}>
          <input {...getInputProps()}></input>
          <IconFileUpload />
        </div>
      )}
      {value !== null && (
        <img
          src={value}
          alt="loaded"></img>
      )}

      <ButtonGroup hidden={value !== null}>
        <Button
          label="Reset"
          onClick={() => onChange(null)}></Button>
      </ButtonGroup>
    </Body>
  );
};
ImageUploadSetting.getSize = function (value, def): number {
  return 250;
};
