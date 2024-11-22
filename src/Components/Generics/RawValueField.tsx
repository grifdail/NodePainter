import { PortType } from "../../Types/PortType";
import { Fieldset } from "../StyledComponents/Fieldset";
import { PortColor } from "../StyledComponents/PortColor";

export const RawValueField = ({ value, onChange, type }: { type: PortType | "any"; value: any; onChange: (value: any) => void }) => {
  let InputType = null;
  if (type !== "any" && PortColor[type]) {
    InputType = PortColor[type].inputInline;
    if (InputType) {
      return (
        <Fieldset
          label=""
          className={type}
          input={InputType}
          onChange={onChange}
          value={value}></Fieldset>
      );
    }
  }
  return null;
};
