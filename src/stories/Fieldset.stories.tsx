import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { IconBrush } from "@tabler/icons-react";
import { InvisibleButton } from "../Components/Generics/Button";
import { Fieldset } from "../Components/StyledComponents/Fieldset";
import { NumberInput } from "../Components/Settings/NumberInput";
import { TextInput } from "../Components/Settings/TextInput";
import { BoolInput } from "../Components/Settings/BoolInput";
import { ColorInput } from "../Components/Settings/ColorInput";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Fieldset",
  component: Fieldset,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    controls: {
      exclude: /(children|icon)/g,
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onChange: fn(),
  },
  render: ({ ...args }) => (
    <div style={{ width: `300px` }}>
      <Fieldset {...args} />
    </div>
  ),
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Number: Story = {
  args: {
    label: "Hello",
    input: NumberInput,
    onChange: fn(),
    value: 10,
  },
};

export const Text: Story = {
  args: {
    label: "Hello",
    input: TextInput,
    onChange: fn(),
    value: "Text",
  },
};

export const Checkbox: Story = {
  args: {
    label: "Hello",
    input: BoolInput,
    onChange: fn(),
    value: false,
  },
};

export const Color: Story = {
  args: {
    label: "Hello",
    input: ColorInput,
    onChange: fn(),
    value: [0, 0.5, 0.1, 1],
  },
};
