import { createGlobalStyle } from "styled-components";
import { PortTypeDefinitions } from "./Types/PortTypeDefinitions";

export const PortStyle = createGlobalStyle`
:root {
    ${Object.entries(PortTypeDefinitions)
      .map(([key, def]) => `--color-${key}: ${def.color};`)
      .join("\n")}
  }

${Object.entries(PortTypeDefinitions)
  .map(
    ([key, def]) => `
  .${key} {
    --color-property: ${def.color};
  }
  `
  )
  .join("\n")}

`;
