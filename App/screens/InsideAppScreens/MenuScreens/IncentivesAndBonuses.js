import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; 
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

const IncentivesAndBonuses = ({ navigation }) => {
  const handleNavigate = (route) => {
    navigation.navigate(route); 
  };

  return (
    <LinearGradient colors={['#aaf1f6', '#FFFFFF']} start={{ x: 0, y: 0 }} end={{ x: 1.3, y: 0 }} style={styles.container}>
      <Image  source={require('../../../../assets/images/Incentives_bonuses.jpg')} style={styles.headerImage} />
      <View style={{padding: 20}}>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => handleNavigate('IncentivesPage')} 
        >
          <LinearGradient 
            colors={['#0F4A97', '#123B72']} 
            style={styles.cardBackground}
          >
            <View style={styles.cardContent}>
              <FontAwesomeIcon name="rupee" size={30} padding={10} color="#fff" />
              <Text style={[styles.cardText, { fontSize:20 }]}>Incentives</Text>
            </View>
            <MaterialIconsIcon name="arrow-forward" size={23} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => handleNavigate('SubscriptionDetails')} 
        >
          <LinearGradient 
            colors={['#0F4A97', '#123B72']} 
            style={styles.cardBackground}
          >
            <View style={styles.cardContent}>
              <Image 
                source={require('../../../../assets/images/subscribe.png')} 
                style={styles.subscriptionImage}
              />
               <View style={{ marginLeft: 10 }}>
                <Text style={styles.justTapText}>JUST TAP!</Text>
                <Text style={styles.cardText}>Subscription Plans</Text>
                <Text style={styles.subheadingText}>For More Benefits</Text>
              </View>
                
            </View>
            <MaterialIconsIcon name="arrow-forward" size={23} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => handleNavigate('Rewards')} 
        >
          <LinearGradient 
            colors={['#0F4A97', '#123B72']} 
            style={styles.cardBackground}
          >
            <View style={styles.cardContent}>
              <FontAwesomeIcon name='gift' size={30} padding={10}  color="#fff" />
              <Text style={[styles.cardText, { fontSize:20 }]}>Rewards</Text>
            </View>
            <MaterialIconsIcon name="arrow-forward" size={23} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>


      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  headerImage:{
   width:'100%',
   height: 250,
   zindex: -1,
  },
  card: {
    marginTop:-50,
    marginBottom: 70,
  },
  cardBackground: {
    height:100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 15,
    color: '#fff',
    
  },
  justTapText: {
    fontFamily: 'SofadiOne',
    fontSize: 17,
    color: 'white',
   
  },
  subscriptionImage: {
    width: 40,
    height: 50,
  },
  subheadingContainer: {
    marginTop: 10,
  },
  subheadingText: {
    fontSize: 13,
    color: '#efefef',
  },
});

export default IncentivesAndBonuses;
