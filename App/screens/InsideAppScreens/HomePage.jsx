import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AppMapView from '../../../components/AppMapView';
import * as Location from 'expo-location';
import { UserLocationContext } from '../../Context/UserLocationContext';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import IncentivesCarousel from "../../../components/IncentivesCorousel";
import RideAlertBox from '../../../components/RideAlertBox';

const HomePage = ({ navigation }) => {
    const { location, setLocation } = useContext(UserLocationContext);
    const [errorMsg, setErrorMsg] = useState(null);
    const [notificationCount, setNotificationCount] = useState(1); 
    const userImaageUrl = useSelector((state) => state.user.profilePicture);
    console.log(" Image Url", userImaageUrl)
    const [showAlert, setShowAlert] = useState(false);
    const [timer, setTimer] = useState(20);
    const [alertOpacity] = useState(new Animated.Value(0));
    const navigateToIncentives = () => {
        navigation.navigate("IncentivesPage"); 
      };

    // Sample data for pickup and destination
    // const pickupPoint = { lat: 12.9716, lon: 77.5946, address: "48-320/sri nilayam,ganesh Nagar, chintal,qutbullarpur,hyderadab,telangana" };
    // const destinationPoint = { lat: 12.9352, lon: 77.6245, address: "Opp. Laxmikaka and Sashikala Theaters, Bhavani Nagar Moosapet, Near State Bank Of Hyderabad, Hyderabad, Telangana 500018, India" };

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

    useEffect(() => {
        if (showAlert) {
            const countdown = setInterval(() => {
                setTimer((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(countdown);
                        handleAlertClose();
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(countdown);
        }
    }, [showAlert]);


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

    const handleAlertClose = () => {
        setShowAlert(false);
        Animated.timing(alertOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleAlertAccept = () => {
        handleAlertClose();
    };

    const handleAlertSkip = () => {
        setTimer(20);
        handleAlertClose();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                {userImaageUrl ? (
                    <TouchableOpacity onPress={handleProfileImagePress}>
                        <View style={styles.profileContainer}>
                            <Image
                                style={styles.profileImage}
                                source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/male-user-image-illustration-download-in-svg-png-gif-file-formats--person-picture-profile-business-pack-illustrations-6515860.png' }} 
                                onError={(error) => console.log('Error loading image: ', error)}
                            />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <Text>No profile image available</Text>
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
                </View>
            </View>

            <View style={styles.mapContainer}>
                <AppMapView style={styles.map} />
                <View style={styles.carouselContainer}>
                <IncentivesCarousel onRideAndEarnPress={navigateToIncentives} />
                <View style={styles.alertContainer}>
        <RideAlertBox />
    </View>   
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


             
            {/* Alert Box */}
            {/* {showAlert && (
                <Animated.View style={[styles.alertBox, { opacity: alertOpacity }]}>
                    <View style={styles.alertContent}>
                        <View style={styles.pinContainer}>
                            <Icon name="map-pin" size={24} color="green" />
                            <Text style={styles.pinText}>Pickup: {pickupPoint.address}</Text>
                        </View>
                        <View style={styles.pinContainer}>
                            <Icon name="map-pin" size={24} color="red" />
                            <Text style={styles.pinText}>Destination: {destinationPoint.address}</Text>
                        </View>

                        <View style={styles.fareContainer}>
                            <Text style={styles.fareText}>Fare: ₹ 150.00</Text>
                            <Text style={styles.fareText}>Time: 15 mins</Text>
                            <Text style={styles.fareText}>Distance: 5 km</Text>
                           
                        </View>
                        <Text style={styles.fareText}>1.1 km to Pickup Point</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleAlertAccept} style={styles.button}>
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleAlertSkip} style={styles.button}>
                                <Text style={styles.buttonText}>Skip</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.timerContainer}>
                            <Text style={styles.timerText}>{timer}s</Text>
                        </View>
                    </View>
                </Animated.View>
            )}   */}

               
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
        borderRadius:50,
        paddingHorizontal: 10, 
        zIndex: 1,
    },
    
    alertBox: {
       
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        zindex: '10'
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
    alertBox: {
        position: 'absolute',
        top: '33%', 
        left: '5%',
        right: '5%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: '55%',
        borderWidth: 2,
        borderColor: '#0F4A97',  
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,  
    },
    alertContent: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        marginVertical: 5,
    },
    pinText: {
        marginLeft: 10,
        textAlign:'justify',
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    fareContainer: {
        marginVertical: 10,
        paddingVertical: 3,
        borderTopWidth: 1,
        borderTopColor: 'white',
        marginHorizontal: 10,
    },
    fareText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    timerContainer: {
        marginVertical: 10,
        backgroundColor: '#0F4A97',
        padding: 10,
        borderRadius: 10,
        minWidth: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#0F4A97',
        padding: 15,
        borderRadius: 30,
        marginHorizontal: 10,
        minWidth: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default HomePage;
