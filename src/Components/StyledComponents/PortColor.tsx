import { Icon, IconArrowUpRightCircle, IconColorSwatch, IconCube, IconNumber2, IconNumber3, IconNumber4, IconNumbers, IconPaint, IconPalette, IconPhoto, IconPlayerPlayFilled, IconQuestionMark, IconQuote, IconToggleLeft } from "@tabler/icons-react";
import { NumberInput } from "../Inputs/NumberInput";
import { ColorInput } from "../Inputs/ColorInput";
import { VectorInput } from "../Inputs/VectorInput";
import { BoolInput } from "../Inputs/BoolInput";
import { TextInput } from "../Inputs/TextInput";
import { PortType } from "../../Types/PortType";
import { MaterialInput } from "../Inputs/MaterialInput";

type InputComponent = ({ onChange, value }: { onChange: (value: any) => void; value: any }) => any;

type PortColorDefinition = {
  icon: Icon;
  input?: InputComponent;
  tinyIcon?: Icon;
};

export const PortColor: { [key in PortType]: PortColorDefinition } = {
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
  material: {
    icon: IconPaint,
    input: MaterialInput,
    tinyIcon: IconPaint,
  },
  model: {
    icon: IconCube,
    input: undefined,
    tinyIcon: IconCube,
  },
  unknown: {
    icon: IconQuestionMark,
    input: undefined,
    tinyIcon: IconQuestionMark,
  },
  "array-string": {
    icon: IconQuote,
    tinyIcon: IconQuote,
  },
  "array-number": {
    icon: IconNumbers,
    tinyIcon: IconNumbers,
  },
  "array-material": {
    icon: IconPaint,
    tinyIcon: IconPaint,
  },
  "array-vector2": {
    icon: IconArrowUpRightCircle,
    tinyIcon: IconNumber2,
  },
  "array-color": {
    icon: IconPalette,
    tinyIcon: IconPalette,
  },
  "array-bool": {
    icon: IconToggleLeft,
    tinyIcon: IconToggleLeft,
  },
  "array-image": {
    icon: IconPhoto,
    tinyIcon: IconPhoto,
  },
  "array-gradient": {
    icon: IconColorSwatch,
    tinyIcon: IconColorSwatch,
  },
  "array-vector": {
    icon: IconArrowUpRightCircle,
    tinyIcon: IconArrowUpRightCircle,
  },
  "array-vector3": {
    icon: IconArrowUpRightCircle,
    tinyIcon: IconNumber3,
  },
  "array-vector4": {
    icon: IconArrowUpRightCircle,
    tinyIcon: IconNumber4,
  },
  "array-model": {
    icon: IconCube,
    tinyIcon: IconCube,
  },
};
