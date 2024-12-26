import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const Guidelines = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../../../../../../assets/images/guidelinestop2.png')}
          style={styles.topImage}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>

        <Text style={styles.titleText}>
          Elevate your game by following these best practices and earn more rides!
        </Text>

        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>🧑‍💼 Professional Conduct</Text>
          <Text style={styles.listItem}>• Speak courteously and respectfully to all customers.</Text>
          <Text style={styles.listItem}>• Always provide exact change and avoid requesting extra payment.</Text>
          <Text style={styles.listItem}>• Respect the customer's payment choice, whether online or cash.</Text>
          <Text style={styles.listItem}>• Limit contact with customers to ride-related matters only.</Text>

          <Text style={styles.sectionTitle}>🚦 Safe Driving Practices</Text>
          <Text style={styles.listItem}>• Obey all traffic rules and maintain safe speeds.</Text>
          <Text style={styles.listItem}>• Ensure timely arrival at pickup points and accurate drop-offs.</Text>
          <Text style={styles.listItem}>• Follow GPS directions provided in the app for a seamless experience.</Text>

          <Text style={styles.sectionTitle}>🧼 Cleanliness & Presentation</Text>
          <Text style={styles.listItem}>• Maintain a clean vehicle and present yourself well.</Text>
          <Text style={styles.listItem}>• Keep your vehicle tidy for every ride.</Text>
          <Text style={styles.listItem}>• A fresh and professional appearance leaves a lasting impression.</Text>
        </View>

        <Text style={styles.noteText}>
          ⚠️ **Note:** Failure to follow these guidelines may lead to account deactivation.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
    backgroundColor: '#f5f5f5',
  },
  topImage: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 20,
  },
  overlayText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
    borderRadius: 10,
  },
  titleText: {
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#0A6BFF',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 12,
    paddingLeft: 10,
    color: '#555',
    lineHeight: 22,
  },
  noteText: {
    padding: 20,
    fontSize: 16,
    fontWeight: '700',
    color: '#d32f2f',
    textAlign: 'center',
  },
});

export default Guidelines;
