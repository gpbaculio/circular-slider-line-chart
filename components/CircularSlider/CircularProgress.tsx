import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Circle } from "react-native-svg";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const size = width * 0.55;
const strokeWidth = 30;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;

interface CircularPogressProps {
  progress: SharedValue<number>;
}

export default ({ progress }: CircularPogressProps) => {
  const circumference = r * 2 * PI;

  const animProps = useAnimatedProps(() => {
    const theta = interpolate(progress.value, [1, 0], [0, PI * 2]);
    const strokeDashoffset = theta * r;
    return {
      strokeDashoffset,
    };
  });
  return (
    <Svg width={size} height={size} style={styles.container}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
          <Stop offset="0" stopColor="#D100D3" />
          <Stop offset="1" stopColor="#5e22ff" />
        </LinearGradient>
      </Defs>
      <Circle
        stroke="#F5F5F5"
        fill="none"
        {...{
          strokeWidth,
          cx,
          cy,
          r,
        }}
      />
      <AnimatedCircle
        stroke="url(#grad)"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        animatedProps={animProps}
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{
          strokeWidth,
          cx,
          cy,
          r,
        }}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ rotate: `270deg` }],
  },
});
