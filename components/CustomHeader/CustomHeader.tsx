import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, parseISO } from "date-fns";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { headerStyle } from "../../styles/headerStyle";
import { CustomHeaderPropsDefault } from "../../interfaces/CustomHeader";
import { shareFunction } from "../../utils/shareFunction";
import { globalStyles } from "../../styles/globalStyles";
import { AntDesign } from "@expo/vector-icons";

// типизирование пропса navigation
type SelectionScreenNavigationProp = NavigationProp<ParamListBase>;

interface CustomHeaderProps extends CustomHeaderPropsDefault {
  navigation: SelectionScreenNavigationProp;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  navigation,
  bg,
  id,
  titleProps,
  icon,
  uri,
  share,
}) => {
  // Title
  const [title, setTitle] = useState<string>("");
  // хранение ключей из asyncStorage для тайтла и субтайтла
  const [dateOfStorage, setDateOfStorage] = useState<string>("");
  // subtitle
  const [subtitle, setSubtitle] = useState<string>("");

  // функция получения ключей dateOfStorage, title из asyncStorage
  useEffect(() => {
    const getStorageData = async (): Promise<void> => {
      try {
        const subtitle = await AsyncStorage.getItem("date");
        const title = await AsyncStorage.getItem("selectValue");
        if (subtitle !== null && title !== null) {
          setDateOfStorage(subtitle);
          setTitle(title);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStorageData();
  }, []);

  // форматирование даты dateOfStorage под нужный формат
  //  и в дальнейшем присвоение ее в subtitle
  const formattedDate = (): void => {
    if (dateOfStorage) {
      const parseDate = parseISO(dateOfStorage);
      const date = format(parseDate, "dd MMM, yyyy");
      setSubtitle(date);
    }
  };

  // вызов функции форматирования даты(предыдущей функции)
  useEffect(() => {
    formattedDate();
  }, [dateOfStorage]);

  // условное изменение стилей хедера при переходе со второго окна на третье
  const stylesHeaderWithProps = {
    backgroundHeader: bg ? "rgba(0, 0, 0, 1)" : "#DCCEBE",
    colorIcon: icon ? "white" : "black",
  };

  return (
    <SafeAreaView
      style={[
        tw`relative`,
        { paddingTop: headerStyle.paddingTop },
        { paddingHorizontal: headerStyle.paddingHorizontal },
        { backgroundColor: stylesHeaderWithProps.backgroundHeader },
      ]}
    >
      {/* стрелочка, ведущая назад */}
      <TouchableOpacity
        style={tw`absolute left-4 bottom-4 z-10`}
        onPress={() => navigation.goBack()}
      >
        {Platform.OS === "ios" ? (
          <AntDesign
            name="left"
            size={24}
            color={stylesHeaderWithProps.colorIcon}
          />
        ) : (
          <Ionicons
            name="arrow-back"
            size={24}
            color={stylesHeaderWithProps.colorIcon}
          />
        )}
      </TouchableOpacity>
      {/* условие изменения хедера, при переходе со второго окна на третье */}
      {id && titleProps ? (
        <View>
          <Text
            style={[
              tw`text-center font-light text-white`,
              globalStyles.textLight,
            ]}
          >
            {titleProps}
          </Text>
          <Text
            style={[
              tw`text-center text-lg pb-2 font-bold text-white`,
              globalStyles.textBold,
            ]}
          >
            {id}
          </Text>
        </View>
      ) : (
        <View>
          <Text
            style={[tw`text-center font-bold text-lg`, globalStyles.textBold]}
          >
            {title}
          </Text>
          <Text
            style={[tw`text-center py-2 font-normal`, globalStyles.textLight]}
          >
            {subtitle}
          </Text>
        </View>
      )}
      {/* иконка share для отправки фотографии, используется функция из utils */}
      {share && uri && (
        <TouchableOpacity
          style={tw`absolute z-10 right-5 bottom-5 border`}
          onPress={() => shareFunction(uri)}
        >
          <Image source={require("../../assets/images/upload.png")} />
        </TouchableOpacity>
      )}
      <StatusBar />
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
