import { Icon, IconArrowUpRightCircle, IconNumbers, IconPalette, IconPlayerPlayFilled, IconQuote, IconToggleLeft } from "@tabler/icons-react";
import { NumberInput } from "../NumberInput";
import { ColorInput } from "../ColorInput";
import { VectorInput } from "./VectorInput";
import { BoolInput } from "./BoolInput";

type InputComponent = ({ onChange, value }: { onChange: (value: any) => void; value: any }) => any;

type PortColorDefinition = {
  color: string;
  icon: Icon;
  input?: InputComponent;
};

export const PortColor: { [key: string]: PortColorDefinition } = {
  execute: {
    color: "#2fb344",
    icon: IconPlayerPlayFilled,
    input: ({ onChange, value }) => {
      return null;
    },
  },
  number: {
    color: "#4299e1",
    icon: IconNumbers,
    input: NumberInput,
  },
  vector2: {
    color: "#ae3ec9",
    icon: IconArrowUpRightCircle,
    input: VectorInput,
  },
  color: {
    color: "#f76707",
    icon: IconPalette,
    input: ColorInput,
  },
  string: {
    color: "#d6336c",
    icon: IconQuote,
  },
  bool: {
    color: "#17a2b8",
    icon: IconToggleLeft,
    input: BoolInput,
  },
};
