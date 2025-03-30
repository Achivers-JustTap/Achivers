import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';

const CustomerDetails = ({ navigation }) => {
    const slideAnim = useRef(new Animated.Value(500)).current;
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        setTimeout(() => {
            const fetchedData = {
                name: 'John Doe',
                phone: '+91 9876543210',
                pickup: 'Ganesh Nagar, Hyderabad',
                destination: 'Moosapet, Hyderabad',
            };
            setCustomerData(fetchedData);
            setLoading(false);
        }, 2000); 

        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.heading}>Customer Details</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0F4A97" />
            ) : (
                <>
                    <Text style={styles.detail}>Name: {customerData.name}</Text>
                    <Text style={styles.detail}>Phone: {customerData.phone}</Text>
                    <Text style={styles.detail}>Pickup Location: {customerData.pickup}</Text>
                    <Text style={styles.detail}>Destination: {customerData.destination}</Text>
                </>
            )}

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default CustomerDetails;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        elevation: 10,
        height: 500,
        alignItems: 'center',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detail: {
        fontSize: 18,
        marginVertical: 5,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#0F4A97',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
