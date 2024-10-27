import type { Preview } from "@storybook/react";
import React from "react";

import "../src/index.css";
import "./preview.css";

const preview: Preview = {
  decorators: [(Story) => <div className="app">{<Story />}</div>],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      // 👇 Default options
      dark: { name: "Dark", value: "var(--color-background)" },
      light: { name: "Light", value: "var(--color-background)" },
      // 👇 Add your own
      maroon: { name: "Maroon", value: "#400" },
    },
  },
};

export default preview;
