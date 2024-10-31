export type InputProps<T> = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  onChange: (value: T) => void;
  value: T;
  passtrough?: any;
  disabled?: boolean;
};
