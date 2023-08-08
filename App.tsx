import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./routes/navigation";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";

// ассинхронное подключение шрифтов
const fonts = async () =>
  await Font.loadAsync({
    "dosis-bold": require("./fonts/Dosis-Bold.ttf"),
    "dosis-light": require("./fonts/Dosis-Light.ttf"),
  });

export default function App() {
  //состояние шрифта
  const [font, setFont] = useState<boolean>(false);

  //запуск функции подключения шрифтов
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fonts();
        await SplashScreen.hideAsync();
        setFont(true);
      } catch (error) {
        console.warn(error);
      }
    }
    prepare();
  }, []);

  // Возвращение null, пока загружаются шрифты и скрывается заставка
  if (!font) {
    return null; 
  }
  
  return <Navigation />;
}
