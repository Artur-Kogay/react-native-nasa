import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import DatePicker from "../components/UI/Pickers/DatePicker";
import SelectPicker from "../components/UI/Pickers/SelectPicker";
import Button from "../components/UI/Buttons/Button";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

// типизирование пропса navigation
type SelectionScreenNavigationProp = NavigationProp<ParamListBase>;
// первое окно
const SelectionScreen = ({
  navigation,
}: {
  navigation: SelectionScreenNavigationProp;
}) => {
  return (
    <View style={[styles.main, tw`relative`]}>
      <View style={tw`h-full flex-col justify-center relative z-10 px-5`}>
        <SelectPicker />
        <DatePicker />
        <Button navigation={() => navigation.navigate('CameraRoll')}>
          Explore
        </Button>
      </View>
      <View style={tw`w-full absolute bottom-0 z-0`}>
        <Image
          style={tw`w-full`}
          source={require("../assets/images/robot.png")}
        />
      </View>
    </View>
  );
};

export default SelectionScreen;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#DCCEBE",
  },
});
