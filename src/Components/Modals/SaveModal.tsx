import { useTree } from "../../Hooks/useTree";
import { Modal } from "../Modal";
import styled from "styled-components";
import { useCopyToClipboard, useToggle } from "@uidotdev/usehooks";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { SketchTemplate } from "../../Data/templates";

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

  return (
    <Modal onClose={close} title="Save" icon={IconDeviceFloppy}>
      <MainDiv>
        <div className="short">
          <label htmlFor="short">Use short json</label>
          <input name="short" type="checkbox" checked={shortJson} onClick={(e) => toggleShotJson(!!(e.target as HTMLInputElement).checked)}></input>
        </div>
        <textarea value={json}></textarea>

        <ButtonGroup>
          <button onClick={() => clip(json)}> {lastValue === json ? "Succesfully copied !" : "Copy to clipboard"}</button>
          <button onClick={() => download(json, "node_painter_save.json")}> download as file</button>
        </ButtonGroup>
      </MainDiv>
    </Modal>
  );
}
