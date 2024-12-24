import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MyCamera from '../../../components/MyCamera';
import { useDispatch } from 'react-redux';
import { setDrivingLicenseDetails } from './store_management/actions/documentActions';
const LicenseImage = ({ navigation,route }) => {
  const { licenseNumber, validTillDate }=route.params

  const [licenseFrontImage, setLicenseFrontImage] = useState(null);  
  const [licenseBackImage, setLicenseBackImage] = useState(null);  
  const [isCapturing, setIsCapturing] = useState(null); 
  const [licenseFrontUrl,setLicenseFrontUrl]     = useState()
  const[licenseBackUrl,setLicenseBackUrl] = useState()
  
const dispatch=useDispatch() 

  // Handle the upload of the front image
  const handleFrontUpload = (base64Image) => {
    setLicenseFrontImage(base64Image);
    setIsCapturing(null);  // Close the camera view after capturing
  };

  // Handle the upload of the back image
  const handleBackUpload = (base64Image) => {
    setLicenseBackImage(base64Image);
    setIsCapturing(null);  // Close the camera view after capturing
  };

  // Reset the front image and retake it
  const retakeFrontImage = () => {
    setLicenseFrontImage(null);
    setIsCapturing('front');  // Open the camera for retaking the front image
  };

  // Reset the back image and retake it
  const retakeBackImage = () => {
    setLicenseBackImage(null);
    setIsCapturing('back');  // Open the camera for retaking the back image
  };

  // Decide whether to show the camera or the upload UI
  if (isCapturing) {
    return (
      <MyCamera
        onUpload={isCapturing === 'front' ? handleFrontUpload : handleBackUpload}
        onRetake={isCapturing === 'front' ? retakeFrontImage : retakeBackImage}
        setImageURL={isCapturing === 'front' ? setLicenseFrontUrl : setLicenseBackUrl 
}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Driver License</Text>

      {/* Section for Front License Image */}
      <View style={styles.section}>
        <Text style={styles.label}>License Front</Text>
        {licenseFrontImage ? (
          <Image source={{ uri: licenseFrontImage }} style={styles.imagePreview} />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsCapturing('front')}  // Open camera for front image
          >
            <Text style={styles.buttonText}>Capture License Front</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Section for Back License Image */}
      <View style={styles.section}>
        <Text style={styles.label}>License Back</Text>
        {licenseBackImage ? (
          <Image source={{ uri: licenseBackImage }} style={styles.imagePreview} />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsCapturing('back')}  // Open camera for back image
          >
            <Text style={styles.buttonText}>Capture License Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Proceed button once both images are captured */}
      {licenseFrontImage && licenseBackImage && (
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => {
            // Proceed with uploading both images
            console.log(licenseFrontUrl)
            console.log(licenseBackUrl)

            dispatch(setDrivingLicenseDetails({
              number: licenseNumber,
              validDate: validTillDate,
              frontImage: licenseFrontUrl,
              backImage: licenseBackUrl,
            }))
            // Navigate to the next screen with both images
            navigation.navigate('RC');
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

export default LicenseImage;
