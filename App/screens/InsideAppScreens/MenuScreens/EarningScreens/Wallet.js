import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import AllTransactions from './WalletScreens/AllTransactionPage';
import Pending from './WalletScreens/PendingPage';

const Wallet = () => {
  const navigation = useNavigation();

 
  const [activeTab, setActiveTab] = useState('All Transactions');

  return (
    <ScrollView style={styles.container}>
   
      <View style={styles.balanceBox}>
        <Text style={styles.balanceText}>Your Balance</Text>
        <Text style={styles.balanceAmount}>₹2500</Text>
      </View>

      <View style={styles.rechargeBox}>
        <TouchableOpacity
          style={styles.rechargeBtn}
          onPress={() => navigation.navigate('RechargePage')} 
        >
          <Text style={styles.rechargeText}>Recharge Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rechargeBtnSecondary}
          onPress={() => navigation.navigate('BuddyRecharge')}
        >
          <Text style={styles.rechargeText}>Ask Your Buddy to Recharge</Text>
        </TouchableOpacity>
      </View>

      
      <TouchableOpacity
        style={styles.referEarnBox}
        onPress={() => navigation.navigate('ReferencePage')} 
      >
        <Text style={styles.referText}>Refer and Earn Up to ₹3000</Text>
      </TouchableOpacity>

   
      <View style={styles.tabNav}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'All Transactions' && styles.tabButtonActive]}
          onPress={() => setActiveTab('All Transactions')}
        >
          <Text style={styles.tabText}>All Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Pending' && styles.tabButtonActive]}
          onPress={() => setActiveTab('Pending')}
        >
          <Text style={styles.tabText}>Pending</Text>
        </TouchableOpacity>
      </View>

     
      <View style={styles.tabContent}>
        {activeTab === 'All Transactions' && <AllTransactions />}
        {activeTab === 'Pending' && <Pending />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20
  },
  balanceBox: {
    backgroundColor: '#0F4A97',
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    alignItems: 'center',
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  balanceText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 40,
    marginTop: 10,
    fontWeight: 'bold',
  },
  rechargeBox: {
    marginBottom: 25,
  },
  rechargeBtn: {
    backgroundColor: '#FBC02D',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#FBC02D',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  rechargeBtnSecondary: {
    backgroundColor: '#89d48c',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#A5D6A7',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  rechargeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  referEarnBox: {
    backgroundColor: '#FF7043',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  referText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  tabNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0F4A97',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  tabButton: {
    backgroundColor: '#B0BEC5',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#B0BEC5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  tabButtonActive: {
    backgroundColor: '#FFEB3B',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#FFEB3B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#0F4A97',
    fontWeight: 'bold',
  },
  tabContent: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  contentText: {
    fontSize: 16,
    color: '#0F4A97',
  },
});

export default Wallet;
