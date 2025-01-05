import React, { useState } from 'react';
import { 
  Image, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Animated 
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const ServiceManager = ({ navigation }) => {

  const [services, setServices] = useState([
    { id: 1, name: 'Bike Metro', image: require('../../../../assets/images/moto.png'), altImage: require('../../../../assets/images/bike top right.png'), active: false },
    { id: 2, name: 'Bike', image: require('../../../../assets/images/moto.png'), altImage: require('../../../../assets/images/bike top right.png'), active: false },
    { id: 3, name: 'Bike Boost', image: require('../../../../assets/images/moto.png'), altImage: require('../../../../assets/images/bike top right.png'), active: false },
    { id: 4, name: 'Parcel Delivery', image: require('../../../../assets/images/parcel.png'), altImage: require('../../../../assets/images/parcel top right.png'), active: false },
    { id: 5, name: 'Groceries Delivery', image: require('../../../../assets/images/Groceries.png'), altImage: require('../../../../assets/images/GroceriesDeliveryTopRight.png'), active: false },
  ]);

  const [imageAnimation] = useState(new Animated.Value(0));
  const [fadeAnimation] = useState(new Animated.Value(0));


  const activateService = (id) => {
    const updatedServices = services.map(service => 
      service.id === id ? { ...service, active: true } : service
    );
    setServices(updatedServices);

    Animated.timing(imageAnimation, {
      toValue: 1,
      duration: 1500, 
      useNativeDriver: true,
    }).start();

   
    setTimeout(() => {
      Animated.timing(fadeAnimation, {
        toValue: 1, 
        duration: 900,
        useNativeDriver: true,
      }).start();

    
      setServices(prevServices =>
        prevServices.map(service => 
          service.id === id ? { ...service, active: true } : service
        )
      );
    }, 2000); 

  
    setTimeout(() => {
      resetServiceState(id);
     
      addDeactivatedService(id);
    }, 4000); 
  };


  const resetServiceState = (id) => {
    const updatedServices = services.map(service =>
      service.id === id ? { ...service, active: false } : service
    );
    setServices(updatedServices);
    fadeAnimation.setValue(0);
    imageAnimation.setValue(0); 
  };

 
  const addDeactivatedService = (id) => {
    const updatedServices = services.map(service => 
      service.id === id ? { ...service, active: false, duplicate: true } : service
    );
    setServices(updatedServices);
  };

  // Deactivate service
  const deactivateService = (id) => {
    const updatedServices = services.map(service =>
      service.id === id ? { ...service, active: false, duplicate: false } : service
    );
    setServices(updatedServices);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon name="arrow-left" size={20} color="black" />
          <Text style={styles.headerText}>Service Manager</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('ServiceManagerHelp')}>
        <FontAwesomeIcon name="hands-helping" size={15} color="#fff" />
        <Text style={styles.helpText}>Help</Text>
      </TouchableOpacity>

      <Image source={require('../../../../assets/images/ServiceManagertop.jpg')} style={styles.headerImage} />

      <View style={styles.serviceContainer}>
        {services.map(service => (
          <View 
            key={service.id} 
            style={[
              styles.serviceBox, 
              service.active && styles.activatedBox, 
    service.duplicate && styles.deactivatedBox 
            ]}
          >
            {service.active && !service.duplicate && (
              <Animated.View
                style={[
                  styles.altImageContainer,
                  {
                    transform: [
                      {
                        translateX: imageAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 300], 
                        }),
                      },
                    ],
                  }
                ]}>
                <Image source={service.altImage} style={styles.altImage} />
              </Animated.View>
            )}

           
            {service.active && !service.duplicate && (
              <Animated.Text
                style={[
                  styles.activatedText,
                  {
                    opacity: fadeAnimation, 
                  },
                ]}
              >
                Activated!
              </Animated.Text>
            )}

           
            {!service.active && !service.duplicate && (
              <>
                <Image source={service.image} style={styles.serviceImage} />
                <Text style={styles.serviceText}>{service.name}</Text>
              </>
            )}

         
            {!service.active && !service.duplicate && (
              <TouchableOpacity 
                style={styles.activateButton} 
                onPress={() => activateService(service.id)} 
              >
                <Text style={styles.activateButtonText}>Activate</Text>
              </TouchableOpacity>
            )}

           
            {service.duplicate && (
              <>
              <Image source={service.image} style={styles.serviceImage} />
              <Text style={styles.serviceText}>{service.name}</Text>
            
              <TouchableOpacity 
                style={styles.deactivateButton} 
                onPress={() => deactivateService(service.id)} 
              >
                <Text style={styles.deactivateButtonText}>Deactivate</Text>
              </TouchableOpacity>
              </>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ServiceManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
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
  headerImage: {
    width: '100%',
    height: 230,
  },
  serviceContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  serviceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  activatedBox: {
    backgroundColor: '#28a745', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    position: 'relative', 
  },
  altImageContainer: {
    position: 'absolute',
    top: 23,
    left: 0,
  },
  altImage: {
    width: 60,
    height: 60,
  },
  activatedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    position: 'relative',
    top: '50%', 
    left: 10,
    transform: [{ translateX: -20 }, { translateY: -15 }],
  },
  serviceImage: {
    width: 65,
    height: 65,
    marginRight: 15,
  },
  serviceText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  activateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0F4A97',
    borderRadius: 30,
    marginLeft: 15, 
  },
  activateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deactivatedBox: {
    backgroundColor: '#d4edda',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    position: 'relative', 
  },
  deactivateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 30,
    marginLeft: 25, 
  },
  deactivateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
