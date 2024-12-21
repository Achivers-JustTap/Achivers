import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

const RcNumber = ({ navigation }) => {
  const [RC, setRcNumber] = useState('');
  const [isGoButtonEnabled, setIsGoButtonEnabled] = useState(false);

  const route = useRoute();
  const vehicleAltImage = route.params?.vehicleAltImage;
  const { selectedVehicleType: selectedVehicleName, licenseFrontFile, licenseBackFile, licenseFront, licenseBack, licenseNumber, validTillDate, panNumber, panFrontImage, panBackImage, panFrontFile, panBackFile, name, email, gender, dateOfBirth, phoneNumber, profileImageBase64, aadharNumber, aadharFront, aadharBack, aadharFrontFile, aadharBackFile } = route.params;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Function to validate RC Number format (10 characters: 2 alphabets, 2 digits, 2 alphabets, 4 digits)
  const validateRC = (text) => {
    const uppercasedText = text.toUpperCase(); // Automatically convert to uppercase
    setRcNumber(uppercasedText);
    const regex = /^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/;
    setIsGoButtonEnabled(regex.test(uppercasedText)); // Enable or disable the Go button
  };

  const handleGoButtonPress = () => {
    // Validate RC on button press
    if (!isGoButtonEnabled) {
      Alert.alert('Error', 'Please enter a valid RC Number.');
      return;
    }
    Keyboard.dismiss();
    Alert.alert('Success', 'Vehicle Number is valid!');
  };

  const handleChange = (text) => {
    const upperCaseText = text.toUpperCase();
    setRcNumber(upperCaseText);
    validateRC(upperCaseText); // Call validation after text change
  };

  const handleTakeRCImage = () => {
    if (!isGoButtonEnabled) {
      Alert.alert('Error', 'Please enter a valid RC Number.');
      return;
    }
    navigation.navigate('RCUpload', { selectedVehicleType: selectedVehicleName, RC, licenseFrontFile, licenseBackFile, licenseFront, licenseBack, licenseNumber, validTillDate, panNumber, panFrontImage, panBackImage, panFrontFile, panBackFile, name, email, gender, dateOfBirth, phoneNumber, profileImageBase64, aadharNumber, aadharFront, aadharBack, aadharFrontFile, aadharBackFile });
  };

  const handleUploadFromFiles = () => {
    if (!isGoButtonEnabled) {
      Alert.alert('Error', 'Please enter a valid RC Number.');
      return;
    }
    navigation.navigate('RCUploadFromFiles', { selectedVehicleType: selectedVehicleName, RC, licenseFrontFile, licenseBackFile, licenseFront, licenseBack, licenseNumber, validTillDate, panNumber, panFrontImage, panBackImage, panFrontFile, panBackFile, name, email, gender, dateOfBirth, phoneNumber, profileImageBase64, aadharNumber, aadharFront, aadharBack, aadharFrontFile, aadharBackFile });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upload Your RC-Registration Certificate</Text>

      <Text style={styles.text}>
        Enter your vehicle number plate and date of birth, and we'll get the required information from the Parivahan.
      </Text>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', padding: 10, marginBottom: 10 }}>
          <Text style={{ color: 'white', fontSize: 19, fontFamily: 'SofadiOne' }}>Just Tap!</Text>
          {' '}to enter your RC Number and upload image
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Vehicle Number Plate"
            value={RC}
            onChangeText={handleChange}
            keyboardType="default"
            maxLength={10}  // Allow alphanumeric input
          />
          <TouchableOpacity
            style={[styles.goButton, { backgroundColor: isGoButtonEnabled ? 'yellow' : 'gray' }]}
            disabled={!isGoButtonEnabled}
            onPress={handleGoButtonPress}
          >
            <Text style={styles.goButtonText}>Go</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: -100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  goButton: {
    width: '20%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
  },
  goButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
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
