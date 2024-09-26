import { Image, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserLocationContext } from '../App/Context/UserLocationContext';

export default function AppMapView() {
    const { location } = useContext(UserLocationContext);

   
    return location?.latitude ? (
        <View style={styles.container}>
            <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: location.latitude, 
                    longitude: location.longitude,
                    latitudeDelta: 0.0422,
                    longitudeDelta: 0.0421,
                }}
            >
            <Marker
            coordinate={{
                latitude:location?.latitude,
                longitude: location.longitude,
            }}>
            </Marker>
            </MapView>
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
