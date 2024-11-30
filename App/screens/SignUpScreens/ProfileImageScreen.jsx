import React, { useState } from 'react';
import { View } from 'react-native';
import MyCamera from '../../../components/MyCamera';
import { setProfilePicture } from '../store_management/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

const ProfilePicture = ({ navigation }) => {
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  
  // State to hold the base64 of the profile image
  const [profileImageBase64, setProfileImageBase64] = useState(null);

  const handleUpload = (base64Image) => {
    // Set the base64 image in the component state
    setProfileImageBase64(base64Image);
    dispatch(setProfilePicture(base64Image))

    // Pass the base64 image to the next screen (AadharUpload)
    navigation.navigate('AadharUpload', { name, profileImageBase64: base64Image });
  };

  const handleRetake = () => {
    console.log('Retake button pressed');
    // Reset the profile image base64 if the user wants to retake the picture
    setProfileImageBase64(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <MyCamera onUpload={handleUpload} onRetake={handleRetake} initialCameraView="front" />
    </View>
  );
};

export default ProfilePicture;