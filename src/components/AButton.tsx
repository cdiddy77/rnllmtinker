import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface AButtonProps {
  onPress: () => void;
  onPressIn?: () => void;
  action: string; // for analytics
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  dimWhenDisabled?: boolean;
}
export const AButton: React.FC<React.PropsWithChildren<AButtonProps>> = ({
  onPress,
  action,
  disabled,
  children,
  style,
  dimWhenDisabled = true,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const onPressIn = () => {
    if (disabled) {
      return;
    }
    scale.value = withTiming(0.95, { duration: 100 });
    opacity.value = withTiming(0.5, { duration: 100 });
  };

  const onPressOut = () => {
    if (disabled) {
      return;
    }
    scale.value = withTiming(1, { duration: 100 });
    opacity.value = withTiming(1, { duration: 100 });
  };

  const press = React.useCallback(() => {
    if (disabled) {
      return;
    }
    console.log(JSON.stringify({ eventName: "button_click", action }));
    onPress();
  }, [disabled, action, onPress]);
  const disabledStyle = disabled && dimWhenDisabled ? { opacity: 0.5 } : {};
  return (
    <AnimatedPressable
      style={[style, animatedStyle, disabledStyle]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={press}
      disabled={disabled}
    >
      {children}
    </AnimatedPressable>
  );
};
