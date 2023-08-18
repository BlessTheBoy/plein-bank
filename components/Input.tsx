import React, {
  ComponentProps,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import {
  TextInputFocusEventData,
  TextInputProps,
} from "react-native/Libraries/Components/TextInput/TextInput";
import { textStyles } from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props extends TextInputProps {
  label?: string;
  isPassword?: boolean;
  icon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  backgroundColor?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
}

export type InputRef = {
  focus: () => void;
};

const Input = forwardRef<InputRef, Props>(
  (
    {
      label,
      icon,
      backgroundColor,
      style,
      onFocus,
      onBlur,
      onChangeText,
      isPassword,
      hint,
      error,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [{ labelX, labelY }, setLabelPosition] = useState<{
      labelX: number;
      labelY: number;
    }>({
      labelX: props.value ? 16 : icon ? 46 : 12,
      labelY: props.value ? -58 : -34,
    });
    const [input, setInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const [borderColor, setBorderColor] = useState("#ECECEC");

    useImperativeHandle(
      ref,
      () => ({
        focus: () => inputRef.current?.focus(),
      }),
      []
    );

    const onInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setLabelPosition({ labelX: 16, labelY: -58 });
      setBorderColor("#C8C6CA");
      onFocus && onFocus(e);
    };
    const onInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      !input && setLabelPosition({ labelX: icon ? 46 : 12, labelY: -34 });
      setBorderColor("#ECECEC");
      onBlur && onBlur(e);
    };
    const onInputTextChange = (value: string) => {
      setInput(value);
      onChangeText && onChangeText(value);
    };

    return (
      <View style={styles.container}>
        {icon && (
          <MaterialCommunityIcons
            style={styles.icon}
            name={icon}
            size={24}
            color={disabled ? "#E4E1E6" : input ? "#047BF8" : "#ABC7FF"}
          />
        )}
        {isPassword && (
          <MaterialCommunityIcons
            style={styles.passwordIcon}
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color={disabled ? "#E4E1E6" : "#767872"}
            onPress={() => setShowPassword(!showPassword)}
          />
        )}
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            textStyles.label_large,
            {
              color: "#101114",
              borderColor,
              borderRadius: 6,
              paddingLeft: icon ? 50 : 16,
            },
            style,
            disabled && {
              color: "#E4E1E6",
              borderColor: "#E4E1E6",
            },
          ]}
          editable={!disabled}
          onChangeText={onInputTextChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          {...(isPassword
            ? {
                autoCapitalize: "none",
                autoCorrect: false,
                secureTextEntry: showPassword ? false : true,
                textContentType: "password",
              }
            : {})}
          {...props}
        />
        {label && (
          <Pressable onPress={() => inputRef.current?.focus()}>
            <Text
              style={[
                textStyles.label_large,
                styles.label,
                {
                  backgroundColor: backgroundColor ?? "white",
                  top: labelY,
                  left: labelX,
                },
                disabled && {
                  color: "#E4E1E6",
                },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        )}
        {(hint || error) && !disabled && (
          <Text style={[styles.hint, error ? { color: "#BA1A1A" } : {}]}>
            {error ?? hint}
          </Text>
        )}
      </View>
    );
  }
);

export default Input;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    position: "absolute",
    top: 12,
    left: 16,
  },
  passwordIcon: {
    position: "absolute",
    top: 12,
    right: 16,
    zIndex: 2,
  },
  label: {
    color: "#767872",
    position: "absolute",
    paddingHorizontal: 4,
    zIndex: 3,
    // elevation: 2,
  },
  hint: {
    paddingLeft: 4,
    fontSize: 11,
    lineHeight: 11,
    marginTop: 4,
    color: "#767872",
  },
  error: {
    paddingLeft: 4,
    fontSize: 11,
    lineHeight: 11,
    marginTop: 4,
  },
});
