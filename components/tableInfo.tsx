import { useFonts } from 'expo-font';
import React from "react";
import { Text, View } from "react-native";

export default function ConsommationCard() {
  const valeur = 20000;
  const objectif = 50000;
  const progress = valeur / objectif; // entre 0 et 1

  const [fontsLoaded] = useFonts({
    'SF-Pro-Display-Semibold': require('../assets/Font/SF-Pro-Display-Semibold.otf'),
  });

  if (!fontsLoaded) {
    return null; // éviter que la font ne soit pas appliquée
  }

  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: "#4C4C4C",
        borderRadius: 20,
        padding: 12,
        alignItems: "center",
      }}
    >
      {/* Titre */}
      <Text
        style={{
          color: "#A0A0A0",
          marginBottom: 8,
          fontSize: 15,
          fontFamily: 'SF-Pro-Display-Semibold',
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
            width: `${progress * 100}%`,
            height: "100%",
            backgroundColor: "green",
          }}
        />
      </View>

      {/* Valeur */}
      <Text style={{ color: "white", marginTop: 8, fontFamily: 'SF-Pro-Display-Semibold' }}>
        {valeur.toLocaleString("fr-FR")} fbu
      </Text>
    </View>
  );
}
