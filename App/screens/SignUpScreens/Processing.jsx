import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Processing = ({ navigation }) => {
  const [verificationStatus, setVerificationStatus] = useState('processing');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const document = useSelector((state) => state.documents);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    fetchVerificationStatus();
  }, [navigation]);

  const fetchVerificationStatus = () => {
    console.log('Fetching verification status...');
    setTimeout(() => {
      setVerificationStatus('valid'); // Change as needed ('valid', 'invalid', 'processing').
      setLoading(false);
    }, 2000);
  };

  const sendToBackend = async () => {
    setLoading(true);
    console.log('Preparing to send data to the backend...');
    console.log('User Data:', user);
    console.log('Document Data:', document);

    const formData = new FormData();

    try {
      // Append images with validation
      const appendImage = (key, image) => {
        if (image) {
          formData.append(key, {
            uri: image,
            name: `${key}.jpg`,
            type: 'image/jpeg',
          });
        }
      };

      appendImage('profilePicture', user.profilePicture);
      appendImage('aadharFront', document.aadhar.frontImage);
      appendImage('aadharBack', document.aadhar.backImage);
      appendImage('panFront', document.pan.frontImage);
      appendImage('panBack', document.pan.backImage);
      appendImage('drivingLicenseFront', document.drivingLicense.frontImage);
      appendImage('drivingLicenseBack', document.drivingLicense.backImage);
      appendImage('rcFront', document.rc.frontImage);
      appendImage('rcBack', document.rc.backImage);

      // Append text fields
      formData.append('name', user.name);
      formData.append('gender', user.gender);
      formData.append('email', user.email);
      formData.append('dateOfBirth', user.dateOfBirth);
      formData.append('mobileNumber', user.mobileNumber);
      formData.append('accountNumber', document.bankAccountDetails.accountNumber);
      formData.append('bankName', document.bankAccountDetails.bankName);
      formData.append('ifscCode', document.bankAccountDetails.ifscCode);
      formData.append('upi', document.bankAccountDetails.upi);
      formData.append('aadharNumber', document.aadhar.number);
      formData.append('panNumber', document.pan.number);
      formData.append('drivingLicenseNumber', document.drivingLicense.number);
      formData.append('drivingLicenseValidDate', document.drivingLicense.validDate);
      formData.append('rcNumber', document.rc.number);
      formData.append('vehicleType', document.vehicleType);

      console.log('FormData prepared:', formData);

      // API call
      const response = await axios.post(
        'http://13.203.102.172:5000/api/captains/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      console.log('Response from server:', response.data);
    }catch (error) {
      console.error('Error sending data to the backend:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    console.log('Proceeding to the homepage...');
    sendToBackend();
    navigation.navigate('HomeTabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Verification Status: {verificationStatus}</Text>
      {loading ? (
        <Text style={styles.header}>Loading...</Text>
      ) : (
        <>
          {verificationStatus === 'valid' && (
            <>
              <Text style={styles.header}>Congratulations!</Text>
              <Text style={styles.subHeader}>
                Your documents have been verified successfully.
              </Text>
              <Text>
                Now you are a member of{' '}
                <Text style={styles.brandName}>JUST TAP!</Text>
              </Text>
              <TouchableOpacity style={styles.button} onPress={handleProceed}>
                <Text style={styles.buttonText}>Proceed</Text>
              </TouchableOpacity>
            </>
          )}
          {verificationStatus === 'invalid' && (
            <>
              <Text style={styles.header}>Sorry, your documents are invalid.</Text>
              <Text style={styles.subHeader}>
                We are facing issues while validating your Documents. Please try again after 24 hours.
              </Text>
            </>
          )}
          {verificationStatus === 'processing' && (
            <>
              <Text style={styles.header}>Your documents are under review</Text>
              <Text style={styles.subHeader}>
                Thank you for choosing <Text style={styles.brandName}>Just Tap</Text>
              </Text>
              <View style={styles.noteContainer}>
                <Text style={styles.noteHeader}>Note:</Text>
                <Text style={styles.noteText}>
                  Once your documents are successfully verified, you are good to go for a ride!
                </Text>
                <Text style={styles.noteText}>
                  You will receive a notification once the verification is complete.
                </Text>
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    paddingTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F4A97',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  brandName: {
    fontSize: 20,
    fontFamily: 'SofadiOne',
    color: '#0F4A97',
  },
  noteContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 20,
    width: '100%',
    textAlign: 'left',
  },
  noteHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  noteText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default Processing;