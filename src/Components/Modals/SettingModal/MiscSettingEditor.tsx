import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { toastInfo } from "../../../Hooks/useToast";
import { Button } from "../../Generics/Button";
import { DropdownInput } from "../../Generics/Inputs/DropdownInput";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { Fieldset } from "../../StyledComponents/Fieldset";

export const MiscSettingEditor = () => {
  const theme = usePlayerPref((state) => state.theme);
  const setTheme = usePlayerPref((state) => state.setTheme);
  return (
    <div>
      <div>
        <Fieldset
          input={DropdownInput}
          value={theme}
          onChange={setTheme}
          label="Theme"
          passtrough={{
            options: ["auto", "dark", "light", "rose-pine-moon", "rose-pine-dawn"],
          }}
        />
      </div>
      <ButtonGroup>
        <Button
          label="Reset node usage information"
          onClick={() => {
            usePlayerPref.getState().resetNodeUsageInformation();
            toastInfo("Node usage reset");
          }}
        ></Button>
        <Button
          label="Import default Palette Collection"
          onClick={() => {
            usePlayerPref.getState().loadDefaultPaletteCollection();
            toastInfo("Palette and gradient loaded !");
          }}
        ></Button>
        <Button
          label="Remove all default Palettes"
          onClick={() => {
            usePlayerPref.getState().removeDefaultPalettes();
            toastInfo("Palette and gradient removed");
          }}
        ></Button>
      </ButtonGroup>
    </div>
  );
};
