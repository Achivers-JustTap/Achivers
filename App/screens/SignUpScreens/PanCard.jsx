import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';

const PanCard = ({ navigation }) => {
  const [PanNumber, setPanNumber] = useState('');

  useEffect(() => {
    console.log('Pan Card component mounted');
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validatePAN = () => {
    if (!PanNumber.trim()) return 'Please enter your PAN Number.';
    return null;
  };

  const handleTakePanCardImage = () => {
    const validationError = validatePAN();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    console.log('Taking PAN image...');
    navigation.navigate('PanCardUpload');
  };

  const handleUploadFromFiles = async () => {
    const validationError = validatePAN();
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
    navigation.navigate('DriverLicense');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pan Card Upload</Text>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', padding: 20, marginBottom: 10 }}>
          <Text style={{ color: 'white', fontSize: 19, fontFamily: 'SofadiOne' }}>Just Tap!</Text>
          {' '}to enter your PanCard number and upload image
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter PAN Number"
          value={PanNumber}
          onChangeText={setPanNumber}
          keyboardType="default" 
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakePanCardImage}>
          <Text style={styles.buttonText}>PAN Image</Text>
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

export default PanCard;
