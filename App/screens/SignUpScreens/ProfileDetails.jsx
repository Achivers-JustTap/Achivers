import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

const ProfileDetailsScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const { phoneNumber } = route.params;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleNext = async () => {
    // Implement logic to submit profile details (e.g., backend API call)
    console.log('Profile details:', { name, email, gender, dateOfBirth, phoneNumber });

    // Handle successful submission (e.g., navigate to next screen or show success message)
    navigation.navigate('TakeSelfie', { name: name });
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = (date) => {
    setIsDatePickerVisible(false);
    if (date) {
      setDateOfBirth(date);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter Profile Details</Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Gender"
        value={gender}
        onChangeText={(text) => setGender(text)}
      />
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Select Date of Birth"
          value={dateOfBirth.toLocaleDateString()}
          editable={false}
        />
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={hideDatePicker}
        onCancel={hideDatePicker}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0F4A97',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white'
  },
  input: {
    color:'black',
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor:'white'
  },
  button: {
    backgroundColor: 'white', // Button background color
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center', // Center the text inside the button
  },
  buttonText: {
    color: 'black', // Button text color
    fontSize: 16,
  },
});

export default ProfileDetailsScreen;