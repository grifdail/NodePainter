import { Icon, IconArrowUpRightCircle, IconColorSwatch, IconNumbers, IconPalette, IconPhoto, IconPlayerPlayFilled, IconQuote, IconToggleLeft } from "@tabler/icons-react";
import { NumberInput } from "../Settings/NumberInput";
import { ColorInput } from "../Settings/ColorInput";
import { VectorInput } from "../Settings/VectorInput";
import { BoolInput } from "../Settings/BoolInput";
import { TextInput } from "../Settings/TextInput";

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
  vector: {
    icon: IconArrowUpRightCircle,
    input: VectorInput,
  },
  vector2: {
    icon: IconArrowUpRightCircle,
    input: VectorInput,
  },
  vector3: {
    icon: IconArrowUpRightCircle,
    input: VectorInput,
  },
  vector4: {
    icon: IconArrowUpRightCircle,
    input: VectorInput,
  },
  color: {
    icon: IconPalette,
    input: ColorInput,
  },
  string: {
    icon: IconQuote,
    input: TextInput,
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
