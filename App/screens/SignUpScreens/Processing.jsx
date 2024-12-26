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
  }, [navigation]);

  const fetchVerificationStatus = async () => {
    console.log("Fetching verification status...");
    setTimeout(() => {
      setVerificationStatus('valid'); // Change this to 'valid', 'invalid', or 'processing' to see different cases.
      setLoading(false);
    }, 2000);
  };

  // Move sendToBackend outside of the useEffect for better control
  const sendToBackend = async () => {
    setLoading(true);
    console.log('Sending data to the backend...');

    // Create a FormData object
    const formData = new FormData();
    console.log("Image Files ", document);
    // Append image files
    formData.append('profilePicture', {
      uri: document.profilePicture.uri,
      name: document.profilePicture.name,
      type: document.profilePicture.type,
    });
    console.log("Image 2 ", document);
    formData.append('aadharFront', {
      uri: document.aadhar.frontImage.uri,
      name: document.aadhar.frontImage.name,
      type: document.aadhar.frontImage.type,
    });
    formData.append('aadharBack', {
      uri: document.aadhar.backImage.uri,
      name: document.aadhar.backImage.name,
      type: document.aadhar.backImage.type,
    });
    formData.append('drivingLicenseFront', {
      uri: document.drivingLicense.frontImage.uri,
      name: document.drivingLicense.frontImage.name,
      type: document.drivingLicense.frontImage.type,
    });
    formData.append('drivingLicenseBack', {
      uri: document.drivingLicense.backImage.uri,
      name: document.drivingLicense.backImage.name,
      type: document.drivingLicense.backImage.type,
    });
    formData.append('panFront', {
      uri: document.pan.frontImage.uri,
      name: document.pan.frontImage.name,
      type: document.pan.frontImage.type,
    });
    formData.append('panBack', {
      uri: document.pan.backImage.uri,
      name: document.pan.backImage.name,
      type: document.pan.backImage.type,
    });
    formData.append('rcFront', {
      uri: document.rc.frontImage.uri,
      name: document.rc.frontImage.name,
      type: document.rc.frontImage.type,
    });
    formData.append('rcBack', {
      uri: document.rc.backImage.uri,
      name: document.rc.backImage.name,
      type: document.rc.backImage.type,
    });

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
    console.log("formData ", formData);

    try {
      const response = await axios.post('http://192.168.0.101:5000/api/captains/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    } finally {
      setLoading(false);
    }
    console.log('Data sent to the backend.');
  };

  useEffect(() => {
    console.log("verificationStatus before fetch:", verificationStatus);
    fetchVerificationStatus();
  }, []);


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
