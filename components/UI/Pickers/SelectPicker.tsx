import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { pickerItems } from "../../../constants/pickerItem";
import tw from "tailwind-react-native-classnames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../../../styles/globalStyles";
import PickerForSelectPicker from "./PickerForSelectPicker";

const SelectPicker = () => {
  // открытие/закрытие dropDown
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  // значение выбранного value и label Picker.Item.
  //  Изначальным значением будет первый элемент из списка
  const [selectedValue, setSelectedValue] = useState<string>(
    pickerItems[0].value
  );
  const [selectedLabel, setSelectedLabel] = useState<string>(
    pickerItems[0].label
  );

  const selectPickerSaveStorage = async (value: string, label: string) => {
    // сохранение label и select
    try {
      await AsyncStorage.setItem("selectValue", value);
      await AsyncStorage.setItem("selectLabel", label);
    } catch (error) {
      console.log(error);
    }
  };

  // вызов предыдущей функции
  useEffect(() => {
    selectPickerSaveStorage(selectedValue, selectedLabel);
  }, []);

  // сохранение значения и соответствующего label, выбранного Picker.Item
  //а так же сохранение всех значений в asyncStorage
  const onChangeValue = (itemValue: string, itemIndex: number) => {
    setSelectedValue(itemValue);
    setSelectedLabel(pickerItems[itemIndex].label);
    setTimeout(() => {
      selectPickerSaveStorage(itemValue, pickerItems[itemIndex].label);
    }, 500); 
    setTimeout(() => {
      setShowDropDown(false);
    }, 300);
  };

  return (
    <View style={tw`relative`}>
      <Text style={[styles.labelText, globalStyles.textLight]}>Select</Text>
      <Pressable onPress={() => setShowDropDown(true)}>
        <View style={[styles.inputContainer, tw`flex justify-center`]}>
          {Platform.OS === "android" && (
            <PickerForSelectPicker
              showDropDown={showDropDown}
              selectedValue={selectedValue}
              onChangeValue={onChangeValue}
            />
          )}
          {Platform.OS === "ios" && (
            <Text style={tw`pl-3`}>{selectedValue}</Text>
          )}
        </View>
      </Pressable>
      {showDropDown && Platform.OS === "ios" && (
        <PickerForSelectPicker
          showDropDown={showDropDown}
          selectedValue={selectedValue}
          onChangeValue={onChangeValue}
        />
      )}
    </View>
  );
};

export default SelectPicker;

const styles = StyleSheet.create({
  label: {
    marginTop: 16,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "400",
  },
  inputContainer: {
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 7,
    borderRadius: 10,
  },
  input: {
    paddingLeft: 16,
    fontSize: 18,
    color: "black",
  },
});
