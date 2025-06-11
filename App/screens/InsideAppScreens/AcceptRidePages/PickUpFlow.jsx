import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AppMapView from '../../../../components/AppMapView';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const PickUpFlow = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [status, setStatus] = useState('navigate');
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const {ride} = route.params 
  console.log('ride',ride)// ⏱ Timer state

  useEffect(() => {
    if (otpVerified) {
      navigation.navigate('DropFlow',{ride});
    }
  }, [otpVerified]);

  // Start timer when status is 'arrived'
  useEffect(() => {
    let timer;
    if (status === 'arrived') {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status]);

  const handleVerifyOtp = async () => {
  try {
    const response = await fetch('http://192.168.29.13:5000/rides/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rideId: ride,
        otp: otp
      }),
    });
    console.log('OTP:', otp);
    console.log('Ride ID:', ride._id);
    const data = await response.json();


    if (response.ok) {
     
      setOtpVerified(true);

    } else {
      alert(data.message || 'OTP Verification failed');
      console.log(data);
    }
  } catch (err) {
    alert('Something went wrong',err);
    console.log(err);
  }
};


   

  return (
    <SafeAreaView style={styles.container}>
      {otpVerified ? (
        <Text style={styles.heading}>Ride Verified</Text>
      ) : status === 'navigate' ? (
        <>
          <AppMapView style={styles.map} />
          <TouchableOpacity style={styles.button} onPress={() => setStatus('arrivedButton')}>
            <Text style={styles.buttonText}>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : status === 'arrivedButton' ? (
        <>
          <AppMapView style={styles.map} />
          <TouchableOpacity style={styles.button} onPress={() => setStatus('arrived')}>
            <Text style={styles.buttonText}>Arrived at Pickup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : status === 'arrived' ? (
        <>
          <AppMapView style={styles.map} />
          <View style={styles.timerContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${Math.max(0, 100 - (elapsedTime / 180) * 100)}%`,
                },
              ]}
            />
            <Text style={styles.timerText}>
              {String(Math.floor(elapsedTime / 60)).padStart(2, '0')}:
              {String(elapsedTime % 60).padStart(2, '0')}
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => setStatus('otp')}>
            <Text style={styles.buttonText}>Start Ride</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
        <AppMapView style={styles.map} />
          <Text style={styles.heading}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    marginTop: 10,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 18,
    textAlign: 'center',
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
  timerContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '50%',
    marginLeft:'auto',
    marginRight:'auto',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 4,
    backgroundColor: '#0f4a97',
    zIndex: 1,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 2,
  },
});
export default PickUpFlow;
