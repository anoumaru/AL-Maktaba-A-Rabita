import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonBarProps {
  handleButtonPress: (buttonName: string) => void;
  showDiacritics: boolean;
}

const ButtonBar: React.FC<ButtonBarProps> = ({
  handleButtonPress,
  showDiacritics
}) => {
  return (
    <View style={styles.buttonBar}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          handleButtonPress(showDiacritics ? "ازاله التشكيل" : "اعاده التشكيل")}
      >
        <Text style={styles.buttonText}>
          {showDiacritics ? "ازاله التشكيل" : "اعاده التشكيل"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress("الفهرس")}
      >
        <Text style={styles.buttonText}>الفهرس </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress("حجم الخط")}
      >
        <Text style={styles.buttonText}>حجم الخط</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 35
  },
  button: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#20232a",
    borderWidth: 0.5,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  buttonText: {
    color: "black",
    fontSize: 16
  }
});

export default ButtonBar;
