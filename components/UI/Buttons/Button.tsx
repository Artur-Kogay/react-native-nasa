import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { globalStyles } from "../../../styles/globalStyles";


interface ButtonProps {
  children: React.ReactNode;
  navigation?: () => void,
}

const Button: React.FC<ButtonProps> = ({ children, navigation }) => {
  // кнопка для первого окна, с возможностью переиспользования
  return (
    <TouchableOpacity onPress={navigation}>
      <View
        style={[
          styles.button,
          tw`w-full flex items-center justify-center mt-10`,
        ]}
      >
        <Text style={[tw`text-white font-bold text-lg`, globalStyles.textBold]}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#BF2E0E",
    height: 60,
    borderRadius: 10,
  },
});