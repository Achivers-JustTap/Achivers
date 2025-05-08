import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AppMapView from '../../../../components/AppMapView';

const { height } = Dimensions.get('window');

const DropFlow = ({ navigation }) => {
  const [status, setStatus] = useState('verifying');


  useEffect(() => {
    const verifyTimer = setTimeout(() => {
      setStatus('showMap');
    }, 1000);
    return () => clearTimeout(verifyTimer);
  }, []);

  useEffect(() => {
    if (status === 'showMap') {
      const endTimer = setTimeout(() => {
        setStatus('endTrip');
      }, 5000);
      return () => clearTimeout(endTimer);
    }
  }, [status]);

  return (
    <View style={status === 'verifying' ? styles.rideVerifiedContainer : styles.container}>
      {status === 'verifying' && (
        <Text style={styles.rideVerifiedText}>Ride Verified</Text>
      )}

      {(status === 'showMap' || status === 'endTrip') && (
        <>
          
          <AppMapView style={styles.map} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (status === 'endTrip') {
                navigation.navigate('PaymentFlow');
              }
            }}
            disabled={status !== 'endTrip'}>
            <Text style={styles.buttonText}>
              {status === 'endTrip' ? 'End Trip' : 'Go to Maps'}
            </Text>
          </TouchableOpacity>
          {status === 'showMap' && (
  <TouchableOpacity style={styles.cancelButton}>
    <Text style={styles.cancelText}>Cancel</Text>
  </TouchableOpacity>
)}

        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rideVerifiedContainer: {
    flex: 1,
    backgroundColor: '#0f4a97',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rideVerifiedText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: height * 0.4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0f4a97',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 8,
    width: '50%',
    alignSelf:'center',
    textAlign:'center'
  },
  cancelText: {
    color: 'red',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DropFlow;
