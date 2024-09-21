import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

const AadharUpload = ({ navigation, route }) => {
  const { name } = route.params;
  const [aadharNumber, setAadharNumber] = useState('');

  useEffect(() => {
    console.log('AadharUpload component mounted');
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleTakeAadharImage = () => {
    // Implement functionality to take Aadhar image
    console.log('Taking Aadhar image...');
    navigation.navigate('AadharImageUpload', { name });
  };

  const handleUploadFromFiles = () => {
    // Implement functionality to upload from files
    console.log('Uploading Aadhar from files...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{name}, you moved to the next step in registration</Text>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', padding: 20, marginBottom: 10 }}>
          <Text style={{ color: 'white', fontSize: 19, fontFamily: 'SofadiOne' }}>Just Tap!</Text>
          {' '}to enter your Aadhar number and upload image
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Aadhar Number"
          value={aadharNumber}
          onChangeText={setAadharNumber}
          keyboardType="numeric" // To restrict input to numbers
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakeAadharImage}>
          <Text style={styles.buttonText}>Take Aadhar Image</Text>
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
    marginBottom: 20, // Adjust the margin as needed
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

export default AadharUpload;
