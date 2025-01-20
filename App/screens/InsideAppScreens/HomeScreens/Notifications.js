import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Notifications = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={["#0F4A97", "#82C8E9"]}
        style={styles.header}
      >
        <Text style={styles.title}>
          Welcome to <Text style={styles.justTapText}>JUST TAP</Text> Earner!
        </Text>
      </LinearGradient>

      <Image
        style={styles.image}
        source={require('../../../../assets/images/NotificationsWelcome.jpg')}
      />

      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          We're thrilled to have you as part of the Just Tap Community. Start your journey today and unlock earning opportunities with just a tap. Drive smarter, earn better, and enjoy the ride!
        </Text>
      </View>
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  justTapText: {
    fontFamily: 'SofadiOne',
    fontSize: 28,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  messageContainer: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
  },
});
