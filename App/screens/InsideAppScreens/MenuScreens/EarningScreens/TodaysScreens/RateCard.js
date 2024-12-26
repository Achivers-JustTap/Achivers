import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import Link from './RateCardItems/Link';
import BikeLite from './RateCardItems/BikeLite';
import C2C from './RateCardItems/C2C';
import BikeMetro from './RateCardItems/BikeMetro';
import SwiggyGinie from './RateCardItems/SwiggyGinie';
import KPN from './RateCardItems/KPN';

const Tab = createMaterialTopTabNavigator();

const RateCard = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Link"
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: { backgroundColor: '#0F4A97' },
          tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
          tabBarIndicatorStyle: { backgroundColor: '#fff' },
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen name="Link" component={Link} />
        <Tab.Screen name="Bike Lite" component={BikeLite} />
        <Tab.Screen name="C2C" component={C2C} />
        <Tab.Screen name="Bike Metro" component={BikeMetro} />
        <Tab.Screen name="Swiggy Genie" component={SwiggyGinie} />
        <Tab.Screen name="KPN" component={KPN} />
      </Tab.Navigator>
    </View>
  );
};

export default RateCard;
