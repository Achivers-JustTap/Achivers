import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker'; 

const ProfileDetailsScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date()); // Initialize with current date
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const { phoneNumber } = route.params; // Extract phone number from params

  const handleNext = async () => {
    // Implement logic to submit profile details (e.g., backend API call)
    console.log('Profile details:', { name, email, gender, dateOfBirth, phoneNumber }); // Log for demonstration

    // Handle successful submission (e.g., navigate to next screen or show success message)
    navigation.navigate('ProfileImageScreen');
  };
  


  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };


  const hideDatePicker = (date) => {
    setIsDatePickerVisible(false);
    setDateOfBirth(date); // Set the selected date to the state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Profile Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Gender"
        value={gender}
        onChangeText={setGender}
      />
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Select Date of Birth"
          value={dateOfBirth.toLocaleDateString()} // Display selected date
          editable={false}
          onPress={showDatePicker}
        />
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={hideDatePicker}
        onCancel={hideDatePicker}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {


    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default ProfileDetailsScreen;