import { createContext } from "react";
import { CodeBlock } from "../Types/CodeBlock/CodeBlock";
import { PortDefinition } from "../Types/PortDefinition";

export const NodeVariableContext = createContext<PortDefinition[]>([]);
