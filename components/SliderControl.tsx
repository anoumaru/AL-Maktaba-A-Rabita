import React from "react";
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

interface SliderControlProps {
  fontSize: number;
  setFontSize: (value: number) => void;
  setLineHeight: (value: number) => void;
}

const SliderControl: React.FC<SliderControlProps> = ({
  fontSize,
  setFontSize,
  setLineHeight
}) => {
  return (
    <View style={styles.sliderContainer}>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={40}
        step={1}
        value={fontSize}
        onValueChange={value => {
          setFontSize(value);
          setLineHeight(value * 1.6);
        }}
        minimumTrackTintColor="#000"
        maximumTrackTintColor="#ccc"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    position: "absolute",
    left: 20,
    top: 180,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    zIndex: 100
  },
  slider: {
    width: 200,
    height: 20,
    margin: 0,
    transform: [{ rotate: "270deg" }]
  }
});

export default SliderControl;
