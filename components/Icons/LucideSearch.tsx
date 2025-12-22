import Svg, { Circle, G, Path } from "react-native-svg";

type IconProps = {
  size?: number;
  color?: string;
};

export function LucideSearch({
  size = 30,
  color = "#fff",
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <G
        fill="none"
        stroke="#0C0C1D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
      >
        <Path d="m21 21l-4.34-4.34" />
        <Circle cx="11" cy="11" r="8" />
      </G>
    </Svg>
  );
}
