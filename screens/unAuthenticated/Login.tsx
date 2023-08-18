import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { LoginScreenProps } from "../../types";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import { colors, textStyles } from "../../styles";
import Button from "../../components/Button";

const { width } = Dimensions.get("window");

export default function LoginScreen(props: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
              paddingHorizontal: 16,
            }}
          >
            <Text style={textStyles.title_large}>Login</Text>
            <View
              style={{
                gap: 24,
                marginBottom: 12,
                marginTop: 24,
              }}
            >
              <Input
                label="Username"
                value={username}
                onChangeText={setUsername}
                icon="account-circle-outline"
              />
              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                icon="lock-outline"
                isPassword
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginBottom: 48,
              }}
            >
              <Pressable>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    fontFamily: "Poppins_500Medium",
                    fontSize: 12,
                    color: colors["material-theme/key-colors/primary"],
                    textDecorationColor:
                      colors["material-theme/key-colors/primary"],
                  }}
                >
                  Forgot password?
                </Text>
              </Pressable>
            </View>
            <Button label="Log in" disabled={!username || !password} />
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 31,
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text style={{ ...textStyles.body_large, color: "#767872" }}>
                Dont have an account?
              </Text>
              <Pressable>
                <Text style={{ ...textStyles.body_large, color: "#001B3F" }}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
}
