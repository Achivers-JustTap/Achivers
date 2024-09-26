import { StyleSheet, SafeAreaView, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AppMapView from '../../../components/AppMapView';
import * as Location from 'expo-location';
import { UserLocationContext } from '../../Context/UserLocationContext';

const HomePage = ({ navigation }) => {
    const {location, setLocation} = useContext(UserLocationContext);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
            console.log(location);
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapContainer}>
                <AppMapView style={styles.map} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    mapContainer: {
        flex: 1,
        paddingTop: 30,
        borderRadius: 10, 
        overflow: 'hidden', 
    },
    map: {
        flex: 1,
    },
});

export default HomePage;
