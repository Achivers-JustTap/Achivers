import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MobileOTPScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSendingOTP, setIsSendingOTP] = useState(false); // Track OTP sending state

  const handleSendOTP = async () => {
    setIsSendingOTP(true); // Set sending state to show loading indicator

    try {
      const response = await fetch('http://3162-2406-7400-35-45c2-c79-36a5-5de2-25e5.ngrok-free.app/signup/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type for JSON data
        },
        body: JSON.stringify({ phoneNumber }), // Send phone number in request body
      });

      if (!response.ok) {
        throw new Error('Error sending OTP'); // Handle non-2xx responses
      }

      const data = await response.json();
      console.log('OTP sent successfully:', data);

      navigation.navigate('MobileOTPVerifyScreen', { phoneNumber }); // Pass phone number

    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.'); // Inform user about error
    } finally {
      setIsSendingOTP(false); // Reset sending state for UI updates
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button
        title={isSendingOTP ? 'Sending OTP...' : 'Send OTP'}
        onPress={handleSendOTP}
        disabled={isSendingOTP} // Disable button while sending
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});

export default MobileOTPScreen;