import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Animated, Pressable, StyleSheet } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const EarningsLayout = ({ navigation, activeTab, onTabPress, children }) => {
  const [indicatorPosition] = useState(new Animated.Value(0));

  useEffect(() => {
    const tabIndex = ['Today', 'Wallet', 'History'].indexOf(activeTab);

    Animated.spring(indicatorPosition, {
      toValue: tabIndex * 120, 
      useNativeDriver: false
    }).start();
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon name="arrow-left" size={20} color="black" />
          <Text style={styles.headerText}>My Earnings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('Help')}>
        <FontAwesomeIcon name="hands-helping" size={15} color="#fff" />
        <Text style={styles.helpText}>Help</Text>
      </TouchableOpacity>


      <View style={styles.navContainer}>
        {['Today', 'Wallet', 'History'].map((item, index) => (
          <Pressable
            key={item}
            onPress={() => onTabPress(item)}
            style={({ pressed }) => [
              styles.navItem,
              pressed ? styles.pressedNavItem : null,
            ]}
          >
            <Text
              style={[
                styles.navItemText,
                item === activeTab ? styles.activeNavItemText : null,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}


        <Animated.View
          style={[
            styles.indicator,
            { transform: [{ translateX: indicatorPosition }] },
          ]}
        />
      </View>

   
      <View style={styles.contentContainer}>
        {children}  
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 30,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  helpButton: {
    position: 'absolute',
    top: 12,
    right: 15,
    backgroundColor: '#0F4A97',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  helpText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  navContainer: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
    position: 'relative',
  },
  navItem: {
    padding: 10,
    borderRadius: 5,
  },
  navItemText: {
    color: 'white',
    fontSize: 17,
  },
  activeNavItemText: {
    color:"#0cdfdf",
    fontWeight: 'bold',
  },
  pressedNavItem: {
    backgroundColor: '#0cc0df',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 120, 
    height: 5,
    backgroundColor: '#0cdfdf',
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
});

export default EarningsLayout;
