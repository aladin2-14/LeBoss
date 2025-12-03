import { Search } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const SearchInput = ({ onSearch }: { onSearch?: (text: string) => void }) => {
  const [text, setText] = useState("");

  const handleChange = (value: string) => {
    setText(value);
    if (onSearch) onSearch(value); // renvoie la valeur au parent
  };

  return (
    <View style={styles.container}>
      <Search size={25} color="#B2AF57" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search...."
        placeholderTextColor="#B2AF57"
        value={text}
        onChangeText={handleChange}
        autoCapitalize="none"
        autoCorrect={false}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E2C",
    borderRadius: 40,
    paddingHorizontal: 15,
    paddingVertical: 17,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#E0E0E0",
    fontSize: 16,
  },
});

export default SearchInput;
