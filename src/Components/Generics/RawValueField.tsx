import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { Fieldset } from "../StyledComponents/Fieldset";

export const RawValueField = ({ value, onChange, type, label = "" }: { label?: string, type: PortType | "any"; value: any; onChange: (value: any) => void }) => {
  let InputType = null;
  if (type !== "any" && PortTypeDefinitions[type]) {
    InputType = PortTypeDefinitions[type].inlineInput;
    if (InputType) {
      return (
        <Fieldset
          label={label}
          className={type}
          input={InputType}
          onChange={onChange}
          value={value}></Fieldset>
      );
    }
  }
  return null;
};
