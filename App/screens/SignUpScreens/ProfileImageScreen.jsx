import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MyCamera from '../../../components/MyCamera';
import { setProfilePicture } from './store_management/actions/userActions';
import { useDispatch } from 'react-redux';

const ProfilePicture = ({ navigation }) => {
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(true);
   const [imageURL, setImageURL] = useState(null);
    const dispatch = useDispatch(); // Toggle between camera and image preview

  const handleUpload = (base64Image) => {
    setProfileImageBase64(base64Image);
    setIsCameraVisible(false); // Hide the camera and show the image preview
    dispatch(setProfilePicture(imageURL));
  };

  const handleRetake = () => {
    console.log('Retake button pressed');
    setProfileImageBase64(null);
    setIsCameraVisible(true); // Show the camera again
  };

  const handleProceed = () => {
    console.log('Proceed button pressed');
    navigation.navigate('AadharUpload');
    console.log("Image Url in Take Selfie ", imageURL)
    dispatch(setProfilePicture(imageURL));
  };

  return (
    <View style={{ flex: 1 }}>
      {isCameraVisible ? (
        <MyCamera
          onUpload={handleUpload}
          onRetake={handleRetake}
          initialCameraView="front"
          setImageURL={setImageURL}
        />
      ) : (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: profileImageBase64 }}
            style={styles.previewImage}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  previewImage: {
    width: '80%',
    height: '60%',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  retakeButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  proceedButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfilePicture;
