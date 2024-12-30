import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Clipboard,
  Share,
  Image,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReferFriends = ({ navigation }) => {
  
  const [referralCode] = useState('REFJT00');

  
  const referralData = [
    {
      id: '1',
      type: 'Bike Referral',
      amount: 0,
      icon: require('../../../../assets/images/moto.png'),
      route: 'BikeReference',
    },
    {
      id: '2',
      type: 'Car Referral',
      amount: 0,
      icon: require('../../../../assets/images/car.png'),
      route: 'CarReference', 
    },
    {
      id: '3',
      type: 'Auto Referral',
      amount: 0,
      icon: require('../../../../assets/images/auto.png'),
      route: 'AutoReference', 
    },
  ];

  
  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
    Alert.alert('Copied!', 'Referral code copied to clipboard.');
  };

  
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
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate(item.route)} 
    >
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.listText}>{item.type}</Text>
      <Text style={styles.amount}>₹ {item.amount}</Text>
      <Ionicons name="chevron-forward" size={20} color="#333" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
  
      <Text style={styles.title}>Refer Your Buddy</Text>

  
      <View style={styles.earningsBox}>
        <Text style={styles.earningsText}>Total Earnings: ₹ 0</Text>
      </View>

   
      <FlatList
        data={referralData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      
      <View style={styles.referralCodeContainer}>
        <ImageBackground
          source={require('../../../../assets/images/stars.png.png')}
          style={styles.backgroundImage}
        >
          <Text style={styles.referralText}>Your Referral Code:</Text>
          <View style={styles.codeBox}>
            <Text style={styles.referralCode}>{referralCode}</Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Ionicons name="copy" size={24} color="#0F4A97" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

    
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0F4A97',
    marginBottom: 20,
  },
  earningsBox: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  earningsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
    width: 40,
    height: 40,
    marginRight: 15,
  },
  listText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F4A97',
    marginRight: 10,
  },
  referralCodeContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#0F4A97',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  referralText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  backgroundImage: {
    padding: 10,
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  referralCode: {
    fontSize: 18,
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

export default ReferFriends;