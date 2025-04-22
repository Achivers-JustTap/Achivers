import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useSelector } from 'react-redux';
import All from './HistoryScreens/HistoryAll';
import BikeTaxi from './HistoryScreens/HistoryBikeTaxi';
import ParcelDelivery from './HistoryScreens/HistoryParcelDelivery';
import Groceries from './HistoryScreens/HistoryGroceries';
import CarAll from './HistoryScreens/HistoryCarAll';
import CabRides from './HistoryScreens/HistoryCabRides';
import Intercity from './HistoryScreens/HistoryIntercity.jsx';
import AutoAll from './HistoryScreens/HistoryAutoAll';
import AutoRides from './HistoryScreens/HistoryAutoRides';

const History = ({ route, navigation }) => {
    const selectedVehicleType = useSelector(state => state.documents.vehicleType);
    const [activeTab, setActiveTab] = useState('All');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);

    useEffect(() => {
        if (route.params?.vehicleType) {
            setSelectedVehicleType(route.params.vehicleType);
        }
    }, [route.params]);

    const onChange = (event, selectedDate) => {
      if (selectedDate) {
        setDate(selectedDate);
        setIsDateSelected(true);
      }
      setShowPicker(false);
    };
  
    const handleBackPress = () => {
      setIsDateSelected(false);
    };

    let vehicleScreens = {};
    if (selectedVehicleType === 'car') {
        vehicleScreens = {
            All: <CarAll />,
            'Cab Rides': <CabRides />,
            Intercity: <Intercity />,
        };
    } else if (selectedVehicleType === 'auto') {
        vehicleScreens = {
            All: <AutoAll />,
            'Auto Rides': <AutoRides />,
        };
    } else if (selectedVehicleType === 'bike') {
        vehicleScreens = {
            All: <All />,
            'Bike Taxi': <BikeTaxi />,
            'Parcel Delivery': <ParcelDelivery />,
            'Groceries Delivery': <Groceries />,
        };
    } else {
        vehicleScreens = {
            All: <All />,
            'Bike Taxi': <BikeTaxi />,
            'Parcel Delivery': <ParcelDelivery />,
            'Groceries Delivery': <Groceries />,
        };
    }

    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };

    const handleEarningsPress = () => {
        navigation.navigate('EarningsOnDatePage'); 
    };

    return (
        <ScrollView style={styles.container}>
            {/* Date Picker Section */}
            <View style={styles.datePickerContainer}>
                {isDateSelected ? (
                    <View style={styles.dateSelectedContainer}>
                        <Text style={styles.dateText}>{date.toLocaleDateString('en-GB')}</Text>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={handleBackPress}
                        >
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text style={styles.dateButtonText}>Select Date</Text>
                    </TouchableOpacity>
                )}

                {/* DateTimePicker */}
                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>

            {/* Earnings Section - Touchable for navigation */}
            <TouchableOpacity style={styles.boxWithShadow} onPress={handleEarningsPress}>
                <View style={styles.headerBox}>
                    <Text style={styles.headerText}>₹ 0.0</Text>
                    <Text style={styles.subHeaderText}>
                        {isDateSelected
                            ? `Earnings on ${date.toLocaleDateString('en-GB')}`
                            : 'Today\'s Earnings'}
                        <FontAwesomeIcon name="arrow-right" size={13} color="white" />
                    </Text>
                </View>
                <View style={styles.line} />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Cash Collected</Text>
                    <Text style={styles.footerText}>₹ 0.0</Text>
                </View>
            </TouchableOpacity>

            {/* Tabs Section */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabNav}>
                {Object.keys(vehicleScreens).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={styles.tabText}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Tab Content Section */}
            <View style={styles.tabContent}>
                {vehicleScreens[activeTab]}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    datePickerContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 5,
    },
    dateSelectedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 20,
        left: 10,
        fontWeight: 'bold',
        color: '#0F4A97',
    },
    dateButton: {
        backgroundColor: '#0F4A97',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    dateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
    },
    subHeaderText: {
        fontSize: 14,
        color: '#fff',
        marginTop: 4,
    },
    line: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 5,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    footerText: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4471ab',
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
        borderRadius: 10,
        shadowColor: '#0F4A97',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
});

export default History;
