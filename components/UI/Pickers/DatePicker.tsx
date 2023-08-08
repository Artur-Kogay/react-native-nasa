import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import ButtonIOS from "../Buttons/ButtonIOS";
import format from "date-fns/format";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../../../styles/globalStyles";

const DatePicker = () => {
  // дата
  const [date, setDate] = useState<Date>(new Date());

  // state для datePicker: открытие/закрытие окна
  const [showPicker, setShowPicker] = useState<boolean>(false);
  // отображение выбранной даты в самом input
  const [dateOfInput, setDateOfInput] = useState<string>("");

  // форматирование даты под нужный формат(информация для пользователя в input)
  const formattedDate = (date: Date): string => {
    return format(date, "dd MMM, yyyy");
  };

  const dateSaveStorage = async (date: Date) => {
    // переконвертирование даты под нужный формат и сохранение ее в asyncStorage
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      await AsyncStorage.setItem("date", formattedDate);
    } catch (error) {
      console.log(error);
    }
  };

  //При первой загрузке страницы дата будет равна сегодняшнему дню
  useEffect(() => {
    setDateOfInput(formattedDate(new Date()));
  }, []);

  //При первой загрузке страницы сохранять дату в AsyncStorage
  useEffect(() => {
    dateSaveStorage(date);
  }, []);

  // открытие/закрытие date picker
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  // сохранение значения текущей даты на android для отображения в input
  // и сохранение даты в asyncStorage
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        dateSaveStorage(currentDate);
        setDateOfInput(formattedDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  // сохранение значения текущей даты на IOS для отображения в input(onPress для кнопки confirm)
  const confirmIOSDate = () => {
    dateSaveStorage(date);
    setDateOfInput(formattedDate(date));
    toggleDatePicker();
  };

  const closeIOSDate = () => {
    setShowPicker(false);
  };

  return (
    <View style={styles.label}>
      <Text style={[styles.labelText, globalStyles.textLight]}>Date</Text>
      {/* открытие date picker для выбора даты */}
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
          style={[styles.datePicker]}
        />
      )}
      {/* если ОС - IOS, то добавление кнопок confirm и cancel */}
      {showPicker && Platform.OS === "ios" && (
        <View style={tw`flex-row justify-around`}>
          <ButtonIOS cancel={closeIOSDate}>Cancel</ButtonIOS>
          <ButtonIOS confirm={confirmIOSDate}>Confirm</ButtonIOS>
        </View>
      )}
      {/* сам инпут */}
      <View
        style={[
          tw`relative`,
          { display: showPicker && Platform.OS === "ios" ? "none" : "block" },
        ]}
      >
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            value={dateOfInput}
            editable={false}
            onPressIn={toggleDatePicker}
            style={[styles.input, globalStyles.textLight]}
          />
          <Image
            style={tw`absolute top-6 right-4`}
            source={require("../../../assets/images/calendar.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  label: {
    marginTop: 16,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "400",
  },
  input: {
    borderRadius: 10,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: "black",
    paddingLeft: 16,
    fontSize: 18,
    marginTop: 7,
  },
  datePicker: {
    marginTop: -10,
    height: 120,
  },
});
