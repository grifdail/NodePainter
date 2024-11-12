import { NodeDefinition } from "../../../Types/NodeDefinition";
import { CustomFunctionCreationContextStore } from "../../../Types/CustomFunctionCreationContextStore";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { BoolInput } from "../../Generics/Inputs/BoolInput";
import { TextInput } from "../../Generics/Inputs/TextInput";

type Props = { def: NodeDefinition; hasExecuteOption: boolean } & Pick<CustomFunctionCreationContextStore, "setId" | "mode" | "setDescription" | "setCanBeExecuted" | "isNameValid">;

export function CustomNodeModalHeader({ def, hasExecuteOption, ...context }: Props) {
  return (
    <section className="header">
      <Fieldset
        label="Name"
        input={TextInput}
        value={def.id}
        onChange={context.setId}
        disabled={context.mode === "edit"}
        valid={context.isNameValid()}
      />
      {hasExecuteOption && (
        <Fieldset
          label="Can be executed"
          input={BoolInput}
          value={def.canBeExecuted}
          onChange={(b) => context.setCanBeExecuted(!def.canBeExecuted)}
        />
      )}
      <Fieldset
        label="description"
        input={TextInput}
        value={def.description}
        onChange={context.setDescription}
      />
    </section>
  );
}
