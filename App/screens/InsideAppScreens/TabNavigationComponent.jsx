import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Image, StyleSheet, Text, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from './Menu';
import HomePage from './HomePage';
import Activity from './Activity';

const Tab = createBottomTabNavigator();

function TabNavigationComponent({ route }) {
    const vehicleAltImage = route.params?.vehicleAltImage; 
    const {RC,rcFrontImage,selectedVehicleType: selectedVehicleName ,rcBackImage,rcFrontFile,rcBackFile, panFrontImage,panBackImage,panFrontFile,panBackFile,licenseFrontFile,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, panNumber , name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile} = route.params;
  
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <CustomTabBar {...props} vehicleAltImage={vehicleAltImage} />}
      >
        <Tab.Screen name="Menu" component={Menu} initialParams={{RC,selectedVehicleType: selectedVehicleName ,rcFrontImage,rcBackImage,rcFrontFile,rcBackFile,panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile, vehicleAltImage,licenseFrontFile,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile }} />
        <Tab.Screen name="Home" component={HomePage} initialParams={{RC,rcFrontImage,selectedVehicleType: selectedVehicleName ,rcBackImage,rcFrontFile,rcBackFile,panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile, vehicleAltImage,licenseFrontFile,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile}} />
        <Tab.Screen name="Activity" component={Activity} />
      </Tab.Navigator>
    );
  }
  
  function CustomTabBar({ state, descriptors, navigation, vehicleAltImage }) {
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
                <TouchableOpacity style={styles.centerButton} onPress={handleCenterButtonPress}>
                    <View style={styles.placeholder}>
                        {vehicleAltImage && (
                            <Animated.Image
                                source={vehicleAltImage}
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
