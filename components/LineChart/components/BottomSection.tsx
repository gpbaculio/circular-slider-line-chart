import React from "react";
import { DATA, DATA2 } from "../utils/data";
import { Pressable, StyleSheet, Text } from "react-native";

interface ChartData {
  day: number;
  highTmp: number;
}

interface Props {
  chartData: ChartData[];
  setChartData: (data: ChartData[]) => void;
}

export const BottomSection = ({ chartData, setChartData }: Props) => {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        if (chartData === DATA) {
          setChartData(DATA2);
        } else {
          setChartData(DATA);
        }
      }}
    >
      <Text style={styles.text}>Click to Update Chart Data</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8412EB",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 4,
  },
  text: {
    color: "#ffffff",
  },
});
