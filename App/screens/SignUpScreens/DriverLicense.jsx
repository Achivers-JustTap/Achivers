import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert, Image } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

const DrivingLicense = ({ navigation }) => {
  const [licenseNumber, setLicenseNumber] = useState(''); // State for Driving License number
  const [dateOfBirth, setDateOfBirth] = useState(''); // State for Date of Birth
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false); // State for date picker visibility

  useEffect(() => {
    console.log('DrivingLicense component mounted');
    navigation.setOptions({ headerShown: false }); // Hiding the header
  }, [navigation]);

  // Validation for Driving License number
  const validateLicenseNumber = () => {
    if (!licenseNumber.trim()) return 'Please enter your Driving License Number.';
    if (!dateOfBirth.trim()) return 'Please select your Date of Birth.';
  };

  // Handle taking a Driving License image
  const handleTakeLicenseImage = () => {
    const validationError = validateLicenseNumber();
    if (validationError) {
      Alert.alert('Error', validationError); // Show error if validation fails
      return;
    }
    navigation.navigate('LicenseImageUpload', { licenseNumber, dateOfBirth }); // Navigate to the next screen
  };

  // Handle uploading Driving License from files
  const handleUploadFromFiles = () => {
    const validationError = validateLicenseNumber();
    if (validationError) {
      Alert.alert('Error', validationError); // Show error if validation fails
      return;
    }
    navigation.navigate('DrivingLicenseUpload', { licenseNumber, dateOfBirth }); // Navigate to file upload screen
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
    setDateOfBirth(date.toLocaleDateString()); // Format date as desired
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upload Your Driver License</Text>

      <Image source={require('../../../assets/images/driverlicense.png')} style={styles.image} resizeMode="contain" />

      <View style={styles.inputContainer}>
        <Text style={styles.tapText}>
          <Text style={styles.justTapText}>Just Tap!</Text>
          {' '}to enter your DL number and upload image
        </Text>

        <Text style={styles.label}>DL Number</Text>
        
        <TextInput
          style={styles.input}
          placeholder="DL00000000000"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
          keyboardType="default"
        />

        <Text style={styles.DOBtext}>Date of Birth</Text>

        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            style={styles.DOB}
            placeholder="Select Date of Birth"
            value={dateOfBirth || ''}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
  },
  title: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 270,
  },
  tapText: {
    color: 'white',
    paddingVertical: 5,
    paddingRight:10,
    paddingLeft:10,
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
  DOBtext:{
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center', 
  },
  inputContainer: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 7, 
    backgroundColor: 'white',
    color: 'black',
  },
  DOB: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20, 
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
    marginTop: 80,
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
