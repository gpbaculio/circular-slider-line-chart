import React, { useId, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import {
  Circle,
  LinearGradient,
  useFont,
  vec,
  Text as SKText,
} from "@shopify/react-native-skia";
import { Area, CartesianChart, Line, useChartPressState } from "victory-native";

import { DynamicPressable, DynamicText, DynamicView } from "@/components";
import Header from "./Header";
import Contribution from "./Contribution";
import Indicator from "./Indicator";

import { Theme } from "@/constants/restyleTheme";
import { DATA, DATA2 } from "../LineChart/utils/data";

const interBold = require("@/assets/fonts/roboto-bold.ttf");

const AnimatedLinearGradient =
  Animated.createAnimatedComponent(ExpoLinearGradient);

const { width } = Dimensions.get("window");
const snapToOffsets = [0, width];
const items = new Array(3).fill(null);
const INITIAL_BOX_SIZE = 50;
const SLIDER_WIDTH = width * 0.9;
const MAX_VALUE = SLIDER_WIDTH - INITIAL_BOX_SIZE;
const BUTTON_TEXTS = ["5y", "10y", "15y", "20y", "30y"];

const Ui = () => {
  const chartFont = useFont(interBold, 30);
  const id = useId();
  const [activeBtn, setActiveBtn] = useState(BUTTON_TEXTS[0]);
  const { bottom } = useSafeAreaInsets();
  const translateX = useSharedValue(0);
  const boxWidth = useSharedValue(INITIAL_BOX_SIZE);
  const offset = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      translateX.value = x;
    },
  });

  const pan = Gesture.Pan().onChange((event) => {
    offset.value =
      Math.abs(offset.value) <= MAX_VALUE
        ? offset.value + event.changeX <= 0
          ? 0
          : offset.value + event.changeX >= MAX_VALUE
          ? MAX_VALUE
          : offset.value + event.changeX
        : offset.value;

    const newWidth = INITIAL_BOX_SIZE + offset.value;
    boxWidth.value = newWidth;
  });

  const boxStyle = useAnimatedStyle(() => ({
    width: INITIAL_BOX_SIZE / 2 + offset.value,
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
  const [chartData, setChartData] = useState(DATA);

  const value = useDerivedValue(() => {
    return "$" + state.y.highTmp.value.value.toFixed(2);
  }, [state]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: bottom * 2 },
        ]}
      >
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
        <DynamicView
          flexDirection="row"
          mt="S"
          justifyContent="space-between"
          width="100%"
          px="XL"
        >
          {items.map((_, index) => {
            const colorNames = ["vividOrchid", "electricPurple", "blueViolet"];

            const color = colorNames[index] as keyof Theme["colors"];

            return (
              <DynamicView
                flex={0.31}
                key={`${id}_${index}_a`}
                borderWidth={1}
                borderColor={color}
                p="XS"
                borderRadius={4}
              >
                <DynamicView
                  variant="centerItems"
                  width={33}
                  height={33}
                  borderRadius={33}
                  mb="M"
                  backgroundColor={color}
                >
                  <AntDesign name="clockcircle" size={18} color="white" />
                </DynamicView>
                <DynamicText fontWeight="500" fontSize={12}>
                  Your Contributations
                </DynamicText>
              </DynamicView>
            );
          })}
        </DynamicView>
        <DynamicView p="XL" width="100%">
          <DynamicView p="L" backgroundColor="electricPurple" borderRadius={12}>
            <DynamicText fontWeight="800" fontSize={21} color="white">
              Do you have enough for retirement?
            </DynamicText>
            <DynamicText
              mt="S"
              fontWeight="400"
              fontSize={14}
              color="white"
              opacity={0.8}
            >
              Did you know 84% of people see a significant reduction in their
              quality of life at retirement because of a failure to plan an
              appropriate target
            </DynamicText>
            <DynamicPressable
              p="S"
              variant="rowAlignCenter"
              borderRadius={24}
              backgroundColor="dark"
              alignSelf="flex-start"
              mt="M"
            >
              <DynamicText fontWeight="800" fontSize={15} color="white">
                {`Set a pension target `}
              </DynamicText>
              <MaterialCommunityIcons
                name="arrow-top-right"
                size={21}
                color="white"
              />
            </DynamicPressable>
          </DynamicView>
        </DynamicView>
        <DynamicText
          ml="XL"
          fontWeight="600"
          fontSize={17}
          textAlign="left"
          mr="auto"
          mb="M"
        >
          Explore monthly contributions
        </DynamicText>
        <DynamicView
          mx="L"
          borderRadius={12}
          p="L"
          borderWidth={1}
          borderColor="electricPurple"
        >
          <DynamicText
            fontWeight="400"
            fontSize={14}
            color="dark"
            opacity={0.8}
          >
            Adjust monthly contribution to explore how much you will have when
            you retire
          </DynamicText>
          <DynamicText mt="XS" fontWeight="700" fontSize={21}>
            $200
            <DynamicText fontWeight="400" fontSize={16} opacity={0.7}>
              /month
            </DynamicText>
          </DynamicText>
          <View style={styles.sliderTrack}>
            <DynamicView
              height={18}
              width={MAX_VALUE}
              backgroundColor="gray"
              position="absolute"
              borderRadius={35}
            />
            <AnimatedLinearGradient
              style={[{ height: 18, borderRadius: 18 }, boxStyle]}
              colors={["#D100D3", "#8412EA", "#5825FF"]}
            />
            <GestureDetector gesture={pan}>
              <Animated.View style={[styles.sliderHandle, sliderStyle]}>
                <DynamicView
                  width={28}
                  height={28}
                  borderRadius={28}
                  borderWidth={2}
                  borderColor="vividOrchid"
                />
              </Animated.View>
            </GestureDetector>
          </View>
          <DynamicView height={250}>
            <CartesianChart
              data={chartData}
              domainPadding={{ top: 50 }}
              xKey="day"
              yKeys={["highTmp"]}
              axisOptions={{
                labelColor: "white",
                lineColor: "white",
              }}
              chartPressState={state}
            >
              {({ points, chartBounds }) => (
                <>
                  {isActive ? (
                    <SKText
                      x={chartBounds.left}
                      y={40}
                      font={chartFont}
                      text={isActive ? value : "$0.00"}
                      color="black"
                      style={"fill"}
                    />
                  ) : null}
                  <Line
                    points={points.highTmp}
                    color="#8412EB"
                    strokeWidth={2}
                    animate={{ type: "timing", duration: 500 }}
                  />
                  <Area
                    points={points.highTmp}
                    y0={chartBounds.bottom}
                    animate={{ type: "timing", duration: 500 }}
                  >
                    <LinearGradient
                      start={vec(chartBounds.bottom, 15)}
                      end={vec(chartBounds.bottom, chartBounds.bottom)}
                      colors={["#8412EB", "#F2E5FB"]}
                    />
                  </Area>
                  {isActive ? (
                    <ToolTip
                      x={state.x.position}
                      y={state.y.highTmp.position}
                    />
                  ) : null}
                </>
              )}
            </CartesianChart>
          </DynamicView>
          <DynamicView flexDirection="row" justifyContent="space-around">
            {BUTTON_TEXTS.map((t, index) => (
              <DynamicPressable
                key={`${id}_${index}_button_text`}
                backgroundColor={t === activeBtn ? "dark" : "white"}
                px="S"
                py="XXS"
                borderRadius={16}
                flex={0.145}
                variant="centerItems"
                onPress={() => {
                  setActiveBtn(t);
                  if (chartData === DATA) {
                    setChartData(DATA2);
                  } else {
                    setChartData(DATA);
                  }
                }}
                borderWidth={1}
                borderColor={t === activeBtn ? "dark" : "gray"}
              >
                <DynamicText color={t === activeBtn ? "white" : "blueViolet"}>
                  {t}
                </DynamicText>
              </DynamicPressable>
            ))}
          </DynamicView>
        </DynamicView>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={"#8412EB"} />;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  sliderHandle: {
    width: 35,
    height: 35,
    backgroundColor: "white",
    borderRadius: 35,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 5,
  },
  sliderTrack: {
    width: "100%",
    height: 50,
    borderRadius: 35,
    justifyContent: "center",
  },
});

export default Ui;
