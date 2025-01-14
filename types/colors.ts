export type Color =
  | "blue"
  | "red"
  | "green"
  | "black"
  | "white"
  | "pink"
  | "grey"
  | "purple"
  | "yellow";

export const ColorClasses: Record<Color, string> = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-green-500",
  black: "bg-black",
  white: "bg-white",
  pink: "bg-pink-500",
  yellow: "bg-yellow-500",
  grey: "bg-gray-500",
  purple: "bg-purple-500"
};
