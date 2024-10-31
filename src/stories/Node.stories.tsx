import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Fieldset } from "../Components/StyledComponents/Fieldset";
import { NumberInput } from "../Components/Settings/NumberInput";
import { TextInput } from "../Components/Settings/TextInput";
import { BoolInput } from "../Components/Settings/BoolInput";
import { ColorInput } from "../Components/Settings/ColorInput";
import { DropdownInput } from "../Components/Settings/DropdownInput";
import { VectorInput } from "../Components/Settings/VectorInput";
import { GraphNodeUI } from "../Components/Graph/GraphNodeUI";
import { createNodeData } from "../Utils/createNodeData";
import { DrawRect } from "../Nodes/Draw/DrawRect";
import { SpringValue } from "@react-spring/web";
import { Remap } from "../Nodes/Math/Remap";
import { ForGrid } from "../Nodes/System/ForGrid";
import { Envelope } from "../Nodes/Math/Envelope";
import { Palette } from "../Nodes/Color/PickFromPalette";
import { GradientNode } from "../Nodes/Color/GradientNode";
import { UploadImage } from "../Nodes/Images/UploadImage";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Node",
  component: GraphNodeUI,
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
    node: createNodeData(DrawRect, 10, 10),
    xy: new SpringValue({ to: [100, 100] as number[] }),
    isSelected: false,
    onMove: fn(),
    onTap: fn(),
    onClickPort: fn(),
  },
  render: ({ ...args }) => (
    <svg style={{ width: `100%`, height: "100%" }} width={500} height={800}>
      <GraphNodeUI {...args} />
    </svg>
  ),
} satisfies Meta<typeof GraphNodeUI>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DrawRectStory: Story = {
  args: {
    node: createNodeData(DrawRect, 10, 10),
  },
};

export const RemapStory: Story = {
  args: {
    node: createNodeData(Remap, 10, 10),
  },
};

export const ForGridStory: Story = {
  args: {
    node: createNodeData(ForGrid, 10, 10),
  },
};

export const EnvelopeStory: Story = {
  args: {
    node: createNodeData(Envelope, 10, 10),
  },
};

export const PaletteStory: Story = {
  args: {
    node: createNodeData(Palette, 10, 10),
  },
};

export const GradientNodeStory: Story = {
  args: {
    node: createNodeData(GradientNode, 10, 10),
  },
};

export const UploadImageStory: Story = {
  args: {
    node: createNodeData(UploadImage, 10, 10),
  },
};
