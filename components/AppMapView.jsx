import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

export default function AppMapView() {
    const [captainCoords, setCaptainCoords] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            setCaptainCoords(coords);

            // 🔁 Call Google Maps API for reverse geocoding
            const apiKey = 'AIzaSyDA7QxXq1FaHe3W4xLDgCF5XSB6n-RN8TA';
            try {
                const res = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${apiKey}`
                );
                const result = res.data.results[0];
                if (result) setAddress(result.formatted_address);
            } catch (err) {
                console.error('Geocoding error:', err);
            }
        })();
    }, []);

    return captainCoords ? (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: captainCoords.latitude,
                    longitude: captainCoords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker coordinate={captainCoords} title="Captain" />
            </MapView>

           
        </View>
    ) : (
        <View style={styles.container}>
            <Text>Getting location...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    infoBox: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        elevation: 5,
    },
});
