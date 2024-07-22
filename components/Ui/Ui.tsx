import React, { useId, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import Header from "./Header";
import Contribution from "./Contribution";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { DynamicAnimatedView, DynamicView } from "..";
import Indicator from "./Indicator";

const getActiveIndex = (translateX: SharedValue<number>) => {
  "worklet";

  const activeIndex = Math.round(translateX.value / width);
  console.log("activeIndex getActiveIndex", activeIndex);
  return activeIndex;
};
const { width } = Dimensions.get("window");
const snapToOffsets = [0, width];
const items = new Array(3).fill(null);
const Ui = () => {
  const translateX = useSharedValue(0);
  const [activeIndex, setactiveIndex] = useState(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      translateX.value = x;
      const i = Math.round(x / width);
      runOnJS(setactiveIndex)(i);
    },
  });
  const id = useId();

  return (
    <GestureHandlerRootView style={styles.container}>
      <Header />
      <Animated.ScrollView
        onScroll={onScroll}
        horizontal
        decelerationRate="fast"
        snapToOffsets={snapToOffsets}
        showsHorizontalScrollIndicator={false}
      >
        {items.map((_, i) => (
          <Contribution
            activeIndex={activeIndex}
            index={i}
            key={`${id}_${i}_contribution`}
          />
        ))}
      </Animated.ScrollView>
      <DynamicView flexDirection="row" my="S">
        {items.map((_, i) => (
          <Indicator
            key={`${id}_${i}_indicator`}
            index={i}
            translateX={translateX}
          />
        ))}
      </DynamicView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  sliderHandle: {
    width: 40,
    height: 40,
    backgroundColor: "red",
    borderRadius: 20,
    position: "absolute",
    left: 5,
  },
});

export default Ui;
