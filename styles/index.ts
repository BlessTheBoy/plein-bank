import { StyleSheet } from "react-native";

export const colors = {
  "material-theme/key-colors/primary": "#047BF8",
  "material-theme/key-colors/secondary": "#D22679",
  "material-theme/ref-primary/primary-80": "#ABC7FF",
  "material-theme/ref-secondary/secondary-80": "#FFB0C9",
};

export const textStyles = StyleSheet.create({
  title_medium: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 24,
  },
  title_large: {
    fontFamily: "Poppins_400Regular",
    fontSize: 22,
    lineHeight: 28,
  },
  body_large: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
  },
});
