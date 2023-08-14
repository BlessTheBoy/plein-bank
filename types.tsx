import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type UnAuthenticatedStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
};

export type OnBoardingScreenProps = NativeStackScreenProps<
  UnAuthenticatedStackParamList,
  "OnBoarding"
>;
export type LoginScreenProps = NativeStackScreenProps<
  UnAuthenticatedStackParamList,
  "Login"
>;
