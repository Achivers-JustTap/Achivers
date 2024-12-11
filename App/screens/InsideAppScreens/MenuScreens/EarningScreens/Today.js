import { View, Text, Image,StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Gorceries from './TodaysScreens/Gorceries';
import ParcelDelivery from './TodaysScreens/ParcelDelivery';
import BikeTaxi from './TodaysScreens/BikeTaxi';
import All from './TodaysScreens/All';


const Tab = createMaterialTopTabNavigator();
const Today = ({route,navigation}) => {
    const [selectedCategory, setSelectedCategory] = useState('All'); 
    const [selectedVehicleType, setSelectedVehicleType] = useState(route.params?.selectedVehicleName || 'Moto'); 
  
    const vehicleAltImage = route.params?.vehicleAltImage;
    const { RC, rcFrontImage, rcBackImage, rcFrontFile, selectedVehicleType: selectedVehicleName , rcBackFile, panNumber, panFrontImage, panBackImage, panFrontFile, panBackFile, licenseFrontFile, licenseBackFile, licenseFront, licenseBack, licenseNumber, validTillDate, name, email, gender, dateOfBirth, phoneNumber, profileImageBase64, aadharNumber, aadharFront, aadharBack, aadharFrontFile, aadharBackFile } = route.params;

    useEffect(() => {
      if (route.params?.vehicleType) {
        setSelectedVehicleType(route.params.vehicleType); 
      }
    }, [route.params]);
  
    const handleTabPress = (tab) => {
      setActiveTab(tab);
    };
  
  return(
    <ScrollView style={styles.container}>
            <View style={styles.boxWithShadow}>
              <View style={styles.headerBox}>
                <Text style={styles.headerText}>₹ 0.0</Text>
                <Text style={styles.subHeaderText}>
                  Today's Earnings <FontAwesomeIcon name="arrow-right" size={13} color="white" />
                </Text>
              </View>
              <View style={styles.line} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Text style={styles.footerText}>Cash Collected</Text>
                <Text style={styles.footerText}>₹ 0.0</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => console.log('Rate Card mouted')} style={styles.box2WithShadow}>
              <Image source={require('../../../../../assets/images/rupee.png')} style={styles.image} />
              <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>Rate Card</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 20, right: 10, top: 'auto', position: 'absolute' }}>{'>'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('know more')} style={styles.box3WithShadow}>
              <Image source={require('../../../../../assets/images/silver-star.png')} style={styles.image2} />
              <Text
                style={{
                  fontWeight: 'bold',
                  padding: 1,
                  backgroundColor: '#0F4A97',
                  color: 'white',
                  left: 10,
                  textAlign: 'center',
                  position: 'absolute',
                }}
              >
                Guidelines for doing Orders
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  padding: 1,
                  color: 'gold',
                  right: 10,
                  backgroundColor: '#0F4A97',
                  top: 'auto',
                  position: 'absolute',
                }}
              >
                Know More
              </Text>
            </TouchableOpacity>
            <View style={{height: 1.5,
                          backgroundColor: '#466b9b',
                          marginBottom:5,
                          marginVertical:20,}} />
            <Text style={{fontWeight:'bold', textAlign:'center',fontSize: 20,color:'#0F4A97',marginBottom:5}}>Earning Details</Text>
            <Tab.Navigator
        initialRouteName="All"
        screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: { backgroundColor: '#0F4A97' },
            tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
            tabBarIndicatorStyle: { backgroundColor: '#fff' },
            tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen name="All" component={All} initialParams={{RC, rcFrontImage, vehicleAltImage,rcBackImage, rcFrontFile, selectedVehicleType: selectedVehicleName , rcBackFile, panNumber, panFrontImage, panBackImage, panFrontFile, panBackFile, licenseFrontFile, licenseBackFile, licenseFront, licenseBack, licenseNumber, validTillDate, name, email, gender, dateOfBirth, phoneNumber, profileImageBase64, aadharNumber, aadharFront, aadharBack, aadharFrontFile, aadharBackFile}}/>
        <Tab.Screen name="Bike Taxi" component={BikeTaxi} initialParams={{RC, rcFrontImage,vehicleAltImage, rcBackImage, rcFrontFile, selectedVehicleType: selectedVehicleName , rcBackFile, panNumber, panFrontImage, panBackImage, panFrontFile, panBackFile, licenseFrontFile, licenseBackFile, licenseFront, licenseBack, licenseNumber, validTillDate, name, email, gender, dateOfBirth, phoneNumber, profileImageBase64, aadharNumber, aadharFront, aadharBack, aadharFrontFile, aadharBackFile}} />
        <Tab.Screen name="Parcels Delivery" component={ParcelDelivery} initialParams={{RC, rcFrontImage, vehicleAltImage,rcBackImage, rcFrontFile, selectedVehicleType: selectedVehicleName , rcBackFile, panNumber, panFrontImage, panBackImage, panFrontFile, panBackFile, licenseFrontFile, licenseBackFile, licenseFront, licenseBack, licenseNumber, validTillDate, name, email, gender, dateOfBirth, phoneNumber, profileImageBase64, aadharNumber, aadharFront, aadharBack, aadharFrontFile, aadharBackFile}}/>
        <Tab.Screen name="Gorceries Delivery" component={Gorceries} initialParams={{RC, rcFrontImage, vehicleAltImage,rcBackImage, rcFrontFile, selectedVehicleType: selectedVehicleName , rcBackFile, panNumber, panFrontImage, panBackImage, panFrontFile, panBackFile, licenseFrontFile, licenseBackFile, licenseFront, licenseBack, licenseNumber, validTillDate, name, email, gender, dateOfBirth, phoneNumber, profileImageBase64, aadharNumber, aadharFront, aadharBack, aadharFrontFile, aadharBackFile}} />
      </Tab.Navigator>
          </ScrollView>

  )
      
}  
    
const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      padding:10
    },
  
    boxWithShadow: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: '#0F4A97',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 8,
    },
    headerBox: {
      backgroundColor: '#0F4A97',
      borderRadius: 5,
      padding: 40,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    subHeaderText: {
      fontSize: 14,
      color: '#fff',
      marginTop: 4,
      padding: 5,
    },
    line: {
      height: 1,
      backgroundColor: '#ddd',
      marginVertical: 8,
    },
    footerText: {
      fontSize: 13,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#4471ab',
    },
    box2WithShadow: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: '#0F4A97',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 8,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 20,
      height: 20,
      margin: 5,
    },
    box3WithShadow: {
      backgroundColor: '#0F4A97',
      borderRadius: 10,
      shadowColor: '#0F4A97',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 8,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    image2: {
      width: '100%',
      height: 50,
    },
   
  }); 

 
  

  
export default Today