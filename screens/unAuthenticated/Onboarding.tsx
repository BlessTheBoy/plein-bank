import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";
// import { colors, textStyles } from "../styles";
// import {
//   OnboardingScreenNavigationProp,
//   OnboardingScreenProps,
// } from "../types";
// import ArrowRightAlt from "../vectors/ArrowRightAlt";
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
} from "react-native/Libraries/Types/CoreEventTypes";
import { NativeScrollEvent } from "react-native/Libraries/Components/ScrollView/ScrollView";
// import Button from "../components/Button";
// import { useNavigation } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { colors, textStyles } from "../../styles";
import Button from "../../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { OnBoardingScreenProps } from "../../types";

const { width, height } = Dimensions.get("window");

type SlideItem = {
  id: number;
  image: any;
  title: string;
  description: string;
};
const slides: SlideItem[] = [
  {
    id: 1,
    image: require("../../assets/images/onboarding1.png"),
    title: "Smart People.Smart Bank",
    description:
      "Our digital solutions offer various benefits that will ensure you stay in control wherever you are.",
  },
  {
    id: 2,
    image: require("../../assets/images/onboarding2.png"),
    title: "Achieve Endless Possibilities",
    description:
      "Your online and on-the-go lifestyle has met its match with solutions tailored to suit your lifestyle.",
  },
  {
    id: 3,
    image: require("../../assets/images/onboarding3.png"),
    title: "Bank Anywhere, Literally!",
    description:
      "We are with you 24/7, anywhere you are.Online banking made for you.",
  },
];

const Slide = ({ item }: { item: SlideItem }) => {
  return (
    <View style={{ flex: 1, width }}>
      <Image
        source={item.image}
        style={{
          width,
          height: height * 0.5,
        }}
      />
      <View
        style={{
          flex: 1,
          paddingTop: 70,
          width: "100%",
        }}
      >
        <Text
          style={{
            ...textStyles.title_large,
            color: "black",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            ...textStyles.body_large,
            color: "black",
            textAlign: "center",
            paddingHorizontal: 43,
          }}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default function OnboardingScreen(props: OnBoardingScreenProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideRef = useRef<FlatList<SlideItem>>(null);

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = (e: GestureResponderEvent) => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      slideRef.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          width,
          alignItems: "center",
        }}
      >
        {currentSlideIndex !== slides.length - 1 ? (
          <View style={{ paddingTop: 28 }}>
            <Pressable onPress={goNextSlide}>
              <AnimatedCircularProgress
                size={80}
                width={2}
                fill={((currentSlideIndex + 1) / slides.length) * 100}
                tintColor={colors["material-theme/key-colors/primary"]}
                backgroundColor="#C6C5D0"
                rotation={0}
                prefill={currentSlideIndex === 1 ? 33.3 : 0}
              >
                {(fill) => (
                  <View
                    style={{
                      backgroundColor:
                        colors["material-theme/key-colors/primary"],
                      width: 62,
                      height: 62,
                      borderRadius: 31,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="white"
                    />
                  </View>
                )}
              </AnimatedCircularProgress>
            </Pressable>
          </View>
        ) : (
          <View style={{ width, paddingHorizontal: 16, paddingTop: 28 }}>
            <Button
              label="Log in"
              style={{ marginBottom: 28 }}
              onPress={() => props.navigation.replace("Login")}
            />
            <Button
              label="Register"
              variant="secondary"
              color="secondary"
              // onPress={() =>
              //   navigation.replace("Auth", {
              //     screen: "Login",
              //   })
              // }
            />
          </View>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <StatusBar style="dark" backgroundColor="white" />
      <FlatList
        ref={slideRef}
        pagingEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        contentContainerStyle={{ height: height * 0.75 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
          position: "absolute",
          top: height * 0.5,
          width,
          zIndex: 2,
          paddingTop: 45,
        }}
      >
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              {
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#C6C5D0",
              },
              currentSlideIndex === index && {
                backgroundColor: colors["material-theme/key-colors/primary"],
                width: 16,
              },
            ]}
          ></View>
        ))}
      </View>
      <Footer />
    </SafeAreaView>
  );
}
