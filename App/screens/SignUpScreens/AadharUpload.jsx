import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { setAadharDetails } from './store_management/actions/documentActions';
const AadharUpload = ({ navigation }) => {
  const [aadharNumber, setAadharNumber] = useState('');
  const name = useSelector(state => state.user.name);
  const number = useSelector(state => state.documents.aadhar);
  
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validateAadharNumber = () => {
    if (!/^\d{12}$/.test(aadharNumber)) return 'Aadhaar number must be exactly 12 digits.';
    return null;
  };

  const handleTakeAadharImage = () => {
    const validationError = validateAadharNumber();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    navigation.navigate('AadharImageUpload',{aadharNumber});
  };

  const handleUploadFromFiles = () => {
    const validationError = validateAadharNumber();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    navigation.navigate('AadharUploadFromFile',{aadharNumber});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{name}, you moved to the next step in registration</Text>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text}>Enter your Aadhaar and we'll get your information from UIDAI.
           By sharing your Aadhaar details, you hereby confirm that you have shared such details voluntarily.</Text>
        <Image source={require('../../../assets/images/aadhar.png')} style={styles.image} resizeMode="contain"/>

        <Text style={styles.justTapText}>
          <Text style={styles.justTapFont}>Just Tap!</Text>
          {' '}to enter your Aadhar number and upload files
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Aadhar Number"
          value={aadharNumber}
          onChangeText={setAadharNumber}
          keyboardType="numeric"
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
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    padding: 10,
    fontSize: 15,
  },
  image: {
    width: 250,
    height: 200,
  },
  justTapText: {
    color: 'white',
    padding: 20,
    marginBottom: 5, 
  },
  justTapFont: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'SofadiOne',
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
    marginBottom: 90,
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
    marginBottom: 30,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AadharUpload;
