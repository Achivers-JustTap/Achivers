import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Clipboard, Animated, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';

const BuddyRecharge = () => {
  const [linkCopied, setLinkCopied] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); 
  const link = 'https://example.com/recharge'; // Your recharge link

  const handleCopyLink = () => {
    Clipboard.setString(link);
    setLinkCopied(true);
    Alert.alert('Link copied', 'The recharge link has been copied to your clipboard.');
  };

  const handleShareLink = async () => {
    try {
      const result = await Share.share({
        message: `Click here to top up your account: ${link}`, // Using the dynamic link
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }; 

  const fadeInSteps = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeInSteps();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Your Buddy To Top Up</Text>

      <View style={styles.linkContainer}>
        <Text style={styles.link}>{link}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
          <Ionicons name="copy" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {linkCopied && <Text style={styles.copyMessage}>Link copied!</Text>}

      <Animated.View style={[styles.stepsContainer, { opacity: fadeAnim }]}>
        <View style={styles.step}>
          <View style={styles.stepIconContainer}>
            <Ionicons name="link" size={24} color="#fff" />
          </View>
          <Text style={styles.stepText}>Share the link with your buddy.</Text>
        </View>

        <View style={styles.step}>
          <View style={styles.stepIconContainer}>
            <Ionicons name="cash" size={24} color="#fff" />
          </View>
          <Text style={styles.stepText}>Ask your buddy to pay via that link.</Text>
        </View>

        <View style={styles.step}>
          <View style={styles.stepIconContainer}>
            <Ionicons name="notifications" size={24} color="#fff" />
          </View>
          <Text style={styles.stepText}>You will receive a notification from Just Tap after successful payment.</Text>
        </View>
      </Animated.View>

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
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0F4A97',
    fontFamily: 'Roboto',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  link: {
    flex: 1,
    color: '#333',
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  copyButton: {
    backgroundColor: '#0F4A97',
    padding: 12,
    borderRadius: 50,
    elevation: 5,
  },
  copyMessage: {
    color: 'green',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  stepsContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  stepIconContainer: {
    backgroundColor: '#0F4A97',
    padding: 12,
    borderRadius: 50,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto',
    flex: 1,
  },
  shareButtonContainer: {
    marginTop: 20,
  },
  shareButton: {
    backgroundColor: '#0F4A97',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});
