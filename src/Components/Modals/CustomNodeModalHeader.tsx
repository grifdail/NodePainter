import { NodeDefinition } from "../../Types/NodeDefinition";
import { TextInput } from "../Settings/TextInput";
import { CustomFunctionCreationContextStore } from "../../Types/CustomFunctionCreationContextStore";

export function CustomNodeModalHeader({ context, def, hasExecuteOption }: { context: CustomFunctionCreationContextStore; def: NodeDefinition; hasExecuteOption: boolean }) {
  return (
    <section className="header">
      <fieldset className={context.isNameValid() ? "" : "invalid"}>
        <label>Name</label>
        <TextInput disabled={context.mode === "edit"} value={def.id} onChange={context.setId}></TextInput>
      </fieldset>
      {hasExecuteOption && (
        <fieldset>
          <label>Can be executed</label>
          <input type="checkbox" onChange={(e) => context.setCanBeExecuted(!def.canBeExecuted)} checked={def.canBeExecuted}></input>
        </fieldset>
      )}
      <fieldset>
        <label>description</label>
        <textarea onChange={(e) => context.setDescription(e.target.value)}>{def.description}</textarea>
      </fieldset>
    </section>
  );
}
