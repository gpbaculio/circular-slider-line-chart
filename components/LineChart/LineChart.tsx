import React, { useState } from "react";

import {
  Circle,
  LinearGradient,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import { useDerivedValue, type SharedValue } from "react-native-reanimated";
import { Area, CartesianChart, Line, useChartPressState } from "victory-native";

import { Text as SKText } from "@shopify/react-native-skia";
import { BottomSection } from "./components/BottomSection";
import { DATA } from "./utils/data";

const inter = require("@/assets/fonts/roboto.ttf");
const interBold = require("@/assets/fonts/roboto-bold.ttf");

export const LineChart = () => {
  const font = useFont(inter, 12);
  const chartFont = useFont(interBold, 30);
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
  const [chartData, setChartData] = useState(DATA);

  const value = useDerivedValue(() => {
    return "$" + state.y.highTmp.value.value.toFixed(2);
  }, [state]);
  console.log("isActive ", isActive);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <CartesianChart
          data={chartData}
          xKey="day"
          yKeys={["highTmp"]}
          domainPadding={{ top: 30 }}
          axisOptions={{
            font,
            labelColor: "white",
            lineColor: "white",
          }}
          chartPressState={state}
        >
          {({ points, chartBounds }) => (
            <>
              <SKText
                x={chartBounds.left + 10}
                y={40}
                font={chartFont}
                text={isActive ? value : "$0.00"}
                color="black"
                style={"fill"}
              />
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
                  start={vec(chartBounds.bottom, 200)}
                  end={vec(chartBounds.bottom, chartBounds.bottom)}
                  colors={["#8412EB", "#F2E5FB"]}
                />
              </Area>
              {isActive ? (
                <ToolTip x={state.x.position} y={state.y.highTmp.position} />
              ) : null}
            </>
          )}
        </CartesianChart>
      </View>
      <BottomSection chartData={chartData} setChartData={setChartData} />
    </View>
  );
};

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={"#8412EB"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 30,
  },
  body: {
    paddingTop: 10,
    width: "95%",
    height: "60%",
  },
});
