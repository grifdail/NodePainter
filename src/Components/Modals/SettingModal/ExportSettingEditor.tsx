import { useCallback, useState } from "react";
import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { Button } from "../../Generics/Button";
import { TextAreaInput } from "../../Generics/Inputs/TextAreaInput";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { download } from "../../../Utils/download";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import Ajv, { JSONSchemaType } from "ajv";

import schemaJSON from "../../../schema/PlayerPrefExport.json";
import { PlayerPrefExport } from "../../../Types/PlayerPrefStore";
import { useDialog } from "../../../Hooks/useDialog";
import styled from "styled-components";
import { toastSuccess } from "../../../Hooks/useToast";

const ajv = new Ajv({ meta: false, validateSchema: false, strict: true });

export const validateSnipetJson = ajv.compile(schemaJSON as any as JSONSchemaType<PlayerPrefExport>);

const StyledDiv = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: stretch;

  min-height: 100px;
  flex-direction: column;

  & textarea {
    flex: 1 1 200px;
    justify-self: stretch;
    font-family: monospace;
  }
`;

export const ExportSettingEditor = () => {
  var exportData = JSON.stringify(
    usePlayerPref((state) => state.getExportJson()),
    null,
    4
  );
  const [rawField, setRawField] = useState(exportData);
  var loadJson = usePlayerPref((state) => state.loadJson);
  const [lastValue, clip] = useCopyToClipboard();

  const tryLoadJson = useCallback(() => {
    try {
      const parsed = JSON.parse(rawField);
      console.log(rawField);

      if (!validateSnipetJson(parsed)) {
        throw new Error(`The json you pasted is not valid`);
      }
      console.log(validateSnipetJson);
      useDialog.getState().openConfirm(
        (isConfirmed) => {
          if (isConfirmed) {
            loadJson(parsed);
            toastSuccess("Setting Imported !");
          }
        },
        "Are you sure ?",
        "This will completly replace your current setting"
      );
    } catch {
      console.log("aaaa");
      useDialog.getState().openError(`The json you pasted is not a valid Player Pref json`);
      return;
    }
  }, [rawField, loadJson]);
  return (
    <StyledDiv>
      <TextAreaInput
        value={rawField}
        onChange={setRawField}></TextAreaInput>
      <ButtonGroup align="end">
        <Button
          label="Load"
          onClick={tryLoadJson}></Button>
        <Button
          label={lastValue === exportData ? "Copied !" : "Copy to clipboard"}
          onClick={() => clip(exportData)}></Button>
        <Button
          label="Download"
          onClick={() => download(new Blob([exportData], { type: "application/json" }), `NodePainterSettings.json`)}></Button>
      </ButtonGroup>
    </StyledDiv>
  );
};
