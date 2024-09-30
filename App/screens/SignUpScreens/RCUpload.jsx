import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MyCamera from '../../../components/MyCamera';
import { useRoute } from '@react-navigation/native';

const RcUpload = ({ navigation }) => {
  const [rcFrontImage, setRcFrontImage] = useState(null);  // State for front image
  const [rcBackImage, setRcBackImage] = useState(null);   // State for back image
  const [isCapturing, setIsCapturing] = useState(null);      // State to control camera view (null, 'front', or 'back')
 
  const route = useRoute();
  const vehicleImage = route.params?.vehicleImage;
  const { profileImageBase64, name, email, phoneNumber, gender, dateOfBirth  } = route.params;

  // Handle the upload of the front image
  const handleFrontUpload = (base64Image) => {
    setRcFrontImage(base64Image);
    setIsCapturing(null);  // Close the camera view after capturing
  };

  // Handle the upload of the back image
  const handleBackUpload = (base64Image) => {
    setRcBackImage(base64Image);
    setIsCapturing(null);  // Close the camera view after capturing
  };

  // Reset the front image and retake it
  const retakeFrontImage = () => {
    setRcFrontImage(null);
    setIsCapturing('front');  // Open the camera for retaking the front image
  };

  // Reset the back image and retake it
  const retakeBackImage = () => {
    setRcBackImage(null);
    setIsCapturing('back');  // Open the camera for retaking the back image
  };

  // Decide whether to show the camera or the upload UI
  if (isCapturing) {
    return (
      <MyCamera
        onUpload={isCapturing === 'front' ? handleFrontUpload : handleBackUpload}
        onRetake={isCapturing === 'front' ? retakeFrontImage : retakeBackImage}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload RC (Registration Certificate)</Text>

      {/* Section for Front RC Image */}
      <View style={styles.section}>
        <Text style={styles.label}>RC Front</Text>
        {rcFrontImage ? (
          <Image source={{ uri: rcFrontImage }} style={styles.imagePreview} />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsCapturing('front')}  // Open camera for front image
          >
            <Text style={styles.buttonText}>Capture RC Front</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Section for Back RC Image */}
      <View style={styles.section}>
        <Text style={styles.label}>RC Back</Text>
        {rcBackImage ? (
          <Image source={{ uri: rcBackImage }} style={styles.imagePreview} />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsCapturing('back')}  // Open camera for back image
          >
            <Text style={styles.buttonText}>Capture RC Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Proceed button once both images are captured */}
      {rcFrontImage && rcBackImage && (
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => {
            // Navigate to the next screen or handle data submission with both images
            console.log('Proceeding with front and back RC images...');
            // Optionally navigate or pass the images to another screen or handler
            navigation.navigate('Processing', {
              rcFront: rcFrontImage,
              rcBack: rcBackImage,
              vehicleImage,
              name,email,gender,dateOfBirth,phoneNumber,profileImageBase64
            });
          }}
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: 200,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  proceedButton: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
});

export default RcUpload;
