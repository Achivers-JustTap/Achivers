import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, FlatList,Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; 
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';  
import { useSelector } from 'react-redux';

const Menu = ({ navigation, route }) => {
   const{name,profilePicture} = useSelector(state=>state.user); 

  const [rating, setRating] = useState(0);

  const DATA = [
    { id: '1', title: 'Refer Friends', route: 'ReferFriends', icon: 'users', type: 'FontAwesome' },
    { id: '2', title: 'Earnings', route: 'Earnings', icon: 'money', type: 'FontAwesome' },
    { id: '3', title: 'My Loan', route: 'MyLoan', icon: 'bank', type: 'FontAwesome' },
    { id: '4', title: 'Incentives and Bonuses', route: 'IncentivesAndBonuses', icon: 'rupee', type: 'FontAwesome' },
    { id: '5', title: 'Service Manager', route: 'ServiceManager', icon: 'dashboard', type: 'MaterialIcons' },
    { id: '6', title: 'Account', route: 'ProfiledetailsPage', icon: 'cogs', type: 'FontAwesome' },
    { id: '7', title: 'Help', route: 'Help', icon: 'help', type: 'MaterialIcons' }
  ];

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleProfileImagePress = () => {
    navigation.navigate('ProfiledetailsPage');
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          name={i <= rating ? 'star' : 'star-o'} 
          size={18}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  const renderItem = ({ item }) => {
    const IconComponent = item.type === 'MaterialIcons' ? MaterialIconsIcon : FontAwesomeIcon;
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate(item.route)}>
        <View style={styles.itemContent}>
          <IconComponent name={item.icon} size={20} color="#0F4A97" style={styles.itemIcon} />
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.ratingContainer}>
        <View style={styles.starsContainer}>
          {renderStars()} 
        </View>
        <Text style={styles.ratingText}>{rating.toFixed(1)}/5</Text> 
      </View>

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleProfileImagePress}>
          <View style={styles.profileContainer}>
            {/* Uncomment and provide the image URL here */}
            <Image
             source={{ uri: profilePicture }} 
              style={styles.profileImage}
              onError={(error) => console.log('Error loading image: ', error)}
            /> 
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20, 
  },
  headerContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1,
  },
  name: {
    marginTop: 53,
    fontSize: 35,
    fontWeight: 'bold',  
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10, 
  },
  ratingText: {
    fontSize: 16,
    color: '#888',
  },
  profileContainer: {
    width: 75,
    height: 75,
    marginTop: 43,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#0F4A97',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  itemContainer: {
    padding: 15,
    top:30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Menu;
