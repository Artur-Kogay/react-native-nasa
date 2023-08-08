import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { pickerItems } from "../../../constants/pickerItem";
import { globalStyles } from "../../../styles/globalStyles";

interface PickerForSelectPickerProps {
  showDropDown: boolean;
  selectedValue: string;
  onChangeValue: (itemValue: string, itemIndex: number) => void;
}

const PickerForSelectPicker: React.FC<PickerForSelectPickerProps> = ({
  showDropDown,
  selectedValue,
  onChangeValue,
}) => {
  return (
    <Picker
      enabled={true}
      selectedValue={selectedValue}
      onValueChange={onChangeValue}
    >
      {pickerItems.map((item) => (
        <Picker.Item
          key={item.id}
          label={item.value}
          value={item.value}
          style={globalStyles.textBold}
        />
      ))}
    </Picker>
  );
};

export default PickerForSelectPicker;

const styles = StyleSheet.create({});
