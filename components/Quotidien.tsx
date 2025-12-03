import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Quotidien() {
  // responsive sizing
  const buttonSize = screenWidth * 0.14;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        // paddingHorizontal: 10,
        marginTop: 10,
      }}
    >
      {/* Button 1 */}
      <TouchableOpacity
        style={{
          width: buttonSize,
          height: buttonSize,
          backgroundColor: "#0F4C81",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          // borderWidth: 2,
          // borderColor: "#FFD700",
        }}
      >
        <Ionicons name="fast-food-outline" size={22} color="white" />
      </TouchableOpacity>

      {/* Button 2 */}
      <TouchableOpacity
        style={{
          width: buttonSize,
          height: buttonSize,
          backgroundColor: "#E67E22",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="location-outline" size={22} color="white" />
      </TouchableOpacity>

      {/* Button 3 */}
      <TouchableOpacity
        style={{
          width: buttonSize,
          height: buttonSize,
          backgroundColor: "#8E44AD",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="key-outline" size={22} color="white" />
      </TouchableOpacity>

      {/* Button 4 */}
      <TouchableOpacity
        style={{
          width: buttonSize,
          height: buttonSize,
          backgroundColor: "#C2185B",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="heart-outline" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
}
