import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FavLocation = () => {
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);

  const handleAddLocation = () => {
    if (location.trim() === '') {
      alert('Please enter a location');
      return;
    }

    if (locations.length > 0) {
      alert('You cannot select more than one location');
      return;
    }

    Alert.alert(
      'Confirm Location',
      `Are you sure you want to select "${location}" as your favorite location?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Canceled'),
          style: 'cancel',
        },
        {
          text: 'Sure',
          onPress: () => {
            setLocations([location]);
            setLocation('');
          },
        },
      ]
    );
  };

  const handleDeleteLocation = () => {
    Alert.alert(
      'Delete Location',
      'Are you sure you want to remove your favorite location?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Canceled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => setLocations([]),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.purposeText}>
          Add your favorite stops to pick up rides along your route—maximize your trips and earnings!
        </Text>
        <Text style={styles.headerText}>Add Your Favorite Location</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search to select location"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddLocation}>
          <Text style={styles.addButtonText}>Select Location</Text>
        </TouchableOpacity>
      </View>
      {locations.length > 0 && (
        <FlatList
          data={locations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.locationItem}>
              <Text style={styles.locationText}>{item}</Text>
              <TouchableOpacity onPress={handleDeleteLocation}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          1. You can change this location once every 15 days only.
        </Text>
        <Text style={styles.instructionText}>
          2. You can use this favorite location option only two times a day.
        </Text>
        <Text style={styles.instructionText}>
          3. You can add only one location.
        </Text>
      </View>
    </View>
  );
};

export default FavLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c2dcff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  purposeText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
    fontStyle: 'italic',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#0F4A97',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  instructions: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});
