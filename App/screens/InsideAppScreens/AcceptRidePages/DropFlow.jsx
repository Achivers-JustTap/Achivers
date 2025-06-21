import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AppMapView from '../../../../components/AppMapView';

const { height } = Dimensions.get('window');

const DropFlow = ({ navigation, route }) => {
  const [status, setStatus] = useState('verifying');
  const { ride } = route.params
  console.log('ride', ride) 


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

  const handleEndTrip = async () => {
    try {
      const response = await fetch('http://192.168.29.13:5000/rides/end-ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rideId: ride, 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Ride ended successfully:', data);
        navigation.navigate('PaymentFlow');
      } else {
        console.error('Failed to end ride:', data.errors || data.message);
        console.log('Failed to end ride:', data);
        alert('Failed to end ride. Please try again.');
      }
    } catch (error) {
      console.error('Error ending ride:', error);
      alert('An error occurred while ending the ride.');
    }
  };


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
            onPress={handleEndTrip}
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
    alignSelf: 'center',
    textAlign: 'center'
  },
  cancelText: {
    color: 'red',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DropFlow;
