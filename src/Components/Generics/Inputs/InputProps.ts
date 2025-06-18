import { ConstrainDeclaration } from "../../../Utils/graph/applyConstraints";

export type InputProps<T> = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  onChange: (value: T) => void;
  value: T;
  passtrough?: any;
  disabled?: boolean;
  constrains?: ConstrainDeclaration[];
};
