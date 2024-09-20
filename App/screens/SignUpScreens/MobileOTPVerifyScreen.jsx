import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const MobileOTPVerifyScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState('');
  const { phoneNumber } = route.params; // Extract phone number from params

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('https://38f5-2405-201-c425-3854-d847-da6f-e1c-b4e9.ngrok-free.app/signup/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type for JSON data
        },
        body: JSON.stringify({ otp }), // Send OTP in request body
      });

      if (!response.ok) {
        throw new Error('Error verifying OTP'); // Handle non-2xx responses
      }

      const data = await response.json();
      console.log('OTP verified successfully:', data);

      // Handle successful verification (navigate to Profile Details)
      navigation.navigate('ProfileDetailsScreen', { phoneNumber }); // Pass phone number

    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.'); // Inform user about error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={{color:'white'}}>A verification code has been sent to {phoneNumber}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F4A97',
  },
  title:{
    color:'white'
  },
  input:{
    color: 'white'
  },
  button: {
    backgroundColor: 'white', // Button background color
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'black', // Button text color
    fontSize: 16,
  },
});

export default MobileOTPVerifyScreen;
