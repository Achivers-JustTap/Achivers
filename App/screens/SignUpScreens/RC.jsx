import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

const RcNumber = ({ navigation }) => {
  const [RC, setRcNumber] = useState('');

  const route = useRoute();
  const vehicleAltImage = route.params?.vehicleAltImage;
  const { licenseFrontFile,selectedVehicleType: selectedVehicleName ,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile,name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile} = route.params;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validateRC = () => {
    if (!RC.trim()) return 'Please enter your RC Number.';
    return null; 
  };

  const handleTakeRCImage = () => {
    const validationError = validateRC();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    navigation.navigate('RCUpload', { selectedVehicleType: selectedVehicleName ,RC,licenseFrontFile,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile}); 
  };

  const handleUploadFromFiles = () => {
    const validationError = validateRC();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    navigation.navigate('RCUploadFromFiles', {selectedVehicleType: selectedVehicleName ,RC,licenseFrontFile,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile,name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile}); // Navigate to the screen for uploading from files
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upload Your RC-Registration Certificate</Text>
      
      <Text style={styles.text}>Enter your vehicle number plate and date of birth and we'll get the required information 
        from the Parivahan.</Text>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', padding: 10, marginBottom: 10 }}>
          <Text style={{ color: 'white', fontSize: 19, fontFamily: 'SofadiOne' }}>Just Tap!</Text>
          {' '}to enter your RC Number and upload image
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Vehicle Number Plate"
          value={RC}
          onChangeText={setRcNumber}
          keyboardType="default"  // Change to default to allow alphanumeric input
        />
      </View>

      <View style={styles.buttonContainer}>
        {/* Button to take RC image */}
        <TouchableOpacity style={styles.button} onPress={handleTakeRCImage}>
          <Text style={styles.buttonText}>Take RC Image</Text>
        </TouchableOpacity>

        {/* Button to upload from files */}
        <TouchableOpacity style={styles.button} onPress={handleUploadFromFiles}>
          <Text style={styles.buttonText}>Upload from Files</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
  },
  title: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
    marginBottom: 40,
  },
  text: {
    color: 'white',
    padding: 10,
    fontSize: 15,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 250, // Adjust the margin as needed
    backgroundColor: 'white',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginBottom: 30,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RcNumber;
