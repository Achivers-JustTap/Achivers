import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Clipboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';

const BuddyRecharge = () => {
  const [linkCopied, setLinkCopied] = useState(false);
  const link = 'https://example.com/recharge'; // Replace with actual link

  const handleCopyLink = () => {
    Clipboard.setString(link);
    setLinkCopied(true);
    Alert.alert('Link copied', 'The recharge link has been copied to your clipboard.');
  };

  const handleShareLink = async () => {
    if (await Sharing.isAvailableAsync()) {
      try {
        await Sharing.shareAsync(link);
      } catch (error) {
        Alert.alert('Error', 'There was an issue while trying to share the link.');
      }
    } else {
      Alert.alert('Sharing not available', 'Sharing options are not available on this device.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request your Buddy to top up</Text>
      
      <View style={styles.linkContainer}>
        <Text style={styles.link}>{link}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
          <Ionicons name="copy" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {linkCopied && <Text style={styles.copyMessage}>Link copied!</Text>}

      <View style={styles.stepsContainer}>
        <Text style={styles.step}>1. Share the link with your buddy.</Text>
        <Text style={styles.step}>2. Ask your buddy to pay via that link.</Text>
        <Text style={styles.step}>3. You will receive a notification from Just Tap after successful payment.</Text>
      </View>

      <View style={styles.shareButtonContainer}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShareLink}>
          <Text style={styles.shareButtonText}>Share link to your buddy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BuddyRecharge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#ccc',
  },
  link: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  copyButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  copyMessage: {
    color: 'green',
    marginTop: 10,
    fontSize: 14,
  },
  stepsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  step: {
    fontSize: 16,
    marginBottom: 5,
  },
  shareButtonContainer: {
    marginTop: 20,
  },
  shareButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
