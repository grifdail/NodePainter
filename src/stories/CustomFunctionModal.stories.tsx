import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { IconBrush } from "@tabler/icons-react";
import { Modal } from "../Components/Modal";
import { DrawCircle } from "../Nodes/Draw/DrawCircle";
import { Remap } from "../Nodes/Math/Remap";
import { DrawRect } from "../Nodes/Draw/DrawRect";
import { CustomFunctionModalNoLogic } from "../Components/Modals/CustomNodes/CustomFunctionModalNoLogic";
import { CustomFunctionModalSettings } from "../Components/Modals/CustomNodes/CustomFunctionModal";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Custom Function Modals",
  component: CustomFunctionModalNoLogic,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    controls: {
      exclude: /(children|icon)/g,
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    nodeDefinition: Remap,
    type: "shader",
    mode: "edit",
    model: null,
    setPortId: fn(),
    setPortDefaultValue: fn(),
    deletePort: fn(),
    setPortType: fn(),
    create: fn(),
    cancel: fn(),
    addOutput: fn(),
    addInputs: fn(),
    setId: fn(),
    setCanBeExecuted: fn(),
    openEdit: fn(),
    openCreate: fn(),
    isNameValid: fn(),
    setDescription: fn(),
    close: fn(),
    availableTypesOutput: ["number", "vector2", "vector3", "vector4", "color", "bool", "gradient", "string", "material"],
    availableTypesInput: ["number", "vector2", "vector3", "vector4", "color", "bool", "gradient", "string", "material"],
    settings: CustomFunctionModalSettings,
    hasExecuteOption: true,
  },
} satisfies Meta<typeof CustomFunctionModalNoLogic>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const RemapDemo: Story = {
  args: {
    nodeDefinition: Remap,
    close: fn(),
  },
};
export const DrawRectDemo: Story = {
  args: {
    nodeDefinition: DrawRect,
    close: fn(),
  },
};
