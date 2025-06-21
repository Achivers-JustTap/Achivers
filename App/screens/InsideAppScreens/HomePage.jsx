import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AppMapView from '../../../components/AppMapView';
import * as Location from 'expo-location';
import { UserLocationContext } from '../../Context/UserLocationContext';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IncentivesCarousel from "../../../components/IncentivesCorousel";
import { AlertsContext } from '../../Context/AlertsContext';
import { CaptainDataContext } from '../../Context/CaptainDataContext';
import { SocketContext } from '../../Context/SocketContext';

const HomePage = ({ navigation }) => {
    const { location, setLocation } = useContext(UserLocationContext);
    const { alerts, openAlertsPage, alertsPageVisible, isOnline } = useContext(AlertsContext);
    const [errorMsg, setErrorMsg] = useState(null);
    const [notificationCount, setNotificationCount] = useState(1);
    const userImageUrl = useSelector(state => state.user.profileImage);

    const { captainData } = useContext(CaptainDataContext);
    const { socket } = useContext(SocketContext);


    useEffect(() => {
        if (!captainData?._id || !socket) {
            console.log("Captain data or socket not ready yet.");
            return;
        }
    
        socket.emit('join', {
            userId: captainData._id,
            userType: 'captain'
        });
    
        const updateLocation = async () => {
            try {
                const position = await Location.getCurrentPositionAsync({});
                const coords = {
                    
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                };
                console.log('captain location:', { userId: captainData._id, location: coords });
    
                socket.emit('update-location-captain', {
                    userId: captainData._id,
                    location: coords
                });
            } catch (error) {
                console.error("Location fetch failed:", error);
            }
        };

        const locationInterval = setInterval(updateLocation, 10000);
                   updateLocation(); // Initial fetch
    
        //return () => clearInterval(locationInterval);
    }, [captainData._id, socket]);
    
        socket.on('new-ride', (data) => {

       console.log('ride',data)

    })


    const navigateToIncentives = () => {
        navigation.navigate("IncentivesPage");
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleProfileImagePress = () => {
        navigation.navigate('ProfiledetailsPage');
    };

    const handleFavLocationPress = () => {
        navigation.navigate('FavLocation');
    };

    const handleNotificationPress = () => {
        navigation.navigate('Notifications');
        setNotificationCount(1);
    };

    const handleEarningsPress = () => {
        navigation.navigate('Earnings');
    };

    const handleRidesPress = () => {
        navigation.navigate('CompletedRides');
    };

    const handleAlertsIconPress = () => {
        openAlertsPage();
        navigation.navigate('RideAlertsPage');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                {userImageUrl ? (
                    <TouchableOpacity onPress={handleProfileImagePress}>
                        <View style={styles.profileContainer}>
                            <Image
                                style={styles.profileImage}
                                source={{ uri: userImageUrl }}
                                onError={(error) => console.log('Error loading image: ', error)}
                            />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <Image
                        style={styles.profileImage}
                        source={{
                            uri: 'https://cdni.iconscout.com/illustration/premium/thumb/male-user-image-illustration-download-in-svg-png-gif-file-formats--person-picture-profile-business-pack-illustrations-6515860.png'
                        }}
                    />
                )}


                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleFavLocationPress}>
                        <Icon name="map-marker" size={40} color="#0F4A97" style={styles.icon} />
                        <Icon name="circle" size={20} color="#0F4A97" style={styles.circleIcon} />
                        <Icon name="heart" size={15} color="white" style={styles.heartIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNotificationPress} style={styles.notificationContainer}>
                        <Icon name="bell" size={35} color="#0F4A97" style={styles.icon} />
                        {notificationCount > 0 && (
                            <View style={styles.badgeContainer}>
                                <Text style={styles.badgeText}>{notificationCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAlertsIconPress} style={styles.alertsIconContainer}>
                        {isOnline && (
                            <Icon name="exclamation-circle" size={35} color={alertsPageVisible ? "#FF0000" : "#0F4A97"} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.mapContainer}>
            {isOnline && (
                 <AppMapView style={styles.map} />
            )}
               
                <View style={styles.carouselContainer}>
                    <IncentivesCarousel onRideAndEarnPress={navigateToIncentives} />
                </View>

                <View style={styles.statsContainer}>
                    <TouchableOpacity style={styles.leftStats} onPress={handleEarningsPress}>
                        <Text style={styles.titleText}>Today's Earnings</Text>
                        <Text style={styles.valueText}>₹ 0.00</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.rightStats} onPress={handleRidesPress}>
                        <Text style={styles.titleText}>Completed Rides</Text>
                        <Text style={styles.valueText}>0/20</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        paddingHorizontal: 20,
    },
    carouselContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 10,
        width: '100%',
        borderRadius: 50,
        paddingHorizontal: 10,
        zIndex: 1,
    },
    profileContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#0F4A97',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationContainer: {
        position: 'relative',
        marginLeft: 10,
    },
    badgeContainer: {
        position: 'absolute',
        right: -10,
        top: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    icon: {
        marginLeft: -7,
        position: 'relative',
    },
    circleIcon: {
        position: 'absolute',
        top: 5.91,
        left: -3,
    },
    heartIcon: {
        position: 'absolute',
        top: 8,
        left: -3,
    },
    alertsIconContainer: {
        marginLeft: 15,
    },
    mapContainer: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
        margin: 0,
        padding: 0,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    statsContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    leftStats: {
        width: '35%',
        alignItems: 'center',
        backgroundColor: '#0F4A97',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
    rightStats: {
        width: '35%',
        alignItems: 'center',
        backgroundColor: '#0F4A97',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
    titleText: {
        fontSize: 12,
        color: 'white',
    },
    valueText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default HomePage;
