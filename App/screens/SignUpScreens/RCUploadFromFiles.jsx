import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useRoute } from '@react-navigation/native';

const RCUploadFromFiles = ({ navigation }) => {
  const [rcFrontFile, setRcFrontFile] = useState(null);  // State for RC front file
  const [rcBackFile, setRcBackFile] = useState(null);    // State for RC back file
  
  const route = useRoute();
  const vehicleAltImage = route.params?.vehicleAltImage;
  const { profileImageBase64, name, email, phoneNumber, gender, dateOfBirth  } = route.params;

  const handleUploadFile = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'], // Restrict to PDF and images
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0]; // Get the selected file
        if (type === 'front') {
          setRcFrontFile(file);
        } else {
          setRcBackFile(file);
        }
      } else {
        console.log('Document picker canceled');
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  const proceedToNext = () => {
    if (!rcFrontFile || !rcBackFile) {
      Alert.alert('Error', 'Please upload both RC front and back files.');
      return;
    }

    // Navigate to the next screen with both files
    navigation.navigate('Processing', { rcFrontFile, rcBackFile,vehicleAltImage,name,email,gender,dateOfBirth,phoneNumber,profileImageBase64}); // Replace 'NextScreen' with the actual next screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Registration Certificate</Text>

      {/* Section for RC Front File Upload */}
      <View style={styles.section}>
        <Text style={styles.label}>RC Front</Text>
        {rcFrontFile ? (
          <Text style={styles.fileText}>{rcFrontFile.name}</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleUploadFile('front')}>
            <Text style={styles.buttonText}>Upload RC Front</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Section for RC Back File Upload */}
      <View style={styles.section}>
        <Text style={styles.label}>RC Back</Text>
        {rcBackFile ? (
          <Text style={styles.fileText}>{rcBackFile.name}</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleUploadFile('back')}>
            <Text style={styles.buttonText}>Upload RC Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Proceed button once both files are uploaded */}
      {rcFrontFile && rcBackFile && (
        <TouchableOpacity style={styles.proceedButton} onPress={proceedToNext}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  fileText: {
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  proceedButton: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
});

export default RCUploadFromFiles;
