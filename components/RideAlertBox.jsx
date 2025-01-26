import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, Animated} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const RideAlertBox = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [timer, setTimer] = useState(20);
    const [alertOpacity] = useState(new Animated.Value(0));

  const pickupPoint = { lat: 12.9716, lon: 77.5946, address: "48-320/sri nilayam,ganesh Nagar, chintal,qutbullarpur,hyderadab,telangana" };
    const destinationPoint = { lat: 12.9352, lon: 77.6245, address: "Opp. Laxmikaka and Sashikala Theaters, Bhavani Nagar Moosapet, Near State Bank Of Hyderabad, Hyderabad, Telangana 500018, India" };


    useEffect(() => {
      if (showAlert) {
          const countdown = setInterval(() => {
              setTimer((prevTime) => {
                  if (prevTime === 0) {
                      clearInterval(countdown);
                      handleAlertClose();
                  }
                  return prevTime - 1;
              });
          }, 1000);

          return () => clearInterval(countdown);
      }
  }, [showAlert]);
    useEffect(() => {
      const alertInterval = setInterval(() => {
          if (!showAlert) {
              setTimer(40);
              setShowAlert(true);
              Animated.timing(alertOpacity, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: true,
              }).start();
          }
      }, 5000);

      return () => clearInterval(alertInterval);
  }, [showAlert]);

  const handleAlertClose = () => {
    setShowAlert(false);
    Animated.timing(alertOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    }).start();
};

const handleAlertAccept = () => {
    handleAlertClose();
};

const handleAlertSkip = () => {
    setTimer(20);
    handleAlertClose();
};
  return (
    <View>
       {showAlert && (
                <Animated.View style={[styles.alertBox, { opacity: alertOpacity }]}>
                    <View style={styles.alertContent}>
                        <View style={styles.pinContainer}>
                            <Icon name="map-pin" size={24} color="green" />
                            <Text style={styles.pinText}>Pickup: {pickupPoint.address}</Text>
                        </View>
                        <View style={styles.pinContainer}>
                            <Icon name="map-pin" size={24} color="red" />
                            <Text style={styles.pinText}>Destination: {destinationPoint.address}</Text>
                        </View>

                        <View style={styles.fareContainer}>
                            <Text style={styles.fareText}>Fare: ₹ 150.00</Text>
                            <Text style={styles.fareText}>Time: 15 mins</Text>
                            <Text style={styles.fareText}>Distance: 5 km</Text>
                           
                        </View>
                        <Text style={styles.fareText}>1.0 km to Pickup Point</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleAlertAccept} style={styles.button}>
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleAlertSkip} style={styles.button}>
                                <Text style={styles.buttonText}>Skip</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.timerContainer}>
                            <Text style={styles.timerText}>{timer}s</Text>
                        </View>
                    </View>
                </Animated.View>
            )}   
    </View>
  )
}

export default RideAlertBox

const styles = StyleSheet.create({

    alertBox: {
        flex: 1,
        position: 'relative',
        height:'100',
        width:'300',
        top: '30%',
        left: 3,
        right: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 15, 
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%', 
        borderWidth: 2,
        borderColor: '#0F4A97',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
        zIndex: 10,
        padding:10
    },
alertContent: {
    height: 400,
    width: 300,
    padding:30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
},
pinContainer: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    marginVertical: 5,
},
pinText: {
    marginLeft: 10,
    textAlign:'justify',
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
},
fareContainer: {
    marginVertical: 10,
    paddingVertical: 3,
    borderTopWidth: 1,
    borderTopColor: 'white',
    marginHorizontal: 10,
},
fareText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
},
timerContainer: {
    marginVertical: 10,
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 10,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
},
timerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
},
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
},
button: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 10,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
},
buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
},
})
