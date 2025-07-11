import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconFileUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Button } from "../Generics/Button";
import { MeshUploadSettingDefinition } from "../../Types/SettingDefinition";

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-direction: column;
  padding: 0;
  margin: 0;

  & > div.loaded,
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

export const ModelUploadSetting: SettingComponent<MeshUploadSettingDefinition> = function ({ onChange, value, def }: SettingProps<MeshUploadSettingDefinition>) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles, fileRejection) => {
      if (acceptedFiles.length >= 1) {
        var file = acceptedFiles[0];

        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");

        reader.onload = () => {
          onChange({ source: reader.result, ext: file.name.split(".").pop(), name: file.name });
        };
        reader.readAsArrayBuffer(file);
      }
    },
    accept: { "model/gltf-binary": [".glb"] },
    maxFiles: 1,
  });

  return (
    <Body>
      {value == undefined && (
        <div
          className="file"
          {...getRootProps()}>
          <input {...getInputProps()}></input>
          <IconFileUpload />
        </div>
      )}
      {value != null && <div className="loaded">loaded {value.name}</div>}

      <ButtonGroup hidden={value !== null}>
        <Button
          label="Reset"
          onClick={() => onChange(null)}></Button>
      </ButtonGroup>
    </Body>
  );
};
ModelUploadSetting.getSize = function (value, def): number {
  return 250;
};
