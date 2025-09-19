import { useFonts } from 'expo-font';
import React from "react";
import { Dimensions, Image, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

// Tous les jours de la semaine
const allDays = ["L", "M", "M", "J", "V", "S", "D"];
const allData = [20, 45, 28, 80, 99, 43, 65];

const today = new Date().getDay();
const dayIndexMap = [6, 0, 1, 2, 3, 4, 5]; 
const todayIndex = dayIndexMap[today];
const dataValues = allData.map((val, index) => (index <= todayIndex ? val : 0));

export default function MonGraphique() {
  const [fontsLoaded] = useFonts({
    'SF-Pro-Display-Semibold': require('../assets/Font/SF-Pro-Display-Semibold.otf'),
  });

  if (!fontsLoaded) {
    return null; // ou un écran de chargement
  }

  const chartConfig = {
    backgroundGradientFrom: "#1A1A1A",
    backgroundGradientTo: "#0C0C1D",
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0.8,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
    strokeWidth: 2,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      strokeOpacity: 0.2,
    },
    propsForLabels: {
      fontSize: 15,
      fontFamily: "SF-Pro-Display-Semibold",
    },
  };

  return (
    <View
      style={{
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#464646",
        overflow: "hidden",
      }}
    >
      <LineChart
        data={{
          labels: allDays,
          datasets: [
            { data: dataValues, color: () => `#BE9B00`, strokeWidth: 3 },
          ],
        }}
        width={screenWidth - 32}
        height={256}
        chartConfig={chartConfig}
        bezier
        verticalLabelRotation={0}
        fromZero
        style={{}}
        renderDotContent={({ x, y, index }) => {
          if (dataValues[index] != null && (index === 2 || index === 5)) {
            return (
              <Image
                style={{
                  width: 24,
                  height: 24,
                  position: "absolute",
                  top: y - 30,
                  left: x - 12,
                }}
              />
            );
          }
          return null;
        }}
      />
    </View>
  );
}
