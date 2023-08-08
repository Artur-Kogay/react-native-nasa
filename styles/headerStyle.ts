import {Platform} from 'react-native'

export const headerStyle = {
    paddingTop: Platform.OS === "android" ? 16 : 40,
    paddingHorizontal: Platform.OS === "android" ? 10 : 0,
  };