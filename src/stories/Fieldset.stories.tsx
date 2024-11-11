import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Fieldset } from "../Components/StyledComponents/Fieldset";
import { NumberInput } from "../Components/Generics/Inputs/NumberInput";
import { VectorInput } from "../Components/Generics/Inputs/VectorInput";
import { TextInput } from "../Components/Generics/Inputs/TextInput";
import { BoolInput } from "../Components/Generics/Inputs/BoolInput";
import { ColorInput } from "../Components/Generics/Inputs/ColorInput";
import { DropdownInput } from "../Components/Generics/Inputs/DropdownInput";
import { SliderInput } from "../Components/Generics/Inputs/SliderInput";

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
    disabled: false,
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

export const Vector2: Story = {
  args: {
    label: "Vector2",
    input: VectorInput,
    onChange: fn(),
    value: [0, 2],
  },
};

export const Vector3: Story = {
  args: {
    label: "Vector2",
    input: VectorInput,
    onChange: fn(),
    value: [0, 2, 3],
  },
};

export const Vector4: Story = {
  args: {
    label: "Vector2",
    input: VectorInput,
    onChange: fn(),
    value: [0, 2, 4, 5],
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

export const Dropdown: Story = {
  args: {
    label: "Hello",
    input: DropdownInput,
    onChange: fn(),
    value: "Oh no",
    passtrough: {
      options: ["test", "Oh no", "pancake"],
    },
  },
};

export const Slider: Story = {
  args: {
    label: "Hello",
    input: SliderInput as any,
    onChange: fn(),
    value: 10,
    passtrough: {
      min: 1,
      max: 100,
    },
  },
};
