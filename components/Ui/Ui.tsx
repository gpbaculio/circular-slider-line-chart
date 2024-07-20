import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { interpolate, useSharedValue } from "react-native-reanimated";
import CircularProgress from "@/components/CircularSlider/CircularProgress";
import { DynamicView } from "@/components";
import Header from "./Header";

const Ui = () => {
  const { width } = useWindowDimensions();
  const xCenter = useSharedValue(0);
  const yCenter = useSharedValue(0);

  const size = width * 0.65;
  const strokeWidth = 30;
  const r = (size - strokeWidth) / 2;

  const cartesianToPolar = (x: number, y: number) => {
    "worklet";
    let hC = r;

    if (x === 0) {
      return y > hC ? 0 : 180;
    } else if (y === 0) {
      return x > hC ? 90 : 270;
    } else {
      return (
        Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) +
        (x > hC ? 90 : 270)
      );
    }
  };

  const end = useSharedValue(0.001);

  const gesture = Gesture.Pan().onChange((e) => {
    const xOrigin = xCenter.value - r;
    const yOrigin = yCenter.value - r;
    const newAngle = cartesianToPolar(
      e.absoluteX - xOrigin,
      e.absoluteY - yOrigin
    );
    end.value = interpolate(newAngle, [0, 360], [0, 1]);
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <Header />
      <DynamicView
        width={width}
        height={300}
        alignItems="center"
        justifyContent="center"
        onLayout={(e) => {
          "worklet";
          const { x, y, width, height } = e.nativeEvent.layout;

          xCenter.value = x + width / 2;
          yCenter.value = y + height / 2;
        }}
      >
        <GestureDetector gesture={gesture}>
          <CircularProgress progress={end} />
        </GestureDetector>
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
