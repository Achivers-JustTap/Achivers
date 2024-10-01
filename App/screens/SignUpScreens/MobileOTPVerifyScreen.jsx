import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const MobileOTPVerifyScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState('');
  const { phoneNumber, isRegister } = route.params; 
  
  const vehicleImage = route.params?.vehicleImage;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

    const handleVerifyOTP = async () => {
    /* try {
      const response = await fetch('https://6ab8-2405-201-c425-3854-a936-1e27-553c-27bf.ngrok-free.app/signup/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ otp }), 
      });
      if (!response.ok) {
        throw new Error('Error verifying OTP'); 
      }

      const data = await response.json();
      console.log('OTP verified successfully:', data);*/

      
      if (isRegister) {
        
        navigation.navigate('ProfileDetailsScreen', { phoneNumber,vehicleImage });
      } else {
       
        navigation.navigate('HomeTabs',);
      }

   /* } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.'); 
    }*/
  };

  return (
    <SafeAreaView style={styles.container}>
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
  title:{
    color:'white'
  },
  input:{
    color: 'white'
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
