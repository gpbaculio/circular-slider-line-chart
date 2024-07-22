import { useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  index: number;
  translateX: SharedValue<number>;
};

const Indicator = ({ index, translateX }: Props) => {
  const { width } = useWindowDimensions();

  const style = useAnimatedStyle(() => {
    const activeIndex = Math.round(translateX.value / width);

    const backgroundColor = withTiming(
      index === activeIndex ? "#5825FF" : "#9E9E9E",
      { duration: 75 }
    );
    const indicatorWidth = withTiming(index === activeIndex ? 24 : 8);

    return { backgroundColor, width: indicatorWidth };
  });

  return (
    <Animated.View
      style={[style, index === 1 && styles.centerItem, styles.item]}
    />
  );
};

export default Indicator;

const styles = StyleSheet.create({
  centerItem: { marginHorizontal: 8 },
  item: {
    borderRadius: 8,
    height: 8,
  },
});
