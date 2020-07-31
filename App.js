import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View , TouchableOpacity, Image, StyleSheet} from 'react-native';
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
  });
  
  
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

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
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Camera style={{ flex: 1 }} type={type}>
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
              // snap = async () => {
              //   if (this.camera) {
              //     let photo = await this.camera.takePictureAsync();
              //   }
              // };
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
          
    </View>
  );

  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  // // useEffect(() => {
  // //   fetch('https://reactnative.dev/movies.json')
  // //     .then((response) => response.json())
  // //     .then((json) => setData(json.movies))
  // //     .catch((error) => console.error(error))
  // //     .finally(() => setLoading(false));
  // // }, []);
  // useEffect(() => {
  //   fetch('https://api.openweathermap.org/data/2.5/weather?appid=956640cba3a37f95b75f7e07b0b71528&q=tokyo')
  //     .then((response) => response.json())
  //     .then((json) => setData(json.weather))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  

  // return (
  //   <View style={{ flex: 1, padding: 24 }}>
  //     {isLoading ? <ActivityIndicator/> : (
  //       <FlatList
  //         data={data}
  //         keyExtractor={({ id }, index) => id}
  //         renderItem={({ item }) => (
  //           <Text>{item.main}, {item.description}</Text>
  //         )}
  //       />
  //     )}
  //   </View>
  // );
};
