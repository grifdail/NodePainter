import { useTree } from "../../Hooks/useTree";
import { Modal } from "../Modal";
import styled from "styled-components";
import { IconDeviceFloppy, IconFileUpload } from "@tabler/icons-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { useDialog } from "../../Hooks/useDialog";
import { Button } from "../Generics/Button";
import { loadFromUrl } from "../../Utils/loadFromUrl";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { TextInput } from "../Generics/Inputs/TextInput";

const MainDiv = styled.div`
  gap: var(--padding-small);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 300px 50px;

  & > .json {
    grid-column: 1 / 2;
    grid-row: 1 /2;
    display: flex;

    flex-direction: column;

    & textarea {
      flex-grow: 1;
    }
  }

  & > .file {
    grid-column: 2 / 3;
    grid-row: 1 /2;

    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: 2px solid black;
    display: flex;

    & svg {
      width: 100px;
      height: 100px;
    }
  }

  & > .url {
    grid-row: 2 / 3;
    grid-column: 1 /3;
    display: flex;

    gap: var(--padding-small);

    justify-content: stretch;

    & ${ButtonGroup} {
      align-self: stretch;
    }
  }
`;

export function LoadModal({ close }: { close: () => void }) {
  const [rawField, setRawField] = useState("");
  const [url, setRawUrl] = useState("");
  const [lastValue, clip] = useCopyToClipboard();

  const onValidateFile = (file: string) => {
    try {
      var parsed = JSON.parse(file);
      useDialog.getState().openConfirm(
        (isConfirmed) => {
          if (isConfirmed) {
            const result = useTree.getState().loadTemplate(parsed);
            if (result) {
              close();
            }
          }
        },
        "Are you sure ?",
        "You will lose all your data for this sketch."
      );
    } catch (err) {
      console.log(err);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
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

  function createShareUrl(toBeLoaded: string): string {
    var url = new URL(window.location.href);
    url.searchParams.append("load", toBeLoaded);
    return url.toString();
  }

  var shareUrl = createShareUrl(url);

  return (
    <Modal
      onClose={close}
      title="Load"
      icon={IconDeviceFloppy}>
      <MainDiv>
        <div className="json">
          <textarea
            value={rawField}
            placeholder="//copy your json here..."
            onChange={(e) => setRawField(e.target.value)}></textarea>
          <ButtonGroup
            $forceStretch
            align="stretch">
            <Button
              label={"Load"}
              onClick={() => onValidateFile(rawField)}></Button>
          </ButtonGroup>
        </div>

        <div
          className="file"
          {...getRootProps()}>
          <input {...getInputProps()}></input>
          <IconFileUpload></IconFileUpload>
        </div>
        <div className="url">
          <TextInput
            value={url}
            onChange={(e) => setRawUrl(e)}
          />
          <ButtonGroup>
            <Button
              label="Load from URL"
              onClick={() => loadFromUrl(url)}></Button>
            <Button
              label={lastValue === shareUrl ? "Succesfully copied !" : "Create share link"}
              onClick={() => clip(shareUrl)}></Button>
          </ButtonGroup>
        </div>
      </MainDiv>
    </Modal>
  );
}
