import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { IconBrush } from "@tabler/icons-react";
import { Modal } from "../Components/Modal";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Modal",
  component: Modal,
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
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onClose: fn(),
    icon: IconBrush,
    title: "Test",
    size: "medium",
  },
  render: ({ ...args }) => {
    return (
      <Modal {...args}>
        <p>
          Occaecat ad culpa velit labore. Culpa elit eu sit tempor. In ipsum elit sint tempor nulla officia. Culpa anim ullamco enim fugiat ex dolor exercitation ipsum labore ex officia ut magna. Duis esse aute sunt duis voluptate minim exercitation proident reprehenderit. Proident voluptate occaecat aliquip duis consectetur ea. Incididunt excepteur nostrud elit sit eu qui exercitation in officia
        </p>
        <p>
          reprehenderit mollit ea dolore officia. Sit aliquip enim consectetur tempor fugiat sunt qui consequat duis amet. Ad ex magna ullamco eiusmod nisi proident sit ut dolor dolore aliquip labore dolor laborum. Tempor reprehenderit qui consectetur ullamco sit duis minim duis irure id enim ullamco aute. Et laboris voluptate anim fugiat veniam. Ea amet pariatur deserunt aute ex in commodo
          pariatur
        </p>
        <p>in mollit dolor excepteur labore. Exercitation culpa eu anim velit. Irure aliquip Lorem sit velit sint.</p>
      </Modal>
    );
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {};

export const SmallParagraph: Story = {
  render: ({ ...args }) => {
    return (
      <Modal {...args}>
        <p>
          Occaecat ad culpa velit labore. Culpa elit eu sit tempor. In ipsum elit sint tempor nulla officia. Culpa anim ullamco enim fugiat ex dolor exercitation ipsum labore ex officia ut magna. Duis esse aute sunt duis voluptate minim exercitation proident reprehenderit. Proident voluptate occaecat aliquip duis consectetur ea. Incididunt excepteur nostrud elit sit eu qui exercitation in officia
        </p>
      </Modal>
    );
  },
};

export const SmallTextParagraph: Story = {
  render: ({ ...args }) => {
    return (
      <Modal {...args}>
        <p>Anim in do aute id ut cillum est minim in dolor ex ullamco quis veniam.</p>
      </Modal>
    );
  },
};
