import { ConstrainDeclaration } from "../Utils/applyConstraints";
import { createDefaultValue } from "../Utils/createDefaultValue";
import { PortDefinition } from "./PortDefinition";
import { PortType, PortTypeArray } from "./PortType";

type PortTypeGeneratorFunction = (id: string | [string | string], defaultValue?: any, tooltip?: string | ConstrainDeclaration[], constrains?: ConstrainDeclaration[]) => PortDefinition;
type PortTypeGenerator = {
  [key in PortType]: PortTypeGeneratorFunction;
};

export const Port: PortTypeGenerator = Object.fromEntries(
  PortTypeArray.map((portType) => [
    portType,
    (id: string | [string, string], defaultValue?: any, tooltip?: string | ConstrainDeclaration[], constrains?: ConstrainDeclaration[]): PortDefinition => {
      const label = typeof id === "string" ? undefined : id[1];
      const trueId = typeof id === "string" ? id : id[0];
      const trueTooltip = typeof tooltip === "string" ? tooltip : undefined;
      const trueConstrain = Array.isArray(tooltip) ? (tooltip as ConstrainDeclaration[]) : constrains;
      return {
        type: portType as PortType,
        id: trueId,
        label,
        tooltip: trueTooltip,
        constrains: trueConstrain,
        defaultValue: defaultValue === undefined ? createDefaultValue(portType as PortType) : defaultValue,
      };
    },
  ])
) as PortTypeGenerator;
