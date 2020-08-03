import React, { useEffect, useState } from 'react';
import { Text, View , TouchableOpacity,Button, StyleSheet, ImageBackground} from 'react-native';
import { Camera } from 'expo-camera';

export default App = () => {


  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
    textCenter: {
      textAlign: 'center', // <-- the magic
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 0,
      backgroundColor: 'yellow',
    },
  });
  
  
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState('https://reactnative.dev/img/tiny_logo.png');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);



  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  takePicture = async() => {
    if(this.Camera){
      const { uri } = await this.Camera.takePictureAsync();
      console.log('uri', uri);
      setImageUri(uri);
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={{ uri: imageUri}}/>
      <Camera style={{ flex: 1 }} ref={ref => {this.Camera = ref;}} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => this.takePicture()}>
            <View style={{ 
               borderWidth: 2,
               borderRadius:"50%",
               borderColor: 'white',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:"50%",
                 borderColor: 'white',
                 height: 40,
                 width:40,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
          
    </View>
  );
};
