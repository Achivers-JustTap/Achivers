import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import MiniCabRateCard from './RateCardItems/CarRateCards.js/MiniCabRateCard';
import MaxiCabRateCard from './RateCardItems/CarRateCards.js/MaxiCabRateCard';
import XLCabRateCard from './RateCardItems/CarRateCards.js/XLCabRateCard';
import IntercityRateCard from './RateCardItems/CarRateCards.js/IntercityRateCard';
import BikeRateCard from './RateCardItems/BikeRateCard';
import AutoRateCard from './RateCardItems/AutoRateCard';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const RateCard = () => {
  const vehicle = useSelector((state) => state.documents.vehicleType);

  if (vehicle === 'car') {
    return (
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="Mini Cab"
          screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: { backgroundColor: '#0F4A97' },
            tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
            tabBarIndicatorStyle: { backgroundColor: '#fff' },
            tabBarScrollEnabled: true,
          }}
        >
          <Tab.Screen name="Mini Cab" component={MiniCabRateCard} />
          <Tab.Screen name="Maxi Cab" component={MaxiCabRateCard} />
          <Tab.Screen name="XL Cab" component={XLCabRateCard} />
          <Tab.Screen name="Intercity Cab" component={IntercityRateCard} />
        </Tab.Navigator>
      </View>
    );
  }

  if (vehicle === 'auto') {
    return (
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="Auto Rate Card"
          screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: { backgroundColor: '#0F4A97' },
            tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
            tabBarIndicatorStyle: { backgroundColor: '#fff' },
            tabBarScrollEnabled: true,
          }}
        >
          <Tab.Screen name="Auto Rate Card" component={AutoRateCard} />
        </Tab.Navigator>
      </View>
    );
  }

  if (vehicle === 'bike') {
    return (
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="Bike Rate Card"
          screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: { backgroundColor: '#0F4A97' },
            tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
            tabBarIndicatorStyle: { backgroundColor: '#fff' },
            tabBarScrollEnabled: true,
          }}
        >
          <Tab.Screen name="Bike Rate Card" component={BikeRateCard} />
        </Tab.Navigator>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Select a vehicle type to view rate cards</Text>
    </View>
  );
};

export default RateCard;
