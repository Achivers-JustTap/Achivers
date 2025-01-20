import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Today from './EarningScreens/Today';
import Wallet from './EarningScreens/Wallet';
import History from './EarningScreens/History';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialTopTabNavigator();

export default function Earnings({ route, navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow:3 }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon name="arrow-left" size={20} color="black" />
          <Text style={styles.headerText}>My Earnings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('EarningsHelp')}>
        <FontAwesomeIcon name="hands-helping" size={15} color="#fff" />
        <Text style={styles.helpText}>Help</Text>
      </TouchableOpacity>
      <Tab.Navigator
        initialRouteName="Today"
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: { backgroundColor: '#0F4A97' }, 
          tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' }, 
          tabBarIndicatorStyle: { backgroundColor: '#fff' }, 
        }}
      >
        <Tab.Screen name="Today" component={Today} />
        <Tab.Screen name="Wallet" component={Wallet} />
        <Tab.Screen name="History" component={History}/>
      </Tab.Navigator>
      
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#f0f0f0',
  },
  header: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  helpButton: {
    position: 'absolute',
    top: 12,
    right: 15,
    backgroundColor: '#0F4A97',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  helpText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
