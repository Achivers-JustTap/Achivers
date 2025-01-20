import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';


const LicenseFileChange = ({ navigation,route }) => {
  const [licenseFrontFile, setLicenseFrontFile] = useState(null); 
  const [licenseBackFile, setLicenseBackFile] = useState(null);   

  

  const handleUploadFile = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'], 
        copyToCacheDirectory: true,
      });
      
      console.log("Result: ", result);
      
      if (!result.canceled) {
        const file = result.assets[0]; 
        if (type === 'front') {
          setLicenseFrontFile(file);
        } else {
          setLicenseBackFile(file);
        }
      } else {
        console.log('Document picker canceled');
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  const proceedToNext = () => {
    if (!licenseFrontFile || !licenseBackFile) {
      Alert.alert('Error', 'Please upload both Driving License front and back files.');
      return;
    }

    navigation.navigate('DriverLicence_list', {licenseFrontFile,licenseBackFile,licenseNumber, validTillDate, uploadSuccess: true,}); 
 };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Driving License</Text>


      <View style={styles.section}>
        <Text style={styles.label}>License Front</Text>
        {licenseFrontFile ? (
          <Text style={styles.fileText}>{licenseFrontFile.name}</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleUploadFile('front')}>
            <Text style={styles.buttonText}>Upload License Front</Text>
          </TouchableOpacity>
        )}
      </View>


      <View style={styles.section}>
        <Text style={styles.label}>License Back</Text>
        {licenseBackFile ? (
          <Text style={styles.fileText}>{licenseBackFile.name}</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleUploadFile('back')}>
            <Text style={styles.buttonText}>Upload License Back</Text>
          </TouchableOpacity>
        )}
      </View>

    
      {licenseFrontFile && licenseBackFile && (
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

export default LicenseFileChange;
