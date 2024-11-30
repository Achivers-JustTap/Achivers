import React, { useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Button } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { setVehicleType } from '../store_management/actions/vehicletypeActions';

const VehicleTypeScreen = ({navigation}) => {
    const user = useSelector((state) => state.user);
    const documents = useSelector((state) => state.documents);
  const [selectedVehicleType, setSelectedVehicleType] = useState('');

  const dispatch = useDispatch();

  const handleNext = async () => {
    // Validate input fields here
    if (!selectedVehicleType) {
      alert('Please select a vehicle type');
      return;
    }
  
    // Dispatch action to update Redux store
    dispatch(setVehicleType(selectedVehicleType));
  
    // Construct the payload for the API request
    const captainData = {
      name: user.name,
      email: user.email,
      phoneNumber: user.mobileNumber,
      vehicleType: selectedVehicleType, // Use the selected vehicle type
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      profileImage: user.profilePicture,
      location: 'Dummy Location',  // Assuming a static location for now
      aadharNumber: documents.aadhar.number,
      panNumber: documents.pan.number,
      drivingLicenseNumber: documents.drivingLicense.number,
      rcBookNumber: documents.rc.number,
      bankAccountDetails: {
        accountNumber: documents.bankAccountDetails.accountNumber,
        ifscCode: documents.bankAccountDetails.ifscCode,
        bankName: documents.bankAccountDetails.bankName,
        upi: documents.bankAccountDetails.upi,
      },
      aadharFront: documents.aadhar.frontImage,
      aadharBack: documents.aadhar.backImage,
      panFront: documents.pan.frontImage,
      panBack: documents.pan.backImage,
      drivingLicenseFront: documents.drivingLicense.frontImage,
      drivingLicenseBack: documents.drivingLicense.backImage,
      rcFront: documents.rc.frontImage,
      rcBack: documents.rc.backImage,
    };
  
    try {
      // Send a POST request to the backend
      const response = await fetch('https://fb2e-2406-7400-35-c0dd-c991-3725-f684-db25.ngrok-free.app/captains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(captainData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Captain data saved successfully:', data);
  
        // Navigate to the next screen after successful registration
        navigation.navigate('Processing'); // Replace with actual next screen
      } else {
        console.error('Failed to save captain data:', response.statusText);
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving data. Please try again.');
    }
  };
  

  useEffect(() => {
    console.log('Selected vehicle type:', selectedVehicleType); // Log for debugging
  }, [selectedVehicleType]); // Re-run effect when selectedVehicleType changes


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Vehicle Type</Text>
      <View style={styles.vehicleOptions}>
        <TouchableOpacity
          onPress={() => setSelectedVehicleType('Bike')}
          style={[styles.vehicleOptionContainer, selectedVehicleType === 'Bike' && styles.selectedVehicle]}
        >
          <Image source={require('../../../assets/bike.png')} style={styles.vehicleImage} />
          <Text style={styles.vehicleText}>Bike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedVehicleType('Auto')}
          style={[styles.vehicleOptionContainer, selectedVehicleType === 'Auto' && styles.selectedVehicle]}
        >
          <Image source={require('../../../assets/auto.png')} style={styles.vehicleImage} />
          <Text style={styles.vehicleText}>Auto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedVehicleType('Car')}
          style={[styles.vehicleOptionContainer, selectedVehicleType === 'Car' && styles.selectedVehicle]}
        >
          <Image source={require('../../../assets/car.jpeg')} style={styles.vehicleImage} />
          <Text style={styles.vehicleText}>Car</Text>
        </TouchableOpacity>
      </View>
      <Button title="Complete Registration" onPress={handleNext} style={styles.button} />
    </View>
  );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:   
   '#f0f0f0', // Light gray background   
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    vehicleOptions: {
      flexDirection: 'column', // Change to column for vertical stacking
      alignItems: 'center',
    },
    vehicleOptionContainer: {
      alignItems: 'center',
      marginBottom: 20, // Add spacing between vehicle options
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10, // Add border and rounded corners
    },
    selectedVehicle: {
      backgroundColor: '#33AAFF', // Change background color to blue for selected vehicle
    },
    vehicleImage: {
      width: 100,
      height: 100,
    },
    vehicleText: {
      fontSize: 16,
      marginTop: 10,
    },
    button: {
      backgroundColor: '#0F4A97', // Blue button color
      padding: 15,
      borderRadius: 10,
      width: '100%', // Occupy 80% of the screen width
      justifyContent: 'center', // Center the text within the button
      borderRadius: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
export default VehicleTypeScreen;