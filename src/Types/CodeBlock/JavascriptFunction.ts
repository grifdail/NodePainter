import { PortDefinition } from "../PortDefinition";

export type JavascriptFunction = {
    code: string;
    isModified: boolean,
    inputVariables: PortDefinition[];
    outputVariables: PortDefinition[];
};
