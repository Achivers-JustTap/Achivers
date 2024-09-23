import React from 'react';
import { useFonts } from 'expo-font';
import { View, Text, StyleSheet } from 'react-native';

const Processing = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your documents are under review</Text>
      <Text style={styles.subHeader}>Thank you for choosing <Text style={styles.brandName}>Just Tap</Text></Text>

      <View style={styles.noteContainer}>
        <Text style={styles.noteHeader}>Note:</Text>
        <Text style={styles.noteText}>
          Once your documents are successfully verified, you are good to go for a ride!
        </Text>
        <Text style={styles.noteText}>
          You will receive a notification once the verification is complete.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },
  brandName: {
    fontSize: 25,
    fontFamily: 'SofadiOne',
    color: '#0F4A97',
    //textDecorationLine: 'underline',  // Apply unique style to Just Tap
  },
  noteContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 20,
    width: '100%',
    textAlign: 'left',
  },
  noteHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  noteText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default Processing;
