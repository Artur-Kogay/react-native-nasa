import { Share } from "react-native";

export const shareFunction = async (uri: string) => {
  try {
    const result = await Share.share({
      message: uri,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log("shared activity type of:", result.activityType);
      } else {
        console.log("shared");
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("dissmised");
    }
  } catch (error) {
    console.log(error);
  }
};
