import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/UnAuthenticated/OnboardingScreen";
import { UnAuthenticatedStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UnAuthenticatedStack =
  createNativeStackNavigator<UnAuthenticatedStackParamList>();

export default function RootNavigator() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean | null>(
    null
  );
  const [isAppFirstLaunchedChecked, setIsAppFirstLaunchedChecked] =
    useState<boolean>(false);

  useEffect(() => {
    const checkIsAppFirstLaunch = async () => {
      try {
        const firstLaunch = await AsyncStorage.getItem("isAppFirstLaunched");

        if (firstLaunch == null) {
          setIsAppFirstLaunched(true);
          // TODO: uncomment the code under to make onboarding show only on first open.
          // await AsyncStorage.setItem("isAppFirstLaunched", "false");
        } else {
          setIsAppFirstLaunched(false);
        }
      } catch (e) {
        // saving error
        alert("Error checking is app first launched");
      } finally {
        setIsAppFirstLaunchedChecked(true);
      }
    };
    checkIsAppFirstLaunch();
  }, []);

  if (isAppFirstLaunched == null) {
    return null;
  }

  return (
    <UnAuthenticatedStack.Navigator>
      <UnAuthenticatedStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <UnAuthenticatedStack.Screen
        name="Auth"
        // component={AuthNavigator}
        options={{ headerShown: false }}
      />
    </UnAuthenticatedStack.Navigator>
  );
}
