import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const AadharUploadFromFile = ({ navigation }) => {
  const [aadharFrontFile, setAadharFrontFile] = useState(null);  // State for Aadhar front file
  const [aadharBackFile, setAadharBackFile] = useState(null);   // State for Aadhar back file

  const handleUploadFile = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],  // Restrict to PDF and images
        copyToCacheDirectory: true,
      });
      console.log(" Result ", result)
      if (!result.canceled) {
        console.log(" Result inside if ", result)
        const file = result.assets[0];  // Get the selected file
        if (type === 'front') {
          setAadharFrontFile(file);
        } else {
          setAadharBackFile(file);
        }
      } else {
        console.log('Document picker canceled');
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  const proceedToNext = () => {
    if (!aadharFrontFile || !aadharBackFile) {
      Alert.alert('Error', 'Please upload both Aadhar front and back files.');
      return;
    }

    // Navigate to the next screen with both files
    navigation.navigate('PanCard', { aadharFrontFile, aadharBackFile });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Aadhar Card</Text>

      {/* Section for Aadhar Front File Upload */}
      <View style={styles.section}>
        <Text style={styles.label}>Aadhar Front</Text>
        {aadharFrontFile ? (
          <Text style={styles.fileText}>{aadharFrontFile.name}</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleUploadFile('front')}>
            <Text style={styles.buttonText}>Upload Aadhar Front</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Section for Aadhar Back File Upload */}
      <View style={styles.section}>
        <Text style={styles.label}>Aadhar Back</Text>
        {aadharBackFile ? (
          <Text style={styles.fileText}>{aadharBackFile.name}</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleUploadFile('back')}>
            <Text style={styles.buttonText}>Upload Aadhar Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Proceed button once both files are uploaded */}
      {aadharFrontFile && aadharBackFile && (
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

export default AadharUploadFromFile;
