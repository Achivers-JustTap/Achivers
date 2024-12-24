import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setBankAccountDetails } from './store_management/actions/documentActions';

const BankDetailsScreen = ({ navigation }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [upi, setUpi] = useState('');

  const dispatch = useDispatch();

  const handleNext = () => {
    if (!accountNumber || !bankName || !ifscCode) {
      alert('Please fill all required fields!');
      return;
    }

    // Dispatch the details to Redux
    dispatch(setBankAccountDetails({ accountNumber, bankName, ifscCode, upi }));

    // Navigate to the processing screen
    navigation.navigate('Processing');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bank Account Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Account Number"
        keyboardType="numeric"
        value={accountNumber}
        onChangeText={setAccountNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Bank Name"
        value={bankName}
        onChangeText={setBankName}
      />

      <TextInput
        style={styles.input}
        placeholder="IFSC Code"
        value={ifscCode}
        onChangeText={setIfscCode}
      />

      <TextInput
        style={styles.input}
        placeholder="UPI ID (Optional)"
        value={upi}
        onChangeText={setUpi}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BankDetailsScreen;
