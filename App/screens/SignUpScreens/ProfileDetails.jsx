import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

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

  const validateFields = () => {
    if (!name.trim()) return 'Please enter your name.';
    if (!email.trim()) return 'Please enter your email.';
    if (!gender) return 'Please select your gender.';
    if (!dateOfBirth) return 'Please select your date of birth.';
    return null; 
  };

  const handleNext = () => {
    const validationError = validateFields();
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }

    console.log('Profile details:', { name, email, gender, dateOfBirth, phoneNumber });
    navigation.navigate('TakeSelfie', { name });
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = (date) => {
    setIsDatePickerVisible(false);
    if (date) {
      setDateOfBirth(date.toLocaleDateString());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter Profile Details</Text>
      
      {/* Name Input */}
      <TextInput 
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Gender Dropdown */}
      <View style={styles.input}>
        <Picker
          selectedValue={gender}
          style={styles.picker} // Adjust the picker style
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* Date of Birth Picker */}
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Select Date of Birth"
          value={dateOfBirth || ''}
          editable={false}
        />
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={hideDatePicker}
        onCancel={hideDatePicker}
      />

      {/* Next Button */}
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
    color: 'white',
  },
  input: {
    color: 'black',
    width: '80%',
    height: 40, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10, 
    marginBottom: 15,
    backgroundColor: 'white',
    justifyContent: 'center',  
  },
  picker: {
    width: '100%',  
    height: 40,     
    color: 'black',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ProfileDetailsScreen;
