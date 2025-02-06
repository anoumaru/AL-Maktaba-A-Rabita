import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  findPageWithText: (text: string) => void;
  matches: any[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  setSearchText,
  findPageWithText,
  matches
}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 بحث..."
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          findPageWithText(text);
        }}
      />
      {matches.length > 0 &&
        <View style={styles.matchCountContainer}>
          <Text style={styles.matchCount}>
            {matches.length} نتيجة
          </Text>
        </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 5,
    left: 10,
    right: 10,
    zIndex: 100
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: "right",
    writingDirection: "rtl",
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4
  },
  matchCountContainer: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  matchCount: {
    color: "#666",
    fontSize: 14,
    textAlign: "center"
  }
});

export default SearchBar;
