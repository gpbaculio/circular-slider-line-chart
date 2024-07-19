import { View, Text } from "react-native";
import React from "react";
import { DynamicView } from "@/components";

const Ui = () => {
  return (
    <DynamicView backgroundColor="danger" flex={1}>
      <Text>Ui</Text>
    </DynamicView>
  );
};

export default Ui;
