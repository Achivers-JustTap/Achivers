import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';

const BestPerformance = ({ navigation }) => {

  useEffect(() => {  
    navigation.setOptions({ title: "Performance" });
  }, [navigation]);

  const ordersCompleted = 5;  
  const recentOrders = 5;  

  const getBarWidth = (orders) => {
    return `${(orders / 20) * 100}%`;
  };

  return (
      <ScrollView style={styles.container}>
        <View style={styles.boxWithShadow}>
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>Best Performance!</Text>
            <Text style={styles.subHeaderText}>Complete all orders to get benefits</Text>
          </View>
          <View style={styles.starsBox}>
            <View style={styles.starRow}>
              <FontAwesomeIcon name="star" size={20} color="#099b3a" />
              <Text style={styles.starText}>More Orders, First Preference</Text>
            </View>
            <View style={styles.starRow}>
              <FontAwesomeIcon name="star" size={20} color="#099b3a" />
              <Text style={styles.starText}>More Cancellation Fee</Text>
            </View>
            <View style={styles.starRow}>
              <FontAwesomeIcon name="star" size={20} color="#099b3a" />
              <Text style={styles.starText}>Low Suspension Risk</Text>
            </View>
          </View>
          <View style={styles.line} />
          <Text style={styles.footerText}>Be the best rider today and enjoy the benefits tomorrow</Text>
        </View>

        <View style={styles.boxWithShadow}>
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>In Last 20 Orders</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Number of Orders: 20</Text>
            <Text style={styles.infoText}>Orders Completed: {ordersCompleted}</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: getBarWidth(ordersCompleted) }]} />
            </View>
            <View style={styles.progressLabelContainer}>
              <Text style={styles.progressLabel}>0-9 Orders</Text>
              <Text style={styles.progressLabel}>10-15 Orders</Text>
              <Text style={styles.progressLabel}>16-20 Orders</Text>
            </View>
          </View>
          <View style={styles.line} />
          <Text style={styles.footerText}>Recently cancelled orders: {recentOrders}</Text>
        </View>

       
        <View style={styles.boxWithShadow1}>
          <View style={styles.emojiRow}>
            <Text style={[styles.emoji, styles.emojiBackground]}>🙂</Text>
            <Text style={styles.arrow}>→</Text>
            <Text style={[styles.emoji, styles.emojiBackground]}>😁</Text>
            <Text style={styles.arrow}>→</Text>
            <Text style={[styles.emoji, styles.emojiBackground]}>🥳</Text>
          </View>
          <Text style={styles.footerText}>Earn more by becoming the best rider</Text>


        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    mariginBottom: 100
  },
  boxWithShadow: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  boxWithShadow1: {
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  headerBox: {
    backgroundColor: '#0F4A97',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  starsBox: {
    padding: 10,
    borderRadius: 5,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#333',
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  footerText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4471ab',
  },
  infoBox: {
    paddingVertical: 10,
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBarContainer: {
    paddingVertical: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#0F4A97',
  },
  progressLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    color: '#333',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  emoji: {
    fontSize: 40,
  },
  emojiBackground: {
    backgroundColor: '#748daf',
    borderRadius: 10,
    padding: 5,
  },
  arrow: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#333',
  },
  knowMoreButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    width: '80%',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  knowMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default BestPerformance;