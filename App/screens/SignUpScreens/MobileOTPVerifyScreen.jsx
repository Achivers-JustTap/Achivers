import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { CaptainDataContext } from '../../Context/CaptainDataContext';


const MobileOTPVerifyScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const phoneNumber = useSelector((state) => state.user.mobileNumber);
  const mobileNumberExists = useSelector((state) => state.documents.mobileNumberExists); // Check if mobile number exists
  const { updateCaptainData } = useContext(CaptainDataContext); // Access the context
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch(`http://192.168.29.13:5000/api/captains//searchMobileNumber?mobileNumber=${phoneNumber}`);
      const result = await response.json();
        console.log("result",result)
      // const response = await fetch('http://192.168.0.126:5000/api/captains/verifyOTP', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json', 
      //   },
      //   body: JSON.stringify({ otp, phoneNumber }), 
      // });

      // if (!response.ok) {
      //   throw new Error('Error verifying OTP'); 
      // } 

      // const data = await response.json();
      // console.log('OTP verified successfully:', data);

      // if (data.success && mobileNumberExists)
        if (otp === '1234' && mobileNumberExists) {
          updateCaptainData(result.captain);
          console.log('OTP verified successfully:', result);
        navigation.navigate('HomeTabs'); // Navigate to home page
      } else {
        navigation.navigate('WhichVehicleScreen'); // Navigate to ProfileDetailsScreen if OTP is incorrect
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={{ color: 'white' }}>A verification code has been sent to {phoneNumber}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F4A97',
  },
  title: {
    color: 'white',
  },
  input: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    backgroundColor: 'white', 
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'black', 
    fontSize: 16,
  },
});

export default MobileOTPVerifyScreen;