import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { toastInfo } from "../../../Hooks/useToast";
import { Button } from "../../Generics/Button";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";

export const MiscSettingEditor = () => {
  return (
    <div>
      <ButtonGroup>
        <Button
          label="Reset node usage information"
          onClick={() => {
            usePlayerPref.getState().resetNodeUsageInformation();
            toastInfo("Node usage reset");
          }}></Button>
        <Button
          label="Import default Palette Collection"
          onClick={() => {
            usePlayerPref.getState().loadDefaultPaletteCollection();
            toastInfo("Palette and gradient loaded !");
          }}></Button>
        <Button
          label="Remove all default Palettes"
          onClick={() => {
            usePlayerPref.getState().removeDefaultPalettes();
            toastInfo("Palette and gradient removed");
          }}></Button>
      </ButtonGroup>
    </div>
  );
};
