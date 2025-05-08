import React, { useState, useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Image, StyleSheet, Text, Animated, Easing, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from './Menu';
import HomePage from './HomePage';
import Activity from './Activity';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AlertsContext } from '../../Context/AlertsContext';

const Tab = createBottomTabNavigator();

function TabNavigationComponent() {
    const RC = useSelector(state => state.RC);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="Menu" component={Menu} />
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Activity" component={Activity} />
        </Tab.Navigator>
    );
}

function CustomTabBar({ state, descriptors, navigation }) {
    const { isOnline, goOnline, goOffline, alerts } = useContext(AlertsContext);
    const [animation] = useState(new Animated.Value(0));
    const [alertShown, setAlertShown] = useState(false); // Track if alert has been shown
    const vehicle = useSelector(state => state.documents.vehicleType);
    const navigationHook = useNavigation();

    const vehicles = [
        {
            id: 'moto',
            name: 'Moto',
            image: require('../../../assets/images/bike top.png'),
        },
        {
            id: 'auto',
            name: 'Auto',
            image: require('../../../assets/images/auto_top.png'),
        },
        {
            id: 'car',
            name: 'Car',
            image: require('../../../assets/images/car top.png'),
        },
    ];

    const selectedVehicleInfo = vehicles.find(v => v.id === vehicle);

    const handleCenterButtonPress = () => {
        if (vehicle === 'car' && !alertShown) {
            // Show alert only if not already shown
            Alert.alert(
                'Service Manager',
                'To start your ride, you need to add a service in the Service Manager.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => {
                            goOffline(); // Prevent going online
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            // Navigate to service manager page
                            navigationHook.navigate('ServiceManager');
                            setAlertShown(true); // Mark the alert as shown
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            // Animate online/offline toggle
            Animated.timing(animation, {
                toValue: isOnline ? 0 : 1,
                duration: 1000,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }).start(() => {
                if (isOnline) {
                    goOffline();
                } else {
                    goOnline();
                }
            });
        }
    };

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1000],
    });

    useEffect(() => {
        if (!isOnline && alertShown) {
            setAlertShown(false);
        }
    }, [isOnline]);

    useEffect(() => {
        if (isOnline && alerts.length > 0) {
            navigationHook.navigate('RideAlertsPage');
        }
    }, [isOnline, alerts]);

    return (
        <>
            <View style={styles.tabBarContainer}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    let icon, label;
                    if (route.name === 'Menu') {
                        icon = 'bars';
                        label = 'Menu';
                    } else if (route.name === 'Activity') {
                        icon = 'calendar';
                        label = 'Activity';
                    } else if (route.name === 'Home') {
                        icon = 'home';
                        label = 'Home';
                    }

                    return (
                        <TouchableOpacity
                            key={route.name}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={[styles.tabButton, isFocused && styles.focusedTab]}
                        >
                            {!(state.index === 1 && route.name === 'Home') && (
                                <>
                                    <Icon name={icon} size={24} color={isFocused ? 'white' : '#ACC3E1'} />
                                    <Text style={{ color: isFocused ? 'white' : '#ACC3E1' }}>{label}</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    );
                })}

                {state.index === 1 && (
                    <TouchableOpacity style={[styles.centerButton, { zIndex: 10 }]} onPress={handleCenterButtonPress}>
                        <View style={styles.placeholder}>
                            {selectedVehicleInfo && (
                                <Animated.Image
                                    source={selectedVehicleInfo.image} // Dynamically set the image
                                    style={[styles.centerImage, { transform: [{ translateY }] }]}
                                />
                            )}
                        </View>
                        <Text style={[styles.statusText, { color: isOnline ? 'green' : 'red' }]}>
                            {isOnline ? 'You are Online' : 'You are Offline'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#0F4A97',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#DDDDDD',
        position: 'relative',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    focusedTab: {
        borderRadius: 20,
    },
    centerButton: {
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: [{ translateX: -35 }],
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 35,
        elevation: 3,
        zIndex: 10,
    },
    placeholder: {
        width: 60,
        height: 60,
        backgroundColor: '#0F4A97',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 15,
        shadowColor: 'grey',
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 6,
    },
    statusText: {
        position: 'absolute',
        bottom: 75,
        fontWeight: '900',
        fontSize: 16,
    },
});

export default TabNavigationComponent;
