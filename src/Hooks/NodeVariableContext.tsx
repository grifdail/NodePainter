import { createContext } from "react";
import { PortDefinition } from "../Types/PortDefinition";

export const NodeVariableContext = createContext<PortDefinition[]>([]);
