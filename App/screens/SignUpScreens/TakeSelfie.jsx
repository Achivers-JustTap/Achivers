import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

const Takeselfie = ({ navigation, route }) => {
  const { name } = route.params;

  useEffect(() => {
    console.log('Takeselfie component mounted');
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleTakeSelfie = () => {
    navigation.navigate('ProfileImageScreen', { name });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello, {name}</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Text style={{color:'white',padding:20,marginBottom : 50}}>
        <Text style={{ color:'white',fontSize: 19, fontFamily: 'SofadiOne' }}>Just Tap!</Text>
        {' '}to complete your profile </Text>
        <TouchableOpacity
          style={styles.Button}
          onPress={handleTakeSelfie}
        >
          <Text style={styles.ButtonText}>Take Selfie</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#0F4A97', 
  },
  title:{
    paddingTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  Button: {
    backgroundColor: 'white', 
    padding: 15,
    borderRadius: 8, 
  },
  ButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold', 
  },
});

export default Takeselfie;