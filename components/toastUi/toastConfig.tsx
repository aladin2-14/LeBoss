import React from "react";
import { BaseToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#00E676",
        backgroundColor: "#1E1E1E",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "700",
        color: "#00E676",
      }}
      text2Style={{
        fontSize: 13,
        color: "#FFF",
      }}
    />
  ),

  error: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#FF5252",
        backgroundColor: "#1E1E1E",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "700",
        color: "#FF5252",
      }}
      text2Style={{
        fontSize: 13,
        color: "#FFF",
      }}
    />
  ),
};
