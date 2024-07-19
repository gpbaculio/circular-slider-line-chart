import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Pressable,
  PressableProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";

import {
  createBox,
  createRestyleComponent,
  createText,
  createVariant,
  VariantProps,
} from "@shopify/restyle";
import Animated from "react-native-reanimated";
import { Theme } from "@/constants/restyleTheme";

const createContainer = <T>(Component: React.ComponentType<T>) => {
  return createRestyleComponent<
    VariantProps<Theme, "containerVariants"> & T,
    Theme
  >([createVariant({ themeKey: "containerVariants" })], Component);
};

const DynamicView = createContainer(createBox<Theme, ViewProps>(View));
const DynamicAnimatedView = Animated.createAnimatedComponent(DynamicView);
const DynamicText = createText<Theme>();
const DynamicPressable = createContainer(
  createBox<Theme, PressableProps>(Pressable)
);
const DynamicTouchableOpacity = createContainer(
  createBox<Theme, TouchableOpacityProps>(TouchableOpacity)
);
const DynamicKeyboardAvoidingView = createContainer(
  createBox<Theme, KeyboardAvoidingViewProps>(KeyboardAvoidingView)
);

export {
  DynamicView,
  DynamicAnimatedView,
  DynamicText,
  DynamicPressable,
  DynamicTouchableOpacity,
  DynamicKeyboardAvoidingView,
};
