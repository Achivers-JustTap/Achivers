import { StyleSheet, SafeAreaView, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AppMapView from '../../../components/AppMapView';
import * as Location from 'expo-location';
import { UserLocationContext } from '../../Context/UserLocationContext';
import { useSelector } from 'react-redux';

const HomePage = ({ navigation }) => {
    const { location, setLocation } = useContext(UserLocationContext);
    const [errorMsg, setErrorMsg] = useState(null);
    const [searchText, setSearchText] = useState('');
    const userImaageUrl = useSelector((state) => state.user.profilePicture);
    console.log(userImaageUrl);
    // const[base64Image,setBase64Image]= useState(profileImageBase64);
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
    
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate(item.route,)}>
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
      );

      const image1={}
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>JUST TAP!</Text>

                {userImaageUrl ? (
                    <TouchableOpacity onPress={handleProfileImagePress}>
                        <View style={styles.profileContainer}>
                            <Image
                                style={styles.profileImage}
                                source={{ uri: userImaageUrl }} 
                                onError={(error) => console.log('Error loading image: ', error)}
                            />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <Text>No profile image available</Text>
                )}
            </View>

            <View style={styles.mapContainer}>
                <AppMapView style={styles.map} />

                
                <View style={styles.searchBackground}>
                    <TextInput
                        style={styles.searchBox}
                        placeholder="Search"
                        placeholderTextColor="white"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                <View style={styles.statsContainer}>
               
                    <View style={styles.leftStats}>
                        <Text style={styles.titleText}>Today's Earnings</Text>
                        <Text style={styles.valueText}>₹ 0.00</Text>
                    </View>

                    <View style={styles.rightStats}>
                        <Text style={styles.titleText}>Driving Time</Text>
                        <Text style={styles.valueText}>00:00:00</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        fontFamily: 'SofadiOne',
        fontSize: 35,
        color: '#0F4A97',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
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
    mapContainer: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    map: {
        flex: 1,
    },
    searchBackground: {
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: [{ translateX: -150 }],
        backgroundColor: 'white',
        borderColor: '#0F4A97',
        borderWidth: 3,
        borderRadius: 25,
        height: 45,
        width: 300,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBox: {
        height: 37,
        width: 290,
        borderColor: '#0F4A97',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#0F4A97',
        paddingHorizontal: 15,
        color: 'white',
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
