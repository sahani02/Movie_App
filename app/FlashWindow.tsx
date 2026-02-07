import { router } from "expo-router";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Import animations properly
import LoderMovie from "../assets/loader movie.json";
import Popcorn from "../assets/Popcorn.json";
import WelcomeAnim from "../assets/Welcome Animation.json";

export default function SplashScreen() {
  const [step, setStep] = useState(0);

  const screens = [
    {
      animation: WelcomeAnim,
      title: "Discover Your Next Favorite Movie",
      subtitle: "Explore trending films and find perfect recommendations instantly.",
    },
    {
      animation: Popcorn,
      title: "Your Movie Guide, Simplified",
      subtitle: "Get quick access to genres, ratings, and hand-picked suggestions.",
    },
    {
      animation: LoderMovie,
      title: "Streamlined Movie Browsinge",
      subtitle: "Easily search, filter, and explore movies in one smooth experience.",
    },
  ];

  const gotoRegister = () => router.replace("/Register");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < screens.length - 1) setStep(step + 1);
      else gotoRegister();
    }, 3000);
    return () => clearTimeout(timer);
  }, [step]);

  const next = () => (step < screens.length - 1 ? setStep(step + 1) : gotoRegister());
  const prev = () => step > 0 && setStep(step - 1);

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.skipBtn} onPress={gotoRegister}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Lottie
        animationData={screens[step].animation}
        loop
        autoPlay
        style={styles.animation}
      />

      <Text style={styles.title}>{screens[step].title}</Text>
      <Text style={styles.subtitle}>{screens[step].subtitle}</Text>

      <View style={styles.btnRow}>
        {step > 0 ? (
          <TouchableOpacity style={styles.navBtn} onPress={prev}>
            <Text style={styles.navTxt}>Previous</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 60 }} />
        )}

        {step === screens.length - 1 ? (
          <TouchableOpacity style={styles.getBtn} onPress={gotoRegister}>
            <Text style={styles.getTxt}>GetStarted</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.getBtn} onPress={next}>
            <Text style={styles.navTxt}>Next</Text>
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  skipBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  skipText: {
    fontSize: 15,
    color: "#555",
    fontWeight: "600",
  },

  animation: {
    width: 340,
    height: 340,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 20,
    color: "#111",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 17,
    color: "#6a6a6a",
    textAlign: "center",
    paddingHorizontal: 25,
    marginTop: 10,
    lineHeight: 22,
  },

  pagination: {
    flexDirection: "row",
    marginTop: 25,
  },
  dot: {
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: "#D0D3DB",
  },

  btnRow: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 40,
    alignItems: "center",
  },

  navBtn: {
    backgroundColor: "#111",
    width: 65,
    height: 50,
    paddingHorizontal: 50,
    paddingVertical: 14,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  navTxt: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  getBtn: {
    backgroundColor: "#111",
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 30,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  getTxt: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
