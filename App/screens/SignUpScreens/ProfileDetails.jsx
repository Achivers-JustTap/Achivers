import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store_management/actions/userActions';

const ProfileDetailsScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); 
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const dispatch = useDispatch();

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
    
    dispatch(setUserDetails(name, email, gender, dateOfBirth));
    navigation.navigate('TakeSelfie');
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = (date) => {
    setIsDatePickerVisible(false);
    if (date) {
      setDateOfBirth(date.toLocaleDateString()); // Store date in a readable format
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter Profile Details</Text>
      
      {/* Name Input */}
      <TextInput 
        style={styles.input}
        placeholder="Enter Full Name"
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

      {/* Gender Radio Buttons */}
      <View style={styles.radioGroup}>
        <Text style={styles.radioLabel}>Select Your Gender</Text>
        <View style={styles.radioButtonsRow}>
          {['Male', 'Female', 'Other'].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.radioButton}
              onPress={() => setGender(item)}
            >
              <View style={[styles.radioCircle, gender === item && styles.selectedCircle]}>
                {gender === item && <View style={styles.selectedDot} />}
              </View>
              <Text style={[styles.radioButtonText, gender === item && styles.selectedText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    height: 45, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15, 
    marginBottom: 15,
    backgroundColor: 'white',
    justifyContent: 'center',  
  },
  radioGroup: {
    width: '80%',
    marginBottom: 15,
  },
  radioLabel: {
    color: 'white',
    marginBottom: 10,
  },
  radioButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space the buttons evenly in the row
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
  },
  selectedCircle: {
    borderColor: 'white',
    backgroundColor: 'white', // Selected circle becomes white
  },
  selectedDot: {
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor:'#0F4A97', 
    marginLeft: -1,
    marginTop: -0.6
  },
  radioButtonText: {
    color: 'white',
    fontSize: 16,
  },
  selectedText: {
    color: 'white', 
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
