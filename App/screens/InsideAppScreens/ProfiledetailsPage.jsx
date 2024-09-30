import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const ProfiledetailsPage = ({ route }) => {
  const { name, email, phoneNumber, gender, dateOfBirth, profileImageBase64 } = route.params; // Get profile details

  return (
    <View style={styles.container}>
      {profileImageBase64 && (
        <Image
          source={{ uri: `data:image/png;base64,${profileImageBase64}` }}
          style={styles.profileImage}
        />
      )}
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Email: {email}</Text>
      <Text style={styles.text}>Phone Number: {phoneNumber}</Text>
      <Text style={styles.text}>Gender: {gender}</Text>
      <Text style={styles.text}>Date of Birth: {dateOfBirth}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfiledetailsPage;
