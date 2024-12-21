import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert, Image, Keyboard } from 'react-native';

const PanCard = ({route, navigation }) => {
  const [panNumber, setPanNumber] = useState('');
  const [isPanValid, setIsPanValid] = useState(false);
  const vehicleAltImage = route.params?.vehicleAltImage;

  const {
    profileImageBase64,
    name,
    email,
    phoneNumber,
    gender,
    dateOfBirth,
    aadharFrontFile,
    aadharBackFile,
    aadharNumber,
    aadharFront,
    aadharBack,
    selectedVehicleType: selectedVehicleName,
  } = route.params;

  useEffect(() => {
    console.log('PanCard component mounted');
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validatePanNumber = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handlePanChange = (text) => {
    setPanNumber(text.toUpperCase());
    setIsPanValid(validatePanNumber(text.toUpperCase()));
  };

  const handleGoPress = () => {
    if (!isPanValid) {
      Alert.alert('Invalid PAN', 'Please enter a valid PAN number in the format AAAAA9999A.');
      return;
    }
    Keyboard.dismiss();
        Alert.alert('Success', 'PAN Number is valid!');
  };

  const handleTakePanImage = () => {
    if (!isPanValid) {
      Alert.alert('Error', 'Please enter a valid PAN Number.');
      return;
    }
    navigation.navigate('PanCardUpload', {
      selectedVehicleType: selectedVehicleName,
      panNumber,
      vehicleAltImage,
      name,
      email,
      gender,
      dateOfBirth,
      phoneNumber,
      profileImageBase64,
      aadharNumber,
      aadharFront,
      aadharBack,
      aadharFrontFile,
      aadharBackFile,
    });
  };

  const handleUploadFromFiles = () => {
    if (!isPanValid) {
      Alert.alert('Error', 'Please enter a valid PAN Number.');
      return;
    }
    navigation.navigate('PanCardUploadFromFile', {
      selectedVehicleType: selectedVehicleName,
      panNumber,
      vehicleAltImage,
      name,
      email,
      gender,
      dateOfBirth,
      phoneNumber,
      profileImageBase64,
      aadharNumber,
      aadharFront,
      aadharBack,
      aadharFrontFile,
      aadharBackFile,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upload PAN Card</Text>
      <Text style={styles.text}>
        Enter your PAN card number and we'll get the required information from the NSDL.
      </Text>

      <Image source={require('../../../assets/images/pancard.png')} style={styles.image} resizeMode="contain" />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter PAN Number"
          value={panNumber}
          onChangeText={handlePanChange}
          keyboardType="default"
          maxLength={10}
        />
        <TouchableOpacity
          style={[styles.goButton, isPanValid && styles.goButtonActive]}
          onPress={handleGoPress}
        >
          <Text style={styles.goButtonText}>Go</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakePanImage}>
          <Text style={styles.buttonText}>Take PAN Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUploadFromFiles}>
          <Text style={styles.buttonText}>Upload from Files</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
  },
  title: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    padding: 10,
    fontSize: 15,
  },
  image: {
    width: 400,
    height: 270,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  goButton: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  goButtonActive: {
    backgroundColor: 'yellow',
  },
  goButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 50,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PanCard;
