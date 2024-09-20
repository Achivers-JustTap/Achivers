import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const MobileOTPScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSendingOTP, setIsSendingOTP] = useState(false); // Track OTP sending state

  const handleSendOTP = async () => {
    setIsSendingOTP(true); // Set sending state to show loading indicator

    try {
      const response = await fetch('https://38f5-2405-201-c425-3854-d847-da6f-e1c-b4e9.ngrok-free.app/signup/signup', {
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
      
      {/* Custom TouchableOpacity button */}
      <TouchableOpacity
        style={[styles.button, isSendingOTP && styles.disabledButton]} // Apply disabled style when sending OTP
        onPress={handleSendOTP}
        disabled={isSendingOTP} // Disable button while sending
      >
        <Text style={styles.buttonText}>
          {isSendingOTP ? 'Sending OTP...' : 'Send OTP'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0F4A97',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'white', // Button background color
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray', // Button color when disabled
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MobileOTPScreen;
