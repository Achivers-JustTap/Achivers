import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setMobileNumber } from './store_management/actions/userActions';

const MobileOTPScreen = ({ navigation, route }) => {
  const { vehicleAltImage, selectedVehicleType } = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validatePhoneNumber = () => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const handleSendOTP = async () => {
    if (!validatePhoneNumber()) {
      Alert.alert('Error', 'Mobile number is required and it must be 10 digits long.');
      return;
    }

    setIsSendingOTP(true);

    try {
      const response = await fetch('http://13.233.146.206:5000/api/captains/searchMobileNumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber: phoneNumber }),
      });
      console.log("response",response);

      if (!response.ok) {
        throw new Error('Error checking mobile number');
      }

      const data = await response.json();
      console.log("data",data);
      if (data.exists) {
        Alert.alert('Error', 'This mobile number is already registered.');
        setIsSendingOTP(false);
        return;
      }

      // Mobile number doesn't exist, proceed with OTP verification
      dispatch(setMobileNumber(phoneNumber));

      navigation.navigate('MobileOTPVerifyScreen', {
        isRegister: route.params.isRegister,
        vehicleAltImage,
        selectedVehicleType,
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setIsSendingOTP(false);
    }
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