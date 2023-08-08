import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { globalStyles } from "../../styles/globalStyles";

const ErrorMessage = () => {
  return (
    <View style={tw`flex h-full w-full justify-center items-center`}>
      <Text style={[tw`font-bold text-xl`, globalStyles.textBold]}>
        No results... try another date and camera view
      </Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({});
