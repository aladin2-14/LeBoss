import * as Haptics from "expo-haptics";
import { Pressable, type PressableProps } from "react-native";

type HapticTabProps = PressableProps & {
  onPressIn?: PressableProps["onPressIn"];
};

export function HapticTab(props: HapticTabProps) {
  return (
    <Pressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        props.onPressIn?.(ev);
      }}
    />
  );
}
