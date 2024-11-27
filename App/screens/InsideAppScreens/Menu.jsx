import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';  

const Menu = ({ navigation, route }) => {
  const vehicleAltImage = route.params?.vehicleAltImage; 
  const { RC,rcFrontImage,rcBackImage,rcFrontFile,rcBackFile,panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile,licenseFrontFile,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile} = route.params;

  const [rating, setRating] = useState(0);

  const DATA = [
    { id: '1', title: 'Inbox' ,route:'Inbox'},
    { id: '2', title: 'Refer Friends',route:'ReferFriends' },
    { id: '3', title: 'Oppurtunities',route:'Oppurtunities'},
    { id: '4', title: 'Earnings',route:'Earnings' },
    { id: '6', title: 'Account',route:'ProfiledetailsPage'},
    { id: '7', title: 'Help',route:'Help'},
    { id: '8', title: 'Tips & Info',route:'TipsandInfo' },
  ];

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleProfileImagePress = () => {
    navigation.navigate('ProfiledetailsPage', {
      RC,rcFrontImage,rcBackImage,rcFrontFile,rcBackFile,panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile,licenseFrontFile,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile
    });
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-o'} 
          size={18}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate(item.route,{
      profileImageBase64, name, email, phoneNumber, gender, dateOfBirth
  })}>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

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
        {profileImageBase64 ? (
          <TouchableOpacity onPress={handleProfileImagePress}>
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: profileImageBase64 }} 
                style={styles.profileImage}
                onError={(error) => console.log('Error loading image: ', error)}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <Text>No profile image available</Text>
        )}
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
    fontSize: 30,
    fontWeight: 'bold',  
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
    marginTop:43,
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Menu;
