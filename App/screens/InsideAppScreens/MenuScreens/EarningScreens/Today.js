import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import All from './TodaysScreens/All';
import Gorceries from './TodaysScreens/Groceries';
import ParcelDelivery from './TodaysScreens/ParcelDelivery';
import BikeTaxi from './TodaysScreens/BikeTaxi';
import CarAll from './TodaysScreens/CarAll';
import CarRides from './TodaysScreens/CarRides'; 
import Intercity from './TodaysScreens/Intercity'; 
import AutoAll from './TodaysScreens/AutoAll';
import AutoRides from './TodaysScreens/AutoRides';
import { useSelector } from 'react-redux';  

const Tab = createMaterialTopTabNavigator();

const Today = ({ route, navigation }) => {
    const selectedVehicleType = useSelector(state => state.documents.vehicleType); 
    const [activeTab, setActiveTab] = useState('');
    
    
    let vehicleTypes = [];
    console.log('selectedVehicleType', selectedVehicleType);
    if (selectedVehicleType === 'car') {
        vehicleTypes = ['All', 'Cab Rides', 'Intercity'];
    } else if (selectedVehicleType === 'Auto') {
        vehicleTypes = ['All', 'Auto Rides'];
    } else if (selectedVehicleType === 'Bike') {
        vehicleTypes = ['All', 'Bike Taxi', 'Parcel Delivery', 'Groceries Delivery'];
    } else {
       console.log("error")
    }

    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };
    
    return (
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

            <TouchableOpacity onPress={() => navigation.navigate('RateCard')} style={styles.box2WithShadow}>
                <Image source={require('../../../../../assets/images/rupee.png')} style={styles.image} />
                <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>Rate Card</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20, right: 10, top: 'auto', position: 'absolute' }}>{'>'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Guidelines')} style={styles.box3WithShadow}>
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
            <View style={{ height: 1.5, backgroundColor: '#466b9b', marginBottom: 5, marginVertical: 20 }} />
            <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, color: '#0F4A97', marginBottom: 5 }}>
                Earning Details
            </Text>

            {/* Horizontal scrollable tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabNav}>
                {vehicleTypes.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={styles.tabText}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.tabContent}>
    
    {activeTab === 'All' && selectedVehicleType === 'Bike' && <All />}
    
   
    {activeTab === 'Bike Taxi' && <BikeTaxi />}
    {activeTab === 'Parcel Delivery' && <ParcelDelivery />}
    {activeTab === 'Groceries Delivery' && <Gorceries />}

    {activeTab === 'Cab Rides' && <CarRides />}
    {activeTab === 'Intercity' && <Intercity />}
    
    {activeTab === 'Auto Rides' && <AutoRides />}
    
    {/* Render content for All tab for each vehicle type */}
    {activeTab === 'All' && selectedVehicleType === 'car' && <CarAll />}
    {activeTab === 'All' && selectedVehicleType === 'auto' && <AutoAll />}

    {/* Fallback to show selectedVehicleType content if no specific tab */}
    {activeTab === selectedVehicleType && <Text>{selectedVehicleType} content</Text>}
</View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    boxWithShadow: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
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
        marginVertical: 5,
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
        marginBottom: 10,
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
    tabNav: {
        flexDirection: 'row',
        backgroundColor: '#0F4A97',
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
    },
    tabButton: {
        backgroundColor: '#B0BEC5',
        marginLeft: 10,
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#B0BEC5',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    tabButtonActive: {
        backgroundColor: '#FFEB3B',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 7,
        alignItems: 'center',
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
    tabContent: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#0F4A97',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
});

export default Today;
