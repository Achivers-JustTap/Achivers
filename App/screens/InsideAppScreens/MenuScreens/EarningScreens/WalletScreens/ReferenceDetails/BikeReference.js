import { StyleSheet, Text, View, FlatList, TouchableOpacity, Share, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const BikeReference = () => {
    const [referralCode] = useState('REFJT00');
    const data = [
        { id: '1', text: '3 friends get activated', date: 'Before Some Date', amount: '₹0', description: 'You earn' },
        { id: '2', text: 'Friend completes 1 ride', date: '3 days after activation', amount: '₹0', description: 'You earn' },
        { id: '3', text: 'Friend completes 5 rides', date: '5 days after activation', amount: '₹0', description: 'You earn' },
        { id: '4', text: 'Friend completes 15 rides', date: '10 days after activation', amount: '₹0', description: 'You earn' },
        { id: '5', text: 'Friend completes 30 rides', date: '15 days after activation', amount: '₹0', description: 'You earn' },
        { id: '6', text: 'Friend completes 100 rides', date: '25 days after activation', amount: '₹0', description: 'You earn' },
    ];

    const shareReferral = async () => {
        try {
            await Share.share({
                message: `Use my referral code ${referralCode} to sign up and enjoy rewards!`,
            });
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Ionicons name="checkmark-circle" size={24} color="#0F4A97" style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{item.text}</Text>
                <Text style={styles.smallText}>{item.date}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={styles.smallText}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Earn Rewards—Invite & Get ₹0 Per Referral!</Text>
            <Text style={styles.subtitle}>How It Works?</Text>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />

            <TouchableOpacity style={styles.shareButton} onPress={shareReferral}>
                <Text style={styles.shareButtonText}>Refer a Friend</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#0F4A97',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    icon: {
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    smallText: {
        fontSize: 12,
        color: '#666',
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F4A97',
    },
    shareButton: {
        backgroundColor: '#0F4A97',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    shareButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default BikeReference;
