import { ReactNode } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../styles";
import LoadingSpinner from "../vectors/LoadingSpinner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type Props = {
  label?: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  Icon?: ReactNode;
  variant?: "primary" | "secondary";
  color?: "primary" | "secondary";
  width?: string | number;
  flex?: boolean;
  error?: boolean;
};

export default function Button({
  label,
  onPress,
  style,
  labelStyle,
  disabled,
  loading,
  Icon,
  variant,
  color = "primary",
  width = "100%",
  flex,
  error,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{ flex: flex ? 1 : 0, width }}
    >
      <View
        style={[
          {
            width: "100%",
            backgroundColor:
              color == "primary"
                ? colors["material-theme/key-colors/primary"]
                : colors["material-theme/key-colors/secondary"],
            height: 48,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
            flexDirection: "row",
            gap: 10,
          },
          disabled && {
            backgroundColor:
              color == "primary"
                ? colors["material-theme/ref-primary/primary-80"]
                : colors["material-theme/ref-secondary/secondary-80"],
          },
          variant === "secondary" && {
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor:
              color == "primary"
                ? colors["material-theme/key-colors/primary"]
                : colors["material-theme/key-colors/secondary"],
          },
          variant === "secondary" &&
            disabled && {
              backgroundColor: "transparent",
              borderWidth: 2,
              borderColor:
                color == "primary"
                  ? colors["material-theme/ref-primary/primary-80"]
                  : colors["material-theme/ref-secondary/secondary-80"],
            },
          style,
        ]}
      >
        {label && (
          <Text
            style={[
              {
                color: "white",
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
                lineHeight: 24,
                textAlign: "center",
              },
              variant === "secondary" && {
                color:
                  color == "primary"
                    ? colors["material-theme/key-colors/primary"]
                    : colors["material-theme/key-colors/secondary"],
              },
              variant === "secondary" &&
                disabled && {
                  color:
                    color == "primary"
                      ? colors["material-theme/ref-primary/primary-80"]
                      : colors["material-theme/ref-secondary/secondary-80"],
                },
              labelStyle,
            ]}
          >
            {label}
          </Text>
        )}
        {loading ? <LoadingSpinner /> : Icon}
      </View>
    </Pressable>
  );
}
