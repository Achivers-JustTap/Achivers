import React from 'react';
import { View } from 'react-native';
import MyCamera from '../../../components/MyCamera';

const ProfilePicture = ({ navigation, route }) => {
  const { name } = route.params;

  const handleUpload = (base64Image) => {
    console.log('Upload button pressed', base64Image);
    navigation.navigate('AadharUpload', { name });
  };

  const handleRetake = () => {
    console.log('Retake button pressed');
  };

  return (
    <View style={{ flex: 1 }}>
      <MyCamera onUpload={handleUpload} onRetake={handleRetake} initialCameraView="front" />
    </View>
  );
};

export default ProfilePicture;
