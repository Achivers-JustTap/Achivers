import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert, Image, ScrollView, Keyboard } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

const DrivingLicense = ({ navigation }) => {
  const [licenseNumber, setLicenseNumber] = useState(''); // State for Driving License number
  const [validTillDate, setValidTillDate] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false); // State for date picker visibility
  const [isGoButtonEnabled, setIsGoButtonEnabled] = useState(false); // State for Go button enabling

  const route = useRoute();
  const vehicleAltImage = route.params?.vehicleAltImage;
  const {selectedVehicleType: selectedVehicleName ,panNumber,panFrontImage,panBackImage,panFrontFile,panBackFile, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile} = route.params;

  useEffect(() => {
    console.log('DrivingLicense component mounted');
    navigation.setOptions({ headerShown: false }); // Hiding the header
  }, [navigation]);

  // Validation for Driving License number
  const validateLicenseNumber = () => {
    if (!licenseNumber.trim()) return 'Please enter your Driving License Number.';
    if (!validTillDate.trim()) return 'Please select your Date of Birth.';
  };

  // Handle taking a Driving License image
  const handleTakeLicenseImage = () => {
    const validationError = validateLicenseNumber();
    if (validationError) {
      Alert.alert('Error', validationError); // Show error if validation fails
      return;
    }
    navigation.navigate('LicenseImageUpload', {selectedVehicleType: selectedVehicleName , licenseNumber, validTillDate, panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile,vehicleAltImage, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile});
  };

  // Handle uploading Driving License from files
  const handleUploadFromFiles = () => {
    const validationError = validateLicenseNumber();
    if (validationError) {
      Alert.alert('Error', validationError); // Show error if validation fails
      return;
    }
    navigation.navigate('DrivingLicenseUpload', { selectedVehicleType: selectedVehicleName ,licenseNumber, validTillDate, panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile, vehicleAltImage, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile});
  };

  // Show date picker
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  // Hide date picker
  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  // Handle date selection
  const handleConfirm = (date) => {
    setValidTillDate(date.toLocaleDateString()); // Format date as desired
    hideDatePicker();
  };

  // Handle DL Number input change
  const handleLicenseNumberChange = (text) => {
    const uppercasedText = text.toUpperCase(); // Automatically convert to uppercase
    setLicenseNumber(uppercasedText);

    // Validate DL Number format (2 letters, 1 digit, 13 remaining digits)
    const regex = /^[A-Z]{2}[0-9]{1}[0-9]{13}$/;
    setIsGoButtonEnabled(regex.test(uppercasedText)); // Enable Go button if format is valid
  };

  // Handle Go button press to dismiss the keyboard
  const handleGoButtonPress = () => {
    const validationError = validateLicenseNumber();
    if (validationError) {
      Alert.alert('Error', validationError); // Show error if validation fails
      return;
    }
   Keyboard.dismiss();
       Alert.alert('Success', 'DL Number is valid!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={styles.title}>Upload Your Driver Licence</Text>

        {/* Container for side-by-side images */}
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/driverlicencefront.png')} style={styles.image1} resizeMode="contain" />
          <Image source={require('../../../assets/images/driverlicenceback.png')} style={styles.image2} resizeMode="contain" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.tapText}>
            <Text style={styles.justTapText}>Just Tap!</Text>
            {' '}to enter your DL number and upload image
          </Text>

          <Text style={styles.label}>DL Number</Text>
          
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="TS000000000000000"
              value={licenseNumber}
              onChangeText={handleLicenseNumberChange}
              keyboardType="default"
              maxLength={16} // Restrict input to 16 characters
            />
            {/* Go Button */}
            <TouchableOpacity 
              style={[styles.goButton, { backgroundColor: isGoButtonEnabled ? 'yellow' : 'gray' }]} 
              disabled={!isGoButtonEnabled} 
              onPress={handleGoButtonPress}
            >
              <Text style={styles.goButtonText}>Go</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.ValidTilltext}>Valid Till</Text>

          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={styles.validTill}
              placeholder="Select Date"
              value={validTillDate || ''}
              editable={false}
            />
          </TouchableOpacity>

          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.buttonContainer}>
          {/* Button to Take Driving License Image */}
          <TouchableOpacity style={styles.button} onPress={handleTakeLicenseImage}>
            <Text style={styles.buttonText}>Take Driving License Image</Text>
          </TouchableOpacity>

          {/* Button to Upload Driving License from Files */}
          <TouchableOpacity style={styles.button} onPress={handleUploadFromFiles}>
            <Text style={styles.buttonText}>Upload from Files</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F4A97',
  },
  title: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 35,
    marginBottom: 5,
  },
  imageContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: -20,
  },
  image1: {
    width: 300,
    height: 240, 
  },
  image2: {
    width: 300,
    height: 240,
    marginTop: -50,
  },
  tapText: {
    color: 'white',
    paddingVertical: -5,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  justTapText: {
    fontSize: 19,
    fontFamily: 'SofadiOne',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left', 
    width: '80%',
  },
  ValidTilltext: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center', 
  },
  inputContainer: {
    alignItems: 'center',
    width: '100%',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 7, 
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
  validTill: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 30, 
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

export default DrivingLicense;
