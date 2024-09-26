import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const WhichVehicleScreen = ({ navigation, route }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { isRegister } = route.params;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  const vehicles = [
    { id: 'bike', name: 'Bike', image: null },
    { id: 'auto', name: 'Auto', image: null },
    { id: 'car', name: 'Car', image: null },
  ];

  const handleConfirm = () => {
    if (selectedVehicle) {
      navigation.navigate('MobileOTPScreen', { isRegister });
    } else {
      alert('Please select a vehicle type');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Your Vehicle</Text>
      <View style={styles.vehicleContainer}>
        {vehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleItem}>
            <TouchableOpacity
              style={[
                styles.vehicleBox,
                selectedVehicle === vehicle.id && styles.selectedBox, 
              ]}
              onPress={() => setSelectedVehicle(vehicle.id)}
            >
              <View style={styles.imagePlaceholder}>
                {vehicle.image ? (
                  <Image source={vehicle.image} style={styles.vehicleImage} />
                ) : (
                  <Text style={styles.imageText}>Image</Text>
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.vehicleText}>{vehicle.name}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  vehicleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  vehicleItem: {
    alignItems: 'center', 
  },
  vehicleBox: {
    backgroundColor: '#FFFFFF',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, 
  },
  selectedBox: {
    backgroundColor: '#5184C7', 
  },
  vehicleText: {
    fontSize: 16,
    color: '#000',
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  imageText: {
    color: '#808080',
  },
  confirmButton: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WhichVehicleScreen;
