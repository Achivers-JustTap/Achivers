import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MobileOTPVerifyScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState('');
  const { phoneNumber } = route.params; // Extract phone number from params

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('https://0ae9-2405-201-c425-3854-896a-1718-3788-6c64.ngrok-free.app/signup/signup', {
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
      <Text>A verification code has been sent to {phoneNumber}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default MobileOTPVerifyScreen;