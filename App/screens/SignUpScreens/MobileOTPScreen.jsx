import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MobileOTPScreen = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSendingOTP, setIsSendingOTP] = useState(false); 
  
  const vehicleAltImage = route.params?.vehicleAltImage;
  const {selectedVehicleType: selectedVehicleName } = route.params;


  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validatePhoneNumber = () => {
    return phoneNumber.trim() !== '';
  };

  const handleSendOTP = async () => {
    if (!validatePhoneNumber()) {
      Alert.alert('Error', 'Mobile number is required.');
      return;
    }

    setIsSendingOTP(true);
   /* try {
      const response = await fetch('https://6ab8-2405-201-c425-3854-a936-1e27-553c-27bf.ngrok-free.app/signup/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!response.ok) {
        throw new Error('Error sending OTP');
      } 

      const data = await response.json(); 
      console.log('OTP sent successfully:', data);*/

      navigation.navigate('MobileOTPVerifyScreen', { phoneNumber, isRegister: route.params.isRegister,vehicleAltImage,selectedVehicleType: selectedVehicleName });

  /* } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsSendingOTP(false);
    } */
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter Your Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity
        style={[styles.button, isSendingOTP && styles.disabledButton]}
        onPress={handleSendOTP}
        disabled={isSendingOTP}
      >
        <Text style={styles.buttonText}>
          {isSendingOTP ? 'Sending OTP...' : 'Send OTP'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MobileOTPScreen;
