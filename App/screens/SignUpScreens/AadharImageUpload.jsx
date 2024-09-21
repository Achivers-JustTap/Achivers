import React from 'react';
import { View } from 'react-native';
import MyCamera from '../../../components/MyCamera';

const AadharImage = ({ navigation }) => {


  const handleUpload = (base64Image) => {
    console.log('Upload button pressed', base64Image);
    navigation.navigate('PanCard');
  };

  const handleRetake = () => {
    console.log('Retake button pressed');
  };

  return (
    <View style={{ flex: 1 }}>
      <MyCamera onUpload={handleUpload} onRetake={handleRetake} initialCameraView="back" />
    </View>
  );
};

export default AadharImage;
