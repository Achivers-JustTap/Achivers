import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MyCamera from '.././../../../../../components/MyCamera.jsx';
import { useDispatch,useSelector } from 'react-redux';
import { setDrivingLicenseDetails } from '../../../../SignUpScreens/store_management/actions/documentActions.jsx';
const LicenseImageChange = ({ navigation, route }) => {
  
  const { drivingLicense } = useSelector((state) => state.documents);
    const [licenseFrontImage, setLicenseFrontImage] = useState(null);
    const [licenseBackImage, setLicenseBackImage] = useState(null);
    const [isCapturing, setIsCapturing] = useState(null);
      const [licenseFrontUrl,setLicenseFrontUrl]     = useState()
      const[licenseBackUrl,setLicenseBackUrl] = useState()
      const dispatch = useDispatch();

    useEffect(() => {
      navigation.setOptions({ title: 'My Driver Licence' });
    }, [navigation]);
  
    
  
 
    const handleFrontUpload = (base64Image) => {
      setLicenseFrontImage(base64Image);
      setIsCapturing(null);
    };
  
    const handleBackUpload = (base64Image) => {
      setLicenseBackImage(base64Image);
      setIsCapturing(null);
    };
  

    const retakeFrontImage = () => {
      setLicenseFrontImage(null);
      setIsCapturing('front');
    };

    const retakeBackImage = () => {
      setLicenseBackImage(null);
      setIsCapturing('back');
    };
  
    if (isCapturing) {
      return (
        <MyCamera
          onUpload={isCapturing === 'front' ? handleFrontUpload : handleBackUpload}
          onRetake={isCapturing === 'front' ? retakeFrontImage : retakeBackImage}
          setImageURL={isCapturing === 'front' ? setLicenseFrontUrl : setLicenseBackUrl }
        />
      );
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Upload Driver License</Text>
  
        <View style={styles.section}>
          <Text style={styles.label}>License Front</Text>
          {licenseFrontImage ? (
            <Image source={{ uri: licenseFrontImage }} style={styles.imagePreview} />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsCapturing('front')}
            >
              <Text style={styles.buttonText}>Capture License Front</Text>
            </TouchableOpacity>
          )}
        </View>
  
        <View style={styles.section}>
          <Text style={styles.label}>License Back</Text>
          {licenseBackImage ? (
            <Image source={{ uri: licenseBackImage }} style={styles.imagePreview} />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsCapturing('back')}
            >
              <Text style={styles.buttonText}>Capture License Back</Text>
            </TouchableOpacity>
          )}
        </View>
  
        {licenseFrontImage && licenseBackImage && (
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={() => {
              dispatch(setDrivingLicenseDetails({
                            dlnumber: licenseNumber,
                            validDate: validTillDate,
                            frontImage: licenseFrontUrl,
                            backImage: licenseBackUrl,
                          }))
              navigation.navigate('DriverLicence_list', {
                licenseFront: licenseFrontImage,
                licenseBack: licenseBackImage,
                dlNumber,
                validDate,
                uploadSuccess: true, 
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

export default LicenseImageChange

