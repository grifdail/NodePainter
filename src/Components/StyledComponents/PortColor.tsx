import { Icon, IconArrowUpRightCircle, IconColorSwatch, IconNumber2, IconNumber3, IconNumber4, IconNumbers, IconPalette, IconPhoto, IconPlayerPlayFilled, IconQuote, IconToggleLeft } from "@tabler/icons-react";
import { NumberInput } from "../Settings/NumberInput";
import { ColorInput } from "../Settings/ColorInput";
import { VectorInput } from "../Settings/VectorInput";
import { BoolInput } from "../Settings/BoolInput";
import { TextInput } from "../Settings/TextInput";

type InputComponent = ({ onChange, value }: { onChange: (value: any) => void; value: any }) => any;

type PortColorDefinition = {
  icon: Icon;
  input?: InputComponent;
  tinyIcon?: Icon;
};

export const PortColor: { [key: string]: PortColorDefinition } = {
  execute: {
    icon: IconPlayerPlayFilled,
  },
  number: {
    icon: IconNumbers,
    input: NumberInput,
    tinyIcon: IconNumbers,
  },
  vector: {
    icon: IconArrowUpRightCircle,
    input: VectorInput,
    tinyIcon: IconArrowUpRightCircle,
  },
  vector2: {
    icon: IconArrowUpRightCircle,
    input: VectorInput,
    tinyIcon: IconNumber2,
  },
  vector3: {
    icon: IconArrowUpRightCircle,
    input: VectorInput,
    tinyIcon: IconNumber3,
  },
  vector4: {
    icon: IconArrowUpRightCircle,
    input: VectorInput,
    tinyIcon: IconNumber4,
  },
  color: {
    icon: IconPalette,
    input: ColorInput,
    tinyIcon: IconPalette,
  },
  string: {
    icon: IconQuote,
    input: TextInput,
    tinyIcon: IconQuote,
  },
  bool: {
    icon: IconToggleLeft,
    input: BoolInput,
    tinyIcon: IconToggleLeft,
  },
  gradient: {
    icon: IconColorSwatch,
    tinyIcon: IconColorSwatch,
  },
  image: {
    icon: IconPhoto,
    tinyIcon: IconPhoto,
  },
};
