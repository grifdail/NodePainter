import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { IconBrush, IconMenu2 } from "@tabler/icons-react";
import { Button, InvisibleButton } from "../Components/Generics/Button";
import { ButtonGroup } from "../Components/StyledComponents/ButtonGroup";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "ButtonGroup",
  component: ButtonGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    controls: {
      exclude: /(children|icon)/g,
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onClick: fn(),
    vertical: false,
    align: "center",
    nested: false,
  },
  argTypes: {
    align: {
      options: ["start", "end", "center", "stretch"],
      control: "radio",
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
  render: ({ ...args }) => (
    <ButtonGroup {...args}>
      <Button label="Test"></Button>
      <Button label="Test 2"></Button>
      <Button label="Test but long"></Button>
    </ButtonGroup>
  ),
};

export const IconOnly: Story = {
  args: {},
  render: ({ ...args }) => (
    <ButtonGroup {...args}>
      <Button icon={IconBrush}></Button>
      <Button icon={IconMenu2}></Button>
    </ButtonGroup>
  ),
};

export const IconAndText: Story = {
  args: {},
  render: ({ ...args }) => (
    <ButtonGroup {...args}>
      <Button
        icon={IconBrush}
        label="Heu"></Button>
      <Button
        icon={IconMenu2}
        label="Hello world"></Button>
    </ButtonGroup>
  ),
};

export const Mixed: Story = {
  args: {},
  render: ({ ...args }) => (
    <ButtonGroup {...args}>
      <InvisibleButton label="Oh no ! This is long"></InvisibleButton>
      <Button label="Hey"></Button>
      <Button
        icon={IconMenu2}
        label="Hello world"></Button>
      <Button icon={IconMenu2}></Button>
    </ButtonGroup>
  ),
};

export const Grouping: Story = {
  args: {
    $forceStretch: false,
  },
  render: ({ ...args }) => (
    <div
      style={{
        width: "500px",
      }}>
      <ButtonGroup {...args}>
        <Button label="Hey"></Button>
        <Button
          icon={IconMenu2}
          label="Hello world"></Button>
        <Button icon={IconMenu2}></Button>
      </ButtonGroup>
    </div>
  ),
};
