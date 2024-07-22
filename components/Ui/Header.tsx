import React from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DynamicView, DynamicText } from "@/components";

const Header = () => {
  const { top } = useSafeAreaInsets();

  return (
    <DynamicView
      style={{ paddingTop: top }}
      pb="L"
      px="L"
      variant="rowAlignCenter"
      justifyContent="space-between"
      borderBottomWidth={0.5}
      borderBottomColor="gray"
    >
      <DynamicView flex={0.2} variant="rowAlignCenter">
        <FontAwesome name="arrow-left" />
        <DynamicText ml="S" textAlign="center">
          Back
        </DynamicText>
      </DynamicView>
      <DynamicView flex={0.6}>
        <DynamicText textAlign="center" color="gray">
          Workplace pension
        </DynamicText>
        <DynamicText textAlign="center" fontWeight="bold">
          $10,245
        </DynamicText>
      </DynamicView>
      <DynamicView flex={0.2} />
    </DynamicView>
  );
};

export default Header;
