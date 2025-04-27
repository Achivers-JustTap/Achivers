import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Alert, 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import React, { useEffect, useState } from 'react';

const RcNumber = ({ navigation }) => {
  const [RC, setRcNumber] = useState('');
  const [isGoButtonEnabled, setIsGoButtonEnabled] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const validateRC = (text) => {
    const regex = /^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/;
    setIsGoButtonEnabled(regex.test(text));
  };

  const handleGoButtonPress = () => {
    if (!isGoButtonEnabled) {
      Alert.alert('Error', 'Please enter a valid RC Number.');
      return;
    }
    Keyboard.dismiss();
    Alert.alert('Success', 'Vehicle Number is valid!');
  };

  const handleChange = (text) => {
    const upperCaseText = text.toUpperCase();
    setRcNumber(upperCaseText);
    validateRC(upperCaseText);
  };

  const handleTakeRCImage = () => {
    if (!isGoButtonEnabled) {
      Alert.alert('Error', 'Please enter a valid RC Number.');
      return;
    }
    navigation.navigate('RCUpload', { RC });
  };

  const handleUploadFromFiles = () => {
    if (!isGoButtonEnabled) {
      Alert.alert('Error', 'Please enter a valid RC Number.');
      return;
    }
    navigation.navigate('RCUploadFromFiles', { RC });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Upload Your RC-Registration Certificate</Text>

          <Text style={styles.text}>
            Enter your vehicle number plate and date of birth, and we'll get the required information from the Parivahan.
          </Text>

          <View style={styles.inputArea}>
            <Text style={styles.subText}>
              <Text style={{ fontFamily: 'SofadiOne', fontSize: 20 }}>Just Tap!</Text> to enter your RC Number and upload image
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Vehicle Number Plate"
                placeholderTextColor="#aaa"
                value={RC}
                onChangeText={handleChange}
                keyboardType="default"
                maxLength={10}
              />
              <TouchableOpacity
                style={[styles.goButton, { backgroundColor: isGoButtonEnabled ? 'yellow' : 'gray' }]}
                disabled={!isGoButtonEnabled}
                onPress={handleGoButtonPress}
              >
                <Text style={styles.goButtonText}>Go</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Buttons always fixed at bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleTakeRCImage}>
            <Text style={styles.buttonText}>Take RC Image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleUploadFromFiles}>
            <Text style={styles.buttonText}>Upload from Files</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F4A97',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputArea: {
    alignItems: 'center',
  },
  subText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '70%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  goButton: {
    width: '20%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 10,
  },
  goButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    backgroundColor: '#0F4A97',
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RcNumber;
