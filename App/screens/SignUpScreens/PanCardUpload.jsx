import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import MyCamera from '../../../components/MyCamera';
import { useRoute } from '@react-navigation/native';

const PanCardUpload = ({ navigation }) => {
  const [panFrontImage, setPanFrontImage] = useState(null);
  const [panBackImage, setPanBackImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(null); // Tracks which image (front or back) is being captured
   
  const route = useRoute();
  const vehicleAltImage = route.params?.vehicleAltImage;
  const { profileImageBase64, name, email, phoneNumber, gender, dateOfBirth  } = route.params;
  // Pan Front Image Upload
  const handleFrontUpload = (base64Image) => {
    setPanFrontImage(base64Image);
    setIsCapturing(null); // Close camera after upload
  };

  // Pan Back Image Upload
  const handleBackUpload = (base64Image) => {
    setPanBackImage(base64Image);
    setIsCapturing(null); // Close camera after upload
  };

  const handleRetake = () => {
    console.log('Retake button pressed');
    setIsCapturing(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {isCapturing ? (
        <MyCamera
          onUpload={isCapturing === 'front' ? handleFrontUpload : handleBackUpload}
          onRetake={handleRetake}
          initialCameraView="back"
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Text style={styles.label}>PAN Card Front</Text>
            {panFrontImage ? (
              <Image source={{ uri: panFrontImage }} style={styles.image} />
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => setIsCapturing('front')}>
                <Text style={styles.text}>Upload Front</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.imageContainer}>
            <Text style={styles.label}>PAN Card Back</Text>
            {panBackImage ? (
              <Image source={{ uri: panBackImage }} style={styles.image} />
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => setIsCapturing('back')}>
                <Text style={styles.text}>Upload Back</Text>
              </TouchableOpacity>
            )}
          </View>

          {panFrontImage && panBackImage && (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => navigation.navigate('DriverLicense',{vehicleAltImage,name,email,gender,dateOfBirth,phoneNumber,profileImageBase64})}
            >
              <Text style={styles.submitText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0F4A97',
    borderRadius: 5,
    padding: 10,
    width: 150,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#0F4A97',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: 150,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PanCardUpload;
