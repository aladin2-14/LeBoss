// import { useFonts } from 'expo-font';
// import React, { useEffect, useRef, useState } from "react";
// import { Animated, Image, View, useWindowDimensions } from "react-native";
// import { LineChart } from "react-native-chart-kit";

// const allDays = ["L", "M", "M", "J", "V", "S", "D"];
// const allData = [20, 45, 28, 80, 99, 43, 65];

// const today = new Date().getDay();
// const dayIndexMap = [6, 0, 1, 2, 3, 4, 5]; 
// const todayIndex = dayIndexMap[today];

// export default function MonGraphique() {
//   const [fontsLoaded] = useFonts({
//     'SF-Pro-Display-Semibold': require('../assets/Font/SF-Pro-Display-Semibold.otf'),
//   });

//   const [animatedData, setAnimatedData] = useState(allData.map(() => 0));
//   const progress = useRef(new Animated.Value(0)).current;

//   const { width: screenWidth } = useWindowDimensions(); // ✅ responsive width
//   const chartWidth = screenWidth * 0.9; // laisse 5% marge de chaque côté
//   const chartHeight = chartWidth * 0.6; // proportionnel à la largeur

//   useEffect(() => {
//     Animated.timing(progress, {
//       toValue: 1,
//       duration: 2500,
//       useNativeDriver: false,
//     }).start();

//     const listenerId = progress.addListener(({ value }) => {
//       const interpolated = allData.map((val, index) =>
//         index <= todayIndex ? val * value : 0
//       );
//       setAnimatedData(interpolated);
//     });

//     return () => progress.removeAllListeners(listenerId);
//   }, []);

//   if (!fontsLoaded) return null;

//   const chartConfig = {
//     backgroundGradientFrom: "#0C0C1D",
//     backgroundGradientTo: "#0C0C1D",
//     backgroundGradientFromOpacity: 1,
//     backgroundGradientToOpacity: 1,
//     color: (opacity = 100) => `rgba(255, 255, 255, ${opacity})`,
//     labelColor: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
//     strokeWidth: 2,
//     propsForDots: { r: "6", strokeWidth: "2" },
//     propsForBackgroundLines: { strokeWidth: 0 }, // supprime les carrés/lignes
//     propsForLabels: { fontSize: 15, fontFamily: "SF-Pro-Display-Semibold" },
//   };
  

//   return (
//     <View
//       style={{
//         borderRadius: 20,
//         borderWidth: 2.6,
//         borderColor: "#33363D",
//         overflow: "hidden",
//         paddingTop: 10,
//         alignItems: "center", // centrer le chart horizontalement
//       }}
//     >
//       <LineChart
//         data={{
//           labels: allDays,
//           datasets: [
//             { data: animatedData, color: () => `#BE9B00`, strokeWidth: 3 },
//           ],
//         }}
//         width={chartWidth}
//         height={chartHeight}
//         chartConfig={chartConfig}
//         bezier
//         fromZero
//         style={{ borderRadius: 20 }}
//         renderDotContent={({ x, y, index }) => {
//           if (animatedData[index] !== 0 && (index === 2 || index === 5)) {
//             return (
//               <Image
//                 style={{
//                   width: 24,
//                   height: 24,
//                   position: "absolute",
//                   top: y - 30,
//                   left: x - 12,
//                 }}
//               />
//             );
//           }
//           return null;
//         }}
//       />
//     </View>
//   );
// }

import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

// Simulez le chargement d'une police si nécessaire, par exemple 'OpenSans-Bold'
// Remplacez par le nom réel de votre police si vous en chargez une.
const FONT_ASSET = 'YourCustomFont-Bold'; 

const data = [
  { month: 'Janvier', value: 3.5 },
  { month: 'Février', value: 4.5 },
  { month: 'Mars', value: 2.0 },
  { month: 'Avril', value: 5.0 },
  { month: 'Mai', value: 3.0 },
  { month: 'Juin', value: 4.2 },
];

const MAX_DATA_VALUE = 5.0; 
const REFERENCE_VALUE = 3.5; 

// Utilisez une hauteur fixe pour la zone de traçage pour éviter des recalculs trop complexes
const PLOT_AREA_HEIGHT = 150; 
// Définition de la marge horizontale demandée
const HORIZONTAL_MARGIN = 12;

const CustomBarChart = () => {
  const { width } = useWindowDimensions();
  // Utilisez useFonts pour charger les polices
  const [fontsLoaded] = useFonts({
    // IMPORTANT : Remplacez par le chemin réel de votre police
    [FONT_ASSET]: require('../assets/Font/SF-Pro-Display-Semibold.otf'), 
  });

  // Si les polices ne sont pas chargées, retournez un écran de chargement (ou null)
  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Chargement...</Text></View>;
  }

  // Largeur totale disponible pour le graphique (Largeur de l'écran - (Marge * 2))
  const chartWidth = width - (HORIZONTAL_MARGIN * 2); 
  // Largeur de chaque colonne (pour 6 barres + espace)
  const barColumnWidth = chartWidth / data.length; 
  // Le padding à soustraire pour les lignes absolues
  const absoluteLinePadding = 20;

  return (
    // Le conteneur prend toute la largeur disponible après application de la marge
    <View style={[
        styles.chartContainer, 
        { 
            width: chartWidth, 
            marginHorizontal: HORIZONTAL_MARGIN,
            opacity: 0.8,
            display: "flex",
            alignItems:"center",
            // justifyContent:"center",
            overflow: "hidden"
        }
    ]}>
{/*       
      <View style={[styles.dashedLine, styles.topLine, { 
          width: chartWidth - (absoluteLinePadding * 2) 
      }]} /> */}
      
      {/* Ligne pointillée centrale (référence) */}
      {/* <View 
        style={[
          styles.dashedLine, 
          styles.referenceLine, 
          { 
            bottom: (REFERENCE_VALUE / MAX_DATA_VALUE) * PLOT_AREA_HEIGHT + absoluteLinePadding,
            width: chartWidth - (absoluteLinePadding * 2) 
          }
        ]} 
      /> */}
      
      {/* Conteneur principal des barres */}
      <View style={[styles.barsWrapper, { height: PLOT_AREA_HEIGHT }]}>
        {data.map((item, index) => {
          // Calcul de la hauteur de la barre : Le code fait déjà que la barre soit grande ou petite
          const barHeight = (item.value / MAX_DATA_VALUE) * PLOT_AREA_HEIGHT;
          
          return (
            <View key={index} style={[styles.barItem, { width: barColumnWidth }]}>
              {/* Le petit tiret sur la ligne de référence */}
              {/* Le petit tiret est positionné en absolute par rapport à la barre item */}
              {/* {item.value >= 3.0 && item.value <= 4.0 && 
                <View style={[
                    styles.referenceMark, 
                    {
                        bottom: (REFERENCE_VALUE / MAX_DATA_VALUE) * PLOT_AREA_HEIGHT 
                    }
                ]} />
              } */}
              
              {/* La barre elle-même */}
              <View style={[styles.bar, { height: barHeight }]} />
              
              {/* L'étiquette du mois */}
              <Text style={styles.monthLabel}>{item.month}</Text>
            </View>
          );
        })}
      </View>
      
      {/* Ligne pleine de base */}
      <View style={styles.baseLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    // Suppression d'alignSelf: 'center' car nous gérons la largeur et la marge directement
    // Padding interne (utilisé pour positionner les lignes absolues)
    paddingVertical: 10,
    borderRadius: 20,
    position: 'relative', 
    // Hauteur totale : zone de traçage + labels + paddings
    minHeight: PLOT_AREA_HEIGHT + 70, 
    justifyContent: 'flex-end', 
    borderWidth: 2,
    borderColor: "#363741"
    // marginHorizontal: est défini dynamiquement dans le composant
    // opacity: est défini dynamiquement dans le composant
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // --- Lignes de Référence ---
  dashedLine: {
    position: 'absolute',
    left: 20, // Doit correspondre au paddingHorizontal
    // right: 20, // Remplacé par 'width' calculé dynamiquement
    height: 1,
    borderWidth: 1,
    borderColor: '#FFF', 
    borderStyle: 'dashed',
  },
  topLine: {
    top: 20, // Doit correspondre au paddingVertical
  },
  referenceLine: {
    // La position 'bottom' est calculée dynamiquement
  },
  baseLine: {
    height: 2,
    backgroundColor: '#FFF', 
  },
  
  // --- Barres et Étiquettes ---
  barsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'flex-end', 
    marginBottom: 5, 
  },
  barItem: {
    alignItems: 'center',
    // La largeur est définie dynamiquement
  },
  bar: {
    backgroundColor: '#A9A9A9', 
    width: '70%', 
    borderRadius: 30,
    // La hauteur est définie dynamiquement, assurant la variation de taille.
  },
  monthLabel: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    // fontFamily: FONT_ASSET, // Décommentez pour utiliser la police chargée
  },
  referenceMark: {
    position: 'absolute',
    width: 6,
    height: 2,
    backgroundColor: '#FFF',
    zIndex: 1,
    // Le positionnement 'bottom' est calculé pour correspondre à la ligne de référence
  }
});

export default CustomBarChart;