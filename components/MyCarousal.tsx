import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions, Text, Animated } from 'react-native';

const images = [
  { src: require('../assets/carousel/vehicles2.jpeg'), text: 'Do you have Vehicle? Then start earnings. Register today and be a member of JUST TAP' },
  { src: require('../assets/carousel/documents3.jpeg'), text: 'Registration: Just need a few documents to start your earnings. To Resgister You need Just Aadhar, PAN Card, and Your Driver Lisence' },
  { src: require('../assets/carousel/friendlyapp2.jpeg'), text: 'Happy Drivers: We are there with you, a very friendly app for Drivers' },
  { src: require('../assets/carousel/commission2.jpeg'), text: 'Less Commission: The earnings belong to you. We Take Less Commission compared to market, so that driver get benefited.' },
  { src: require('../assets/carousel/loan2.jpeg'), text: 'Get Loans Instantly: Just 150 rides, you are eligible for a loan. Get a loan of 10K - Bike, 20K - Auto, 30K - Car by completing the rides' },
  { src: require('../assets/carousel/insurance2.png'), text: 'Get Insurance: With our insurance, you’re never alone. We stand behind you, offering the support and protection you deserve' },
];

const MyCarousel = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item, index }: { item: { src: any; text: string }; index: number }) => {
    const isFocused = index === currentIndex;

    const scale = new Animated.Value(isFocused ? 1 : 0.8);
    const opacity = new Animated.Value(isFocused ? 1 : 0.5);

    Animated.spring(scale, {
      toValue: isFocused ? 1 : 0.8,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: isFocused ? 1 : 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View style={[styles.itemContainer, { transform: [{ scale }], opacity }]}>
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>{item.text}</Text>
        </View>
        <Animated.Image source={item.src} style={styles.image} />
      </Animated.View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={images}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      onScrollToIndexFailed={(info) => {
        console.warn('Scroll to index failed', info);
      }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    width: Dimensions.get('window').width - 3,
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  image: {
    flex: 0.7,
    height: 200,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  captionContainer: {
    flex: 0.5,
    padding: 6,
    borderRadius: 10,
    justifyContent: 'center',
  },
  caption: {
    fontSize: 16,
    color: '#A0D6C0',
    textAlign: 'left',
    fontWeight: '500',
    flexWrap: 'wrap',
  },
});

export default MyCarousel;
