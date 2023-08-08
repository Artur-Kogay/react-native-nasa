import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ImageScreenRouteProp } from "../types/NavigationTypes";
import CustomHeader from "../components/CustomHeader/CustomHeader";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

// типизирование пропса navigation
type SelectionScreenNavigationProp = NavigationProp<ParamListBase>;

// третье окно, результат динамического роутинга
const ImageScreen = ({
  navigation,
}: {
  navigation: SelectionScreenNavigationProp;
}) => {
  // получение ключей, отправленных с помощью useNavigate из второго окна
  const route = useRoute<ImageScreenRouteProp>();
  const { id, uri } = route.params;

  return (
    <>
      <CustomHeader
        navigation={navigation}
        id={id}
        titleProps="Photo ID"
        bg={true}
        icon={true}
        share={true}
        uri={uri}
      />
      <View style={tw`bg-black h-full px-4 py-4`}>
        <Image source={{ uri: uri }} style={styles.image}/>
      </View>
    </>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  image:{
    width: '100%',
    height: '80%',
    borderRadius: 8,
  }
});
