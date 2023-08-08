import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'


const Loader = () => {
    // загрузка
  return (
    <View style={[tw`flex flex-col justify-center items-center h-full w-full`, styles.main]}>
      <ActivityIndicator size={'large'}/>
      <Text style={tw`mt-2 font-bold`}>Loading...</Text>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    main:{
        backgroundColor: '#DCCEBE'
    }
})