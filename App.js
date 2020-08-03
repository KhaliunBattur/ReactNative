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

  const { imageUri } = 'https://reactnative.dev/img/tiny_logo.png';
  if (imageUri) {
    return <ImageBackground source={imageUri}/>;
  }
  return (
    <View style={{ flex: 1 }}>
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
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
            if(this.Camera){
              // let photo = await this.Camera.takePictureAsync();
              const { uri } = await this.Camera.takePictureAsync();
              this.setState({ imageUri: uri });
              // console.log('photo', photo);
            }
          }}>
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
