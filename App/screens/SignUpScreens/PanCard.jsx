import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert, Image } from 'react-native';


const PanCard = ({ navigation }) => {
  const [panNumber, setPanNumber] = useState('');
  useEffect(() => {
    console.log('PanCard component mounted');
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validatePanNumber = () => {
    if (!panNumber.trim()) return 'Please enter your PAN Number.';
  };

  const handleTakePanImage = () => {
    const validationError = validatePanNumber();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    navigation.navigate('PanCardUpload',{panNumber});
  };

  const handleUploadFromFiles = () => {
    const validationError = validatePanNumber();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }
    navigation.navigate('PanCardUploadFromFile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upload PAN Card</Text>
      <Text style={styles.text}>Enter your PAN card number and we'll get the required information from the NSDL.</Text>
      
      <Image source={require('../../../assets/images/pancard.png')} style={styles.image} resizeMode="contain"/>
     


      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', padding: 20, justifyContent: 'center', alignItems: 'center',marginBottom: 3 }}>
          <Text style={{ color: 'white', fontSize: 19, fontFamily: 'SofadiOne' }}>Just Tap!</Text>
          {' '}to enter your PAN number and upload files
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter PAN Number"
          value={panNumber}
          onChangeText={setPanNumber}
          keyboardType="default"
        />
      </View>

      <View style={styles.buttonContainer}>
        {/* Button to Take PAN Image */}
        <TouchableOpacity style={styles.button} onPress={handleTakePanImage}>
          <Text style={styles.buttonText}>Take PAN Image</Text>
        </TouchableOpacity>

        {/* Button to Upload PAN from Files */}
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
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 200,
    backgroundColor: 'white',
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
