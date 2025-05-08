import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('window');

const PaymentFlow = ({ navigation }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 1000); // Show details after 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={showDetails ? styles.container : styles.rideCompletedContainer}>
      {!showDetails ? (
        <Text style={styles.rideCompletedText}>Ride Completed</Text>
      ) : (
        <>
          <View style={styles.paymentContainer}>
          <Text style={styles.fare}>Fare: ₹280</Text>
          <View style={styles.ScannerContainer}>
            <Text>Scanner</Text>
          </View>
          <TouchableOpacity style={styles.paymentOption} onPress={() => navigation.navigate("HomeTabs")}>
            <Text style={styles.paymentText}>Paid Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption} onPress={() => navigation.navigate("HomeTabs")}>
            <Text style={styles.paymentText}>Paid to Me</Text>
          </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  rideCompletedContainer: {
    flex: 1,
    backgroundColor: '#0f4a97',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rideCompletedText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  paymentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  fare: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  ScannerContainer: {
    width: width * 0.6,
    height: height * 0.25,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  paymentOption: {
    width: width * 0.7,
    backgroundColor: '#87cefa',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
    
  },
  paymentText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
  confirmation: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default PaymentFlow;
