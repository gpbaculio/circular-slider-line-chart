import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia";
import { interpolate, useSharedValue } from "react-native-reanimated";
import CircularProgress from "./CircularProgress";

interface Props {
  btnRadius?: number;
  dialRadius?: number;
  dialWidth?: number;
  meterColor?: string;
  textColor?: string;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  textSize?: number;
  value?: number;
  min?: number;
  max?: number;
  xCenter?: number;
  yCenter?: number;
  onValueChange?: (x: number) => number;
}
const Slider: React.FC<Props> = ({
  btnRadius = 15,
  dialRadius = 130,
  xCenter = Dimensions.get("window").width / 2,
  yCenter = Dimensions.get("window").height / 2,
}) => {
  const cartesianToPolar = (x: number, y: number) => {
    "worklet";
    let hC = dialRadius + btnRadius;

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
  const xOrigin = xCenter - (dialRadius + btnRadius);
  const yOrigin = yCenter - (dialRadius + btnRadius);
  const gesture = Gesture.Pan().onChange((e) => {
    const newAngle = cartesianToPolar(
      e.absoluteX - xOrigin,
      e.absoluteY - yOrigin
    );
    end.value = interpolate(newAngle, [0, 360], [0, 1]);
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <CircularProgress progress={end} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    backgroundColor: "#333333",
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

export default Slider;
