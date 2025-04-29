import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import AllRateCards from './RateCardItems/AllRateCards';

const RateCard = () => {
  const selectedVehicleType = useSelector((state) => state.documents.vehicleType);
  const [activeTab, setActiveTab] = useState(null);
  const [vehicleTabs, setVehicleTabs] = useState([]);

  useEffect(() => {
    let tabs = [];
    if (selectedVehicleType === 'car') {
      tabs = ['Car', 'Reserved', 'Intercity', 'Rentals'];
    } else if (selectedVehicleType === 'auto') {
      tabs = ['Auto', 'Parcels'];
    } else if (selectedVehicleType === 'moto') {
      tabs = ['Bike', 'Parcels'];
    } else {
      tabs = ['Bike', 'Parcels'];
    }
    setVehicleTabs(tabs);
    setActiveTab(tabs[0]); // Always activate the first tab
  }, [selectedVehicleType]);

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.tabNav}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {vehicleTabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {vehicleTabs.includes(activeTab) && (
          <AllRateCards activeTab={activeTab} vehicleType={selectedVehicleType} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6ff',
  },
  tabNav: {
    backgroundColor: '#0F4A97',
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
  tabButton: {
    backgroundColor: '#B0BEC5',
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#FFEB3B',
    shadowColor: '#FFEB3B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#0F4A97',
    fontWeight: 'bold',
  },
});

export default RateCard;
