import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const RC_List = ({ route, navigation }) => {
  const {rc} = useSelector(state=>state.documents)
  useEffect(() => {
    navigation.setOptions({ title: 'My PAN Card' });
  }, [navigation]);

  return (
    <View style={styles.container}>

      <Text style={styles.boxHeading}>Vehcile Number</Text>
      <TextInput
        style={styles.rcNumber}
        value={rc.number || 'Not Available'}
        editable={false}
        selectTextOnFocus={false} 
      />

      <View style={styles.imageContainer}>
        {rc.frontImage ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>RC Front</Text>
            <Image
              source={{ uri: rc.frontImage }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No Rc Front image available</Text>
        )}

        {rc.backImage ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>RC Back</Text>
            <Image
              source={{ uri: rc.backImage }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No RC Back image available</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'
  },
  boxHeading: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rcNumber: {
    height: 40,
    width: '100%',
    borderColor: '#eaf0fa',
    backgroundColor:'#eaf0fa',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
    color: 'black',
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imageLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 700,  
    height:200, 
    borderRadius: 0, 
    marginBottom: 10,
    resizeMode: 'cover',
  },
});

export default RC_List;
