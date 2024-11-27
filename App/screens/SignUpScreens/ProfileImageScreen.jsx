import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MyCamera from '../../../components/MyCamera';

const ProfilePicture = ({ navigation, route }) => {
  const { phoneNumber, name, email, gender, dateOfBirth,selectedVehicleType: selectedVehicleName  } = route.params;
  const vehicleAltImage = route.params?.vehicleAltImage;

  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(true); // Toggle between camera and image preview

  const handleUpload = (base64Image) => {
    console.log('Base64 Image:', base64Image);
    setProfileImageBase64(base64Image);
    setIsCameraVisible(false); // Hide the camera and show the image preview
  };

  const handleRetake = () => {
    console.log('Retake button pressed');
    setProfileImageBase64(null);
    setIsCameraVisible(true); // Show the camera again
  };

  const handleProceed = () => {
    console.log('Proceed button pressed');
    navigation.navigate('AadharUpload', {
      name,
      email,
      gender,
      dateOfBirth,
      profileImageBase64,
      vehicleAltImage,
      phoneNumber,selectedVehicleType: selectedVehicleName 
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {isCameraVisible ? (
        <MyCamera
          onUpload={handleUpload}
          onRetake={handleRetake}
          initialCameraView="front"
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
