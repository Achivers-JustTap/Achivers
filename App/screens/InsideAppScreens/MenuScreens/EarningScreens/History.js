import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EarningsLayout from '../../../../../components/EarningsLayout';

const History = ({ navigation }) => {
  const handleTabPress = (tab) => {
    if (tab === 'Today') {
      navigation.navigate('Earnings');
    } else if (tab === 'Wallet') {
      navigation.navigate('Wallet');
    } else if (tab === 'History') {
      navigation.navigate('History');
    }
  };

  return (
    <EarningsLayout
      navigation={navigation}
      activeTab="History"
      onTabPress={handleTabPress}
    >
      <View style={styles.content}>
        <Text>Earnings History</Text>
      </View>
    </EarningsLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default History;
