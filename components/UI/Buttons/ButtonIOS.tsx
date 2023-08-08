import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import tw from "tailwind-react-native-classnames";
import { globalStyles } from "../../../styles/globalStyles";

interface ButtonIOSProps {
  children: ReactNode;
  confirm?: () => void;
  cancel?: () => void;
}

// кнопка исключительно для IOS устройств. При выборе даты в первом окне
const ButtonIOS: React.FC<ButtonIOSProps> = ({ children, confirm, cancel }) => {
  //Условные стили для confirm
  const styleConfirmBtn = {
    background: confirm ? "#0070c9" : "#11182711",
    color: confirm ? "white" : "#075985",
  };
  return (
    <TouchableOpacity
      style={[
        styles.button,
        tw`flex justify-center items-center`,
        { backgroundColor: styleConfirmBtn.background },
      ]}
      onPress={(confirm && confirm) || (cancel && cancel)}
    >
      <Text
        style={[
          styles.buttonText,
          { color: styleConfirmBtn.color },
          globalStyles.textBold,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonIOS;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#11182711",
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 50,
  },
  buttonText: {
    color: "#075985",
  },
});
