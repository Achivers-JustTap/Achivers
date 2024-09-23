import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as DocumentPicker from 'expo-document-picker';

const DriverLicense = ({ navigation }) => {
  const [LicenseNumber, setLicenseNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  useEffect(() => {
    console.log('DriverLicense component mounted');
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validateLicense = () => {
    if (!LicenseNumber.trim()) return 'Please enter your DL Number.';
    return null;
  };

  const handleTakeLicenseImage = () => {
    const validationError = validateLicense();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    console.log('Taking License image...');
    navigation.navigate('LicenseImageUpload');
  };

  const handleUploadFromFiles = async () => {
    const validationError = validateLicense();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        console.log('Selected file:', result);
        Alert.alert('File Selected', `File Name: ${result.name}`);
      } else {
        console.log('Document picker canceled');
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
    navigation.navigate('RC');
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = (date) => {
    setIsDatePickerVisible(false);
    if (date) {
      setDateOfBirth(date.toLocaleDateString());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upload Your Driver License</Text>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        
        <Text style={styles.tapText}>
          <Text style={styles.justTapText}>Just Tap!</Text>
          {' '}to enter your DL number and upload image
        </Text>
        
        <Text style={styles.label}>DL Number</Text>
        
        <TextInput
          style={styles.input}
          placeholder="DL00000000000"
          value={LicenseNumber}
          onChangeText={setLicenseNumber}
          keyboardType="default"
        />

        <Text style={{alignContent:'center',color:'white',fontSize:16}}>Date of Birth</Text>
        
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            style={styles.input}
            placeholder="Select Date of Birth"
            value={dateOfBirth || ''}
            editable={false}
          />
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={hideDatePicker}
          onCancel={() => setIsDatePickerVisible(false)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakeLicenseImage}>
          <Text style={styles.buttonText}>Driver License Image</Text>
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
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 5,
  },
  input: {
    width: '80%',  
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    color: 'black',
  },
  tapText: {
    color: 'white',
    padding: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  justTapText: {
    fontFamily: 'SofadiOne', 
    fontSize: 19,
    color: 'white', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
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

export default DriverLicense;
