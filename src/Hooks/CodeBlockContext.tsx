import { createContext } from "react";
import { CodeBlock } from "../Types/CodeBlock";

export const CodeBlockContext = createContext<CodeBlock | null>(null);
