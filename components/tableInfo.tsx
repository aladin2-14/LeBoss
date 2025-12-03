import { useFonts } from "expo-font";
import React from "react";
import { Dimensions, Text, View } from "react-native";

export default function ConsommationCard() {
  const valeur = 30000;
  const objectif = 300000;
  const progress = valeur / objectif; // entre 0 et 1

  // Dimensions de l'écran
  const screenWidth = Dimensions.get("window").width;

  // Largeur de la carte = 90% de l'écran
  const cardWidth = screenWidth * 0.92;

  // Barre de progression responsive = 100% de la carte
  const progressWidth = cardWidth * progress;

  // Espacement responsive
  const espace = screenWidth * 0.02;
  const espace_left = screenWidth * 0.03;

  const [fontsLoaded] = useFonts({
    "SF-Pro-Display-Semibold": require("../assets/Font/SF-Pro-Display-Semibold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        borderWidth: 2.7,
        borderColor: "#33363D",
        borderRadius: 20,
        width: cardWidth,
        alignSelf: "center",
        flexDirection: "column",
        gap: espace,
        padding: espace,
        paddingHorizontal: espace_left,
      }}
    >
      {/* Titre */}
      <Text
        style={{
          color: "#A0A0A0",
          fontSize: screenWidth * 0.04,
          fontFamily: "SF-Pro-Display-Semibold",
          letterSpacing: 1,
        }}
      >
        consommation d’aujourd’hui
      </Text>

      {/* Barre de progression */}
      <View
        style={{
          width: "100%",
          height: 8,
          backgroundColor: "#444",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: progressWidth,
            height: "100%",
            backgroundColor: "green",
          }}
        />
      </View>

      {/* Valeur */}
      <Text
        style={{
          color: "#EBEBEB",
          fontSize: screenWidth * 0.065,
          fontFamily: "SF-Pro-Display-Semibold",
          textAlign: "center",
        }}
      >
        {valeur.toLocaleString("fr-FR")} fbu
      </Text>
    </View>
  );
}
