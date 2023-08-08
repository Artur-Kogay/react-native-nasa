import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import tw from "tailwind-react-native-classnames";
import { fetchData } from "../API/getDataBase";
import { APIKEY } from "../API/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASEURL } from "../API/API";
import { Photo } from "../interfaces/Photo";
import { useNavigation } from "@react-navigation/native";
import { CameraRollScreenProp } from "../types/NavigationTypes";
import Loader from "../components/Loader/Loader";
import { globalStyles } from "../styles/globalStyles";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

interface ApiResponse {
  photos: Photo[];
}
// второе окно
const CameraRollScreen = () => {
  // данные, полученные с get-запроса
  const [dataImages, setDataImages] = useState<ApiResponse>({ photos: [] });
  // ключ date из asyncStorage для того, чтобы его вставили в ссылку
  const [date, setDate] = useState<string>("");
  // ключ selectLabel из asyncStorage для того, чтобы его вставили в ссылку
  const [camera, setCamera] = useState<string>("");
  // Постраничная навигация, отправка данных в динамический роутинг
  const navigation = useNavigation<CameraRollScreenProp>();
  // Loader при загрузке данных с get-запроса
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Мемоизирование get-запроса, чтобы он не срабатывал много раз подряд 
  const memoizedFetchData = useMemo(() => fetchData, [date, camera])

  // функция получения ключей date и selectLabel из asyncStorage
  useEffect(() => {
    const getStorageData = async () => {
      try {
        const date = await AsyncStorage.getItem("date");
        const camera = await AsyncStorage.getItem("selectLabel");
        if (date !== null && camera !== null) {
          setDate(date);
          setCamera(camera);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStorageData();
  }, []);

  // функция вызова get-запроса. Сама функция находится в папке API, URL и APIKEY - там же
  useEffect(() => {
    // URL
    const URL = `${BASEURL}?earth_date=${date}&camera=${camera}&api_key=${APIKEY}`;
    const fetchDataFromAPI = async () => {
      // Отображение лоадера
      setIsLoading(true);
      try {
        const data = await memoizedFetchData(URL);
        setDataImages(data);
      } catch (error) {
        console.log("Error fetching data from API:", error);
      } finally {
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    fetchDataFromAPI();
  }, [date, camera]);
  // рендер лоадера на странице
  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={[styles.main, tw`p-4 h-full`]}>
      <ScrollView contentContainerStyle={styles.photosBoxes}>
        {dataImages.photos.length !== 0 &&
          dataImages.photos.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("Image", { uri: item.img_src, id: item.id })
              }
            >
              <Image style={[styles.image]} source={{ uri: item.img_src }} />
            </TouchableOpacity>
          ))}
      </ScrollView>
      {/* при отрицательном запросе */}
      {!isLoading && dataImages.photos.length === 0 && (
          <ErrorMessage />
        )}
    </View>
  );
};

export default CameraRollScreen;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#DCCEBE",
    paddingRight: 24,
    paddingLeft: 24,
  },
  image: {
    height: 109,
    width: "31%",
    borderRadius: 8,
    aspectRatio: 1,
  },
  photosBoxes: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
});
