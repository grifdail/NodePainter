import { Icon, IconArrowUpRightCircle, IconColorSwatch, IconCube, IconNumber2, IconNumber3, IconNumber4, IconNumbers, IconPackage, IconPaint, IconPalette, IconPhoto, IconPlayerPlayFilled, IconQuestionMark, IconQuote, IconToggleLeft } from "@tabler/icons-react";

import { PortType } from "../../Types/PortType";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { VectorInput } from "../Generics/Inputs/VectorInput";
import { ColorInput } from "../Generics/Inputs/ColorInput";
import { TextInput } from "../Generics/Inputs/TextInput";
import { BoolInput } from "../Generics/Inputs/BoolInput";
import { MaterialInput } from "../Generics/Inputs/MaterialInput";

type InputComponent = ({ onChange, value }: { onChange: (value: any) => void; value: any }) => any;

type PortColorDefinition = {
  icon: Icon;
  inputInline?: InputComponent;
  input?: InputComponent;
  tinyIcon?: Icon;
};

export const PortColor: { [key in PortType]: PortColorDefinition } = {
  execute: {
    icon: IconPlayerPlayFilled,
  },
  number: {
    icon: IconNumbers,
    inputInline: NumberInput,
    tinyIcon: IconNumbers,
  },
  vector: {
    icon: IconArrowUpRightCircle,
    inputInline: VectorInput,
    tinyIcon: IconArrowUpRightCircle,
  },
  vector2: {
    icon: IconArrowUpRightCircle,
    inputInline: VectorInput,
    tinyIcon: IconNumber2,
  },
  vector3: {
    icon: IconArrowUpRightCircle,
    inputInline: VectorInput,
    tinyIcon: IconNumber3,
  },
  vector4: {
    icon: IconArrowUpRightCircle,
    inputInline: VectorInput,
    tinyIcon: IconNumber4,
  },
  color: {
    icon: IconPalette,
    inputInline: ColorInput,
    tinyIcon: IconPalette,
  },
  string: {
    icon: IconQuote,
    inputInline: TextInput,
    tinyIcon: IconQuote,
  },
  bool: {
    icon: IconToggleLeft,
    inputInline: BoolInput,
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
    inputInline: MaterialInput,
    tinyIcon: IconPaint,
  },
  mesh: {
    icon: IconCube,
    inputInline: undefined,
    tinyIcon: IconCube,
  },
  struct: {
    icon: IconPackage,
    inputInline: undefined,
    tinyIcon: IconPackage,
  },
  unknown: {
    icon: IconQuestionMark,
    inputInline: undefined,
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
  "array-mesh": {
    icon: IconCube,
    tinyIcon: IconCube,
  },
  "array-struct": {
    icon: IconPackage,
    tinyIcon: IconPackage,
  },
};
