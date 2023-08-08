import { RouteProp } from '@react-navigation/native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
export type NavigationParamList = {
    Selection: undefined
    CameraRoll: undefined
    Image: {
        id: number, 
        uri: string
    }
}

export type CameraRollScreenProp = NativeStackNavigationProp<NavigationParamList, 'Image'>

export type ImageScreenRouteProp = RouteProp<NavigationParamList, 'Image'>