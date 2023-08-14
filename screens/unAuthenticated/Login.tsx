import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { LoginScreenProps } from "../../types";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function LoginScreen(props: LoginScreenProps) {
  return (
    <>
      <StatusBar style="dark" translucent={true} />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/images/backgroundPattern.png")}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: "flex-end",
            position: "relative",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              position: "absolute",
              top: 60,
              width,
            }}
          >
            <Image
              source={require("../../assets/images/fullLogo.png")}
              resizeMode="contain"
              style={{
                height: 42,
              }}
            />
          </View>
          <SafeAreaView
            edges={["bottom"]}
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingTop: 48,
            }}
          >
            <Text>Login</Text>
            <Text>Hello World</Text>
            <Text>Hello World</Text>
            <Text>Hello World</Text>
            <Text>Hello World</Text>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
}
