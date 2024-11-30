import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useSelector, useDispatch } from 'react-redux';
import { setDrivingLicenseDetails } from '../store_management/actions/documentActions';

const DrivingLicense = ({ navigation }) => {
  const dispatch = useDispatch();
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
    dispatch(setDrivingLicenseDetails({ number: licenseNumber, dateOfBirth:dateOfBirth }));
    navigation.navigate('LicenseImageUpload', { licenseNumber, dateOfBirth }); // Navigate to the next screen
  };

  // Handle uploading Driving License from files
  const handleUploadFromFiles = () => {
    const validationError = validateLicenseNumber();
    if (validationError) {
      Alert.alert('Error', validationError); // Show error if validation fails
      return;
    }
    dispatch(setDrivingLicenseDetails({ number: licenseNumber, dateOfBirth:dateOfBirth }));
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

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
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

        <Text style={{ alignContent: 'center', color: 'white', fontSize: 16 }}>Date of Birth</Text>

        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            style={styles.input}
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
    justifyContent: 'center',
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
    marginBottom: 10,
  },
  tapText: {
    color: 'white',
    padding: 20,
    marginBottom: 10,
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
  },
  input: {
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
