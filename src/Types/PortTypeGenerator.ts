import { ConstrainDeclaration, Constraints } from "../Utils/ui/applyConstraints";
import { PortDefinition } from "./PortDefinition";
import { PortType } from "./PortType";
import { PortTypeDefinitions } from "./PortTypeDefinitions";

type PortTypeGeneratorFunction = (id: string | [string | string], defaultValue?: any, tooltip?: string | ConstrainDeclaration[], constrains?: ConstrainDeclaration[]) => PortDefinition;
type PortTypeGenerator = {
  [key in PortType]: PortTypeGeneratorFunction;
};

var defaultPort: PortTypeGenerator = Object.fromEntries(
  Object.keys(PortTypeDefinitions).map((portType) => [
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
        defaultValue: defaultValue === undefined ? PortTypeDefinitions[portType as PortType].createDefaultValue() : defaultValue,
      };
    },
  ])
) as PortTypeGenerator;

export const Port = {
  ...defaultPort,
  CacheId: () => defaultPort.number("cache-id", 0, "The first time node is call it will save it result in a cache with this name. After that is will reuse the cache if one already exist instead of generating a new number", [Constraints.Integer()]),
};
