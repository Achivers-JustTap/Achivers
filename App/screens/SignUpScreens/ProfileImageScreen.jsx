import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Camera } from 'expo-camera'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

const ProfileImageScreen = () => {
  const [permission,requestPermission] = useCameraPermissions();

  if (!permission){
    return <View>
      <Text> Not granted </Text>
    </View>
  }

  if(!permission.granted) {
    return (<View>
      <Text> you need give permission to access Camera </Text>
      <Button onPress={requestPermission} title='Grant Permission '/>
    </View>)
  }
  return (
    <View>
      <Camera>

      </Camera>
    </View>
  )
}

export default ProfileImageScreen

const styles = StyleSheet.create({
  container :{
    flex:1,
    justifyContent:'center'
  }
})