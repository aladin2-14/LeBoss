import SearchInput from "@/components/search";
import Tableinfo from "@/components/tableInfo";
import TableStatics from "@/components/TableStatics";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { Dimensions, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const handleSearch = (text: string) => {
    console.log("Recherche :", text);
    // Ici tu peux filtrer des données ou faire une requête
  };
  const screenWidth = Dimensions.get("window").width;
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C0C1D"
        translucent={false}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#0C0C1D",
        }}
      >
        <View
          style={{
            marginHorizontal: 19,
            marginTop: 31,
            display: "flex",
            flexDirection: "column",
            gap: 26,
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <View>
              {/* <Plus size={20} /> */}
              <Entypo name="squared-plus" size={35} color="#EFC817" />
            </View>
          </View>
          <View>
            <SearchInput onSearch={handleSearch} />
          </View>
          <View style={{
            display: 'flex',
            flexDirection:'column',
            gap: 25,
            marginTop:25
          }}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TableStatics />
            </View>

            <View
              style={{
                display: "flex",
                alignItems: "center",
                gap:15
              }}
            >
              <Tableinfo />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
