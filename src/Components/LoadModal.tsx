import { useTree } from "../Hooks/useTree";
import { Modal } from "./Modal";
import styled from "styled-components";
import { useCopyToClipboard, useToggle } from "@uidotdev/usehooks";
import { IconDeviceFloppy, IconFileUpload } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ButtonGroup } from "./StyledComponents/ButtonGroup";

const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  align-content: stretch;
  align-self: stretch;
  justify-content: stretch;
  flex-grow: 1;
  flex: 1 0 100px;
  gap: 10px;

  & > div {
    display: flex;
    flex: 1 1 100px;
  }

  & .json {
    display: flex;
    flex-direction: column;

    & textarea {
      flex-grow: 1;
    }
  }

  & .file {
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: 2px solid black;

    & svg {
      width: 100px;
      height: 100px;
    }
  }
`;

export function LoadModal({ close }: { close: () => void }) {
  const [rawField, setRawField] = useState("");

  const onValidateFile = (file: string) => {
    const result = useTree.getState().load(JSON.parse(file));
    console.log(result);
    if (result) {
      close();
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length >= 1) {
        var file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result as string;
          onValidateFile(binaryStr);
        };
        reader.readAsText(file);
      }
    },
    accept: { "application/json": [] },
    maxFiles: 1,
  });

  return (
    <Modal onClose={close} title="Load" icon={IconDeviceFloppy}>
      <MainDiv>
        <div className="json">
          <textarea value={rawField} placeholder="//copy your json here..." onChange={(e) => setRawField(e.target.value)}></textarea>
          <ButtonGroup>
            <button onClick={() => onValidateFile(rawField)}> Load</button>
          </ButtonGroup>
        </div>

        <div className="file" {...getRootProps()}>
          <input {...getInputProps()}></input>
          <IconFileUpload></IconFileUpload>
        </div>
      </MainDiv>
    </Modal>
  );
}
