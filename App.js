import React, { useEffect, useState } from 'react';
import { Text, View ,ActivityIndicator,FlatList, TouchableOpacity,Button, StyleSheet, ImageBackground} from 'react-native';
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
  const [base64, setBase64] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState("");

  state = {
      test: "Hello"
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    fetch('https://api.openweathermap.org/data/2.5/weather?appid=956640cba3a37f95b75f7e07b0b71528&q=tokyo')
          .then((response) => response.json())
          .then((json) => setData(json.weather))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
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
      // let data = await 
      // const { myBase64 } = await this.Camera.takePictureAsync({base64: true,});
      // const base64image = await RNFS.readFile(uri, 'base64');
      this.Camera.takePictureAsync({base64: true,}).then(data => {
        setBase64(data.base64);
        console.log("base64:", base64);
      //   // console.log(data.base64);
      //   // this.setState({test:"Hello test"})
        });
      // console.log("uri", uri);
      console.log("base64image:", base64image);
      // setImageUri(uri);
      getMoviesFromApi();
    }
  }

  const getMoviesFromApi = async () => {
    try {
      let response = await fetch('http://18.190.16.127:3005/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auth: "testing-api",
          timestamp: 1000,
          username: "Khaliun",
          data: base64
          })
      });  
      let json = await response.json()
      console.log("response", json);
      setResponse(json.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
        {/* {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.main}, {item.description}</Text>
            )}
          />
        )} */}
      <ImageBackground style={{ flex: 1 }} source={{ uri: imageUri}}/>
      <Text>Message: {response}</Text>
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
