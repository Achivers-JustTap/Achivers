import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

const WhichVehicleScreen = ({ navigation, route }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { isRegister } = route.params;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const vehicles = [
    { id: 'bike', name: 'Moto', image: require('../../../assets/images/moto.png'), altImage: require('../../../assets/images/bike top.png') },
    { id: 'auto', name: 'Auto', image: require('../../../assets/images/auto.png'), altImage: require('../../../assets/images/auto top1.png') },
    { id: 'car', name: 'Car', image: require('../../../assets/images/car.png'), altImage: require('../../../assets/images/car top.png') },
  ];
  
  const handleConfirm = () => {
    if (selectedVehicle) {

      const vehicleAltImage = vehicles.find(v => v.id === selectedVehicle).altImage;
      navigation.navigate('MobileOTPScreen', { isRegister, vehicleAltImage });
    } else {
      Alert.alert('Please select a vehicle type');
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Your Vehicle</Text>
      <View style={styles.vehicleContainer}>
        {vehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleItem}>
            <TouchableOpacity
              style={[styles.vehicleBox, selectedVehicle === vehicle.id && styles.selectedBox]}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  vehicleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  vehicleItem: {
    alignItems: 'center',
  },
  vehicleBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBox: {
    borderColor: '#0F4A97',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  vehicleImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  vehicleText: {
    marginTop: 8,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#0F4A97',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WhichVehicleScreen;
