import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'

const Menu = ({navigation,route}) => {
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    }, [navigation]);

  return (
    <SafeAreaView>
      <View>
        <Text>{name}</Text>
        <Text>{phoneNumber}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Menu  