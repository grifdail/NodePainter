import { useTree } from "../../Hooks/useTree";
import { Modal } from "../Modal";
import styled from "styled-components";
import { useCopyToClipboard, useToggle } from "@uidotdev/usehooks";
import { IconClipboard, IconDeviceFloppy, IconDownload, IconLink } from "@tabler/icons-react";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { Button } from "../Generics/Button";
import { useEffect, useState } from "react";
import { compressSketchJson } from "../../Utils/loadJsonDecrypt";
import { SketchTemplate } from "../../Types/SketchTemplate";

const MAX_URL_LENGTH = 2083;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
  align-self: stretch;
  flex-grow: 1;
  flex: 1 0 100px;
  gap: 10px;

  & textarea {
    flex: 1 0 100px;
  }
`;

function download(data: string, filename: string = "data.json") {
  const blob = new Blob([data], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
}

export function SaveModal({ close }: { close: () => void }) {
  const [shortJson, toggleShotJson] = useToggle(false);
  var saveTemplate: SketchTemplate = useTree((state) => state.exportTemplate)();
  const json = JSON.stringify(saveTemplate, null, shortJson ? undefined : 4);
  const [lastValue, clip] = useCopyToClipboard();
  const [{ hasUrl, url: decodeUrl, loading }, setUrlState] = useState({ hasUrl: false, loading: true, url: "" });
  const sketchName = useTree((state) => state.getSketchName());

  useEffect(() => {
    compressSketchJson(saveTemplate).then(
      (data) => {
        var url = new URL(window.location.href);
        url.searchParams.append("parse", data);
        var result = url.toString();
        if (result.length >= MAX_URL_LENGTH) {
          return setUrlState({ url: "", hasUrl: false, loading: false });
        } else {
          return setUrlState({ url: result, hasUrl: true, loading: false });
        }
      },
      (err) => {
        return setUrlState({ url: "", hasUrl: false, loading: false });
      }
    );
  }, [json]);

  return (
    <Modal
      onClose={close}
      title="Save"
      icon={IconDeviceFloppy}
      size="small">
      <MainDiv>
        <div className="short">
          <label htmlFor="short">Use short json</label>
          <input
            name="short"
            type="checkbox"
            checked={shortJson}
            onClick={(e) => toggleShotJson(!!(e.target as HTMLInputElement).checked)}></input>
        </div>
        <textarea value={json}></textarea>

        <ButtonGroup $responsive>
          <Button
            label={lastValue === decodeUrl ? "Succesfully copied !" : "Copy link"}
            icon={IconLink}
            disabled={!hasUrl || loading}
            onClick={() => hasUrl && clip(decodeUrl)}></Button>
          <Button
            label={lastValue === json ? "Succesfully copied !" : "Copy to clipboard"}
            icon={IconClipboard}
            onClick={() => clip(json)}></Button>
          <Button
            label="Download as file"
            icon={IconDownload}
            onClick={() => download(json, `${sketchName}_NodePainter.json`)}></Button>
        </ButtonGroup>
      </MainDiv>
    </Modal>
  );
}
