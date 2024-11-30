import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setBankAccountDetails } from '../store_management/actions/bankDetailsActions'; // Import your bank account actions

const BankDetailsScreen = ({navigation}) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [upi, setUpi] = useState('');

  const dispatch = useDispatch();

  const handleNext = () => {
    // Validate input fields here
    if (!accountNumber || !ifscCode || !bankName || !upi) {
      alert('Please fill in all required fields');
      return;
    }

    // Dispatch action to update Redux store
    dispatch(setBankAccountDetails({ accountNumber, ifscCode, bankName, upi }));

    // Navigate to the next screen
    navigation.navigate('VehicleTypeScreen'); // Replace with the actual name of your next screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Bank Account Details</Text>
      <TextInput
        style={[styles.input, styles.centeredInput]}
        placeholder="Enter Account Number"
        value={accountNumber}
        onChangeText={setAccountNumber}
      />
      <TextInput
        style={[styles.input, styles.centeredInput]}
        placeholder="Enter IFSC Code"
        value={ifscCode}
        onChangeText={setIfscCode}
      />
      <TextInput
        style={[styles.input, styles.centeredInput]}
        placeholder="Enter Bank Name"
        value={bankName}
        onChangeText={setBankName}
      />
      <TextInput
        style={[styles.input, styles.centeredInput]}
        placeholder="Enter UPI ID"
        value={upi}
        onChangeText={setUpi}
      />
      <Button title="Next" onPress={handleNext} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light gray background for better readability
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  centeredInput: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0F4A97', // Change the color to the specified value
    padding: 15,
    borderRadius: 10, // Add rounded corners
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BankDetailsScreen;