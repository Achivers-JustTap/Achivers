import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Image, StyleSheet, Text, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from './Menu';
import HomePage from './HomePage';
import Activity from './Activity';

const Tab = createBottomTabNavigator();

function TabNavigationComponent({ route }) {
    const vehicleImage = route.params?.vehicleImage;
    const { profileImageBase64, name, email, phoneNumber, gender, dateOfBirth } = route.params;

    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBar={(props) => <CustomTabBar {...props} vehicleImage={vehicleImage} />}
        >
            <Tab.Screen name="Menu" component={Menu} initialParams={{ name, email, gender, dateOfBirth, phoneNumber, profileImageBase64 }} />
            <Tab.Screen name="Home" component={HomePage} initialParams={{  name, email, gender, dateOfBirth, phoneNumber, profileImageBase64  }} />
            <Tab.Screen name="Activity" component={Activity} />
        </Tab.Navigator>
    );
}

function CustomTabBar({ state, descriptors, navigation, vehicleImage }) {
    const [isOnline, setIsOnline] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const handleCenterButtonPress = () => {
        const newOnlineState = !isOnline;
        Animated.timing(animation, {
            toValue: newOnlineState ? 0 : 1,
            duration: 1000,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start(() => {
            setIsOnline(newOnlineState);
        });
    };

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1000],
    });

    return (
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

                // Set icons and labels for all tabs
                let icon, label;
                if (route.name === 'Menu') {
                    icon = 'bars';
                    label = 'Menu'; 
                } else if (route.name === 'Activity') {
                    icon = 'calendar'; 
                    label = 'Activity';
                } else if (route.name === 'Home') {
                    icon = 'home';  // Use the home icon for the Home tab
                    label = 'Home';  // Use the home label for the Home tab
                }

                return (
                    <TouchableOpacity
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[styles.tabButton, isFocused && styles.focusedTab]}
                    >
                        {!(state.index === 1 && route.name === 'Home') && ( // Exclude Home tab when focused
                            <>
                                <Icon name={icon} size={24} color={isFocused ? 'white' : '#ACC3E1'} />
                                <Text style={{ color: isFocused ? 'white' : '#ACC3E1' }}>{label}</Text>
                            </>
                        )}
                    </TouchableOpacity>
                );
            })}

            {/* Conditionally render the circle button only on the "Home" tab */}
            {state.index === 1 && ( // Ensure it's shown on other tabs
                <TouchableOpacity style={styles.centerButton} onPress={handleCenterButtonPress}>
                    <View style={styles.placeholder}>
                        {vehicleImage && (
                            <Animated.Image
                                source={vehicleImage}
                                style={[styles.centerImage, { transform: [{ translateY }] }]}
                            />
                        )}
                    </View>
                    <Text style={[styles.statusText, { color: isOnline ? 'red' : 'green' }]}>
                        {isOnline ? 'You are Offline' : 'You are Online'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
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
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 15,
    },
    statusText: {
        position: 'absolute',
        bottom: 75,
        fontWeight: '900',
        fontSize: 16,
    },
});

export default TabNavigationComponent;
