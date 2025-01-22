import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const incentivesData = [
  { id: "1", time: "7:00 - 11:59 AM", incentive: "High Demand! Earn Upto ₹85 per ride" },
  { id: "2", time: "1:00 - 5:59 PM", incentive: "Mid-Day Bonus! Earn Upto ₹95 per ride" },
  { id: "3", time: "7:00 - 11:59 PM", incentive: "Evening Rush! Earn Upto ₹115 per ride" },
];

const IncentivesCarousel = ({ onRideAndEarnPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % incentivesData.length;
        flatListRef.current?.scrollToOffset({
          offset: nextIndex * width,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Text style={styles.timeText}>{item.time}</Text>
      <Text style={styles.incentiveText}>{item.incentive}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}> <Text style={{ fontSize: 19.5, fontFamily: 'SofadiOne' }}>JUST TAP!</Text> Incentives</Text>
      <FlatList
        ref={flatListRef}
        data={incentivesData}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        renderItem={renderItem}
        contentContainerStyle={styles.carousel}
        scrollEventThrottle={16}
        onMomentumScrollBegin={stopAutoScroll}
        onMomentumScrollEnd={startAutoScroll}
      />
      <TouchableOpacity style={styles.button} onPress={onRideAndEarnPress}>
        <Text style={styles.buttonText}>Ride and Earn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: 0,
    padding: 10,
    backgroundColor: "#0F4A97",
    borderBottomWidth: 1,
    borderColor: "#173F71",
    zIndex: 10,
    height: 130,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
  },
  carousel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItem: {
    width: width - 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    backgroundColor: "#1A72B8", 
  },
  timeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  incentiveText: {
    fontSize: 12,
    color: "#E0E0E0",
    textAlign:'center'
  },
  button: {
    marginTop: 5,
    backgroundColor: "#FFD700",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#0F4A97",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default IncentivesCarousel;
