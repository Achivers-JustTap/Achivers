import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';

const AadharImage = ({ navigation,route }) => {
  const { name } = route.params;
  const [permission, requestPermission] = useCameraPermissions();
  const [base64Image, setBase64Image] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [cameraView, setCameraView] = useState('front'); // Manage camera view
  const cameraRef = useRef(null);

  useEffect(() => {
    console.log("Base64 Image: ", base64Image);
  }, [base64Image]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();

        if (photo && photo.uri) {
          // Convert the image to base64
          const { base64 } = await manipulateAsync(photo.uri, [], { base64: true });
          setBase64Image(`data:image/jpeg;base64,${base64}`);
          setShowImage(true);
        } else {
          console.error('Failed to capture photo: photo or photo.uri is undefined');
        }
      } catch (error) {
        console.error('An error occurred while taking the picture:', error);
      }
    }
  }

  const handleUpload = () => {
    console.log('Upload button pressed');
    navigation.navigate('DriverLicense',{name});
  };

  const handleRetake = () => {
    setShowImage(false);
    setBase64Image(null);
  };

  return (
    <View style={styles.container}>
      {showImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: base64Image }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleUpload}>
              <Text style={styles.text}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRetake}>
              <Text style={styles.text}>Retake</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView style={styles.camera} ref={cameraRef} facing={cameraView}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCameraView('back')}>
              <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCameraView('front')}>
              <Text style={styles.text}>Front</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
  },
  camera: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems:"flex-end",
    justifyContent: 'space-around',
    padding:10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom:70
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default AadharImage;
