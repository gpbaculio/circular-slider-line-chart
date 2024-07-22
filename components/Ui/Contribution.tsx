import React from "react";
import { Dimensions } from "react-native";

import { interpolate, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import CircularProgress from "@/components/CircularSlider/CircularProgress";
import { DynamicPressable, DynamicText, DynamicView } from "@/components";

const { width } = Dimensions.get("window");

const Contribution = () => {
  const xCenter = useSharedValue(0);
  const yCenter = useSharedValue(0);

  const size = width * 0.65;
  const strokeWidth = 30;
  const r = (size + strokeWidth / 2) / 2;
  const cartesianToPolar = (x: number, y: number) => {
    "worklet";
    let hC = r;

    // Calculate the differences
    const dx = x - hC;
    const dy = y - hC;

    // Calculate the angle using atan2 to handle all quadrants smoothly
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Convert angle from [-180, 180] range to [0, 360] range
    const normalizedAngle = (angle + 360) % 360;

    return Math.round(normalizedAngle);
  };

  const end = useSharedValue(0.001);

  const gesture = Gesture.Pan().onUpdate((e) => {
    const xOrigin = xCenter.value - r;
    const yOrigin = yCenter.value - r;
    const newAngle = cartesianToPolar(
      e.absoluteX - xOrigin,
      e.absoluteY - yOrigin
    );
    console.log("newAngle ", newAngle);
    end.value = interpolate(newAngle, [0, 360], [0, 1]);
  });

  return (
    <DynamicView
      {...{
        width,
        height: 300,
        alignItems: "center",
        justifyContent: "center",
      }}
      onLayout={(e) => {
        "worklet";
        const { width, height } = e.nativeEvent.layout;

        xCenter.value = width / 2;
        yCenter.value = height / 2;
      }}
    >
      <GestureDetector gesture={gesture}>
        <CircularProgress progress={end} />
      </GestureDetector>
      <DynamicView position="absolute" variant="centerItems">
        <DynamicText color="gray">You've contributed</DynamicText>
        <DynamicText color="dark" fontWeight="bold" fontSize={18}>
          $5,700
        </DynamicText>
        <DynamicText color="gray">Total pot</DynamicText>
      </DynamicView>
      <DynamicPressable
        mt="XS"
        backgroundColor="dark"
        variant="rowAlignCenter"
        py="XS"
        px="S"
        borderRadius={24}
      >
        <DynamicText color="white">Contribute</DynamicText>
        <MaterialCommunityIcons
          name="arrow-top-right"
          size={24}
          color="white"
        />
      </DynamicPressable>
    </DynamicView>
  );
};

export default Contribution;
