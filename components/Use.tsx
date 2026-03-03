import Button from "@/components/usecomponent/ButtonUser";
import Profile from "@/components/usecomponent/Profile";
import Static from "@/components/usecomponent/StatisticUse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Info() {
  const [transactions, setTransactions] = useState<{
    [key: string]: { id: string; value: string }[];
  }>({});

  // 🔄 Charger au démarrage
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    const data = await AsyncStorage.getItem("@transactions");
    if (data) setTransactions(JSON.parse(data));
  };

  return (
    <View style={styles.root}>
      <Profile />

      <Button transactions={transactions} setTransactions={setTransactions} />

      <Static transactions={transactions} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
});
