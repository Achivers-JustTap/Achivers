import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

const AadharUpload = ({ navigation, route }) => {
  const [aadharNumber, setAadharNumber] = useState('');

  const vehicleAltImage = route.params?.vehicleAltImage;
  const {
    profileImageBase64,
    name,
    email,
    phoneNumber,
    gender,
    dateOfBirth,
    selectedVehicleType: selectedVehicleName,
  } = route.params;

  useEffect(() => {
    console.log('AadharUpload component mounted');
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validateAadharNumber = () => {
    if (aadharNumber.length !== 12) return 'Please enter a valid 12-digit Aadhar Number.';
  };

  const handleGoPress = () => {
    const validationError = validateAadharNumber();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    Keyboard.dismiss();
    Alert.alert('Success', 'Aadhar Number is valid!');
  };

  const handleTakeAadharImage = () => {
    const validationError = validateAadharNumber();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    navigation.navigate('AadharImageUpload', {
      name,
      email,
      gender,
      dateOfBirth,
      vehicleAltImage,
      phoneNumber,
      profileImageBase64,
      aadharNumber,
      selectedVehicleType: selectedVehicleName,
    });
  };

  const handleUploadFromFiles = () => {
    const validationError = validateAadharNumber();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    navigation.navigate('AadharUploadFromFile', {
      name,
      email,
      gender,
      dateOfBirth,
      vehicleAltImage,
      phoneNumber,
      profileImageBase64,
      aadharNumber,
      selectedVehicleType: selectedVehicleName,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.title}>
            {name}, you moved to the next step in registration
          </Text>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}>
              Enter your Aadhaar and we'll get your information from UIDAI. By sharing your Aadhaar
              details, you hereby confirm that you have shared such details voluntarily.
            </Text>
            <Image
              source={require('../../../assets/images/aadhar.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.justTapText}>
              <Text style={styles.justTapFont}>Just Tap!</Text> to enter your Aadhar number and
              upload files
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Aadhar Number"
                value={aadharNumber}
                onChangeText={setAadharNumber}
                keyboardType="numeric"
                maxLength={12}
              />
              <TouchableOpacity
                style={[
                  styles.goButton,
                  { backgroundColor: aadharNumber.length === 12 ? 'yellow' : 'grey' },
                ]}
                onPress={handleGoPress}
                disabled={aadharNumber.length !== 12}
              >
                <Text style={styles.goButtonText}>Go</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleTakeAadharImage}>
              <Text style={styles.buttonText}>Take Aadhar Image</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleUploadFromFiles}>
              <Text style={styles.buttonText}>Upload from Files</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 200,
    marginBottom: 20,
  },
  justTapText: {
    color: 'white',
    padding: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  justTapFont: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'SofadiOne',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 90,
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
    marginRight: 10,
  },
  goButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  goButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',     
    width: '100%',          
    marginBottom: 20,
    gap: 10,                  
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    flex: 0.45,             
    alignItems: 'center',     
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AadharUpload;
