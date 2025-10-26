export interface IconProps {
  size: "sm" | "md" | "lg";
  onClick?: () => void;
}

export const IconSizeVarients = {
  sm: "size-2",
  md: "size-4",
  lg: "size-6",
};
