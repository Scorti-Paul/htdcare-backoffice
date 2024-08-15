export interface ButtonProps {
  text: string;
  Icon?: JSX.Element;
  type?: ButtonType;
  hasIcon?: boolean;
  onClick: (e, params = {}) => void;
  path: string;
  ref?: (e, params = {}) => void;
  children?: string;
  loading?: boolean;
}

type ButtonType = "primary" | "secondary" | "link";
