import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DialogModal } from "../Components/Modals/DialogModal";
import { DropdownInput } from "../Components/Generics/Inputs/DropdownInput";
import { TextInput } from "../Components/Generics/Inputs/TextInput";
import { NumberInput } from "../Components/Generics/Inputs/NumberInput";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Dialog Modal",
  component: DialogModal,
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
    controler: {
      dialogs: [],
      open: fn(),
      close: fn(),
      clickButton: fn(),
      setField: fn(),
      openConfirm: fn(),
      openError: fn(),
      openPrompt: fn(),
    },
  },
} satisfies Meta<typeof DialogModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Main: Story = {
  args: {
    dialog: {
      header: "Demo",
      text: "Ut sint dolore minim non.",
      callback: fn(),
      buttons: [
        {
          key: "cancel",
          label: "textCancel",
          style: "invisible",
        },
        {
          key: "confirm",
          label: "textConfirm",
          style: "normal",
        },
      ],
      fields: [],
    },
  },
};

export const Fields: Story = {
  args: {
    dialog: {
      header: "Fields",
      text: "Ut sint dolore minim non. Ipsum occaecat eiusmod est voluptate tempor labore dolore occaecat excepteur excepteur ea.",
      callback: fn(),
      buttons: [
        {
          key: "cancel",
          label: "textCancel",
          style: "invisible",
        },
        {
          key: "confirm",
          label: "textConfirm",
          style: "normal",
        },
      ],
      fields: [
        {
          key: "age",
          label: "Your Age",
          input: NumberInput,
          defaultValue: 0,
        },
        {
          key: "name",
          label: "Your name",
          input: TextInput,
          defaultValue: "Georgy",
        },
        {
          key: "dropText",
          label: "Option",
          input: DropdownInput,
          defaultValue: "Georgy",
          passTrough: { options: ["Marc", "jacobe", "Edward"] },
        },
      ],
    },
  },
};
