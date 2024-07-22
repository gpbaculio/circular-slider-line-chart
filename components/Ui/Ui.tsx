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
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { DynamicView } from "..";
import Indicator from "./Indicator";

const { width } = Dimensions.get("window");
const snapToOffsets = [0, width];
const items = new Array(3).fill(null);
const Ui = () => {
  const translateX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      translateX.value = x;
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
          <Contribution key={`${id}_${i}_contribution`} />
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
