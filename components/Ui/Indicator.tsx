import { useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { DynamicAnimatedView } from "@/components";

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
    <DynamicAnimatedView
      style={style}
      borderRadius={8}
      height={8}
      marginHorizontal={index === 1 ? "XS" : undefined}
    />
  );
};

export default Indicator;

const styles = StyleSheet.create({
  centerItem: { marginHorizontal: 8 },
});
