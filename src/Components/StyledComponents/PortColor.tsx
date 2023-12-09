import { Icon, IconArrowUpRightCircle, IconColorSwatch, IconNumbers, IconPalette, IconPhoto, IconPlayerPlayFilled, IconQuote, IconToggleLeft } from "@tabler/icons-react";
import { NumberInput } from "../Settings/NumberInput";
import { ColorInput } from "../Settings/ColorInput";
import { VectorInput } from "../Settings/VectorInput";
import { BoolInput } from "../Settings/BoolInput";

type InputComponent = ({ onChange, value }: { onChange: (value: any) => void; value: any }) => any;

type PortColorDefinition = {
  icon: Icon;
  input?: InputComponent;
};

export const PortColor: { [key: string]: PortColorDefinition } = {
  execute: {
    icon: IconPlayerPlayFilled,
  },
  number: {
    icon: IconNumbers,
    input: NumberInput,
  },
  vector2: {
    icon: IconArrowUpRightCircle,
    input: VectorInput,
  },
  color: {
    icon: IconPalette,
    input: ColorInput,
  },
  string: {
    icon: IconQuote,
  },
  bool: {
    icon: IconToggleLeft,
    input: BoolInput,
  },
  gradient: {
    icon: IconColorSwatch,
  },
  image: {
    icon: IconPhoto,
  },
};
