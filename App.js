import React, { Component } from 'react'
import { Text, View ,ActivityIndicator,FlatList, TouchableOpacity,Button, StyleSheet, ImageBackground} from 'react-native';
import { Camera } from 'expo-camera';
import ImgToBase64 from 'react-native-image-base64';

const axios = require('axios');

class App extends Component {
  state = {
    imageUri: "https://reactnative.dev/img/tiny_logo.png",
    type: Camera.Constants.Type.back,
    base64: "",
    message: "",
  }

  takePicture = async() => {
    if(this.Camera){
      const data = await this.Camera.takePictureAsync({ base64: true });
      console.log("data: "+data.uri);
      this.login();
    }
  }
  
  
  
  login = async () => {
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
          username: "Joli",
          // data: this.state.base64,
          data: "data:image/jpeg;base64,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"
          })
      });  
      let json = await response.json();
      console.log("json", json);
      this.setState({message: json.message});
    } catch (error) {
      console.error(error);
    }
  };
 render() {
    return (
        <View style={{ flex: 1 }}>
        <ImageBackground style={{ flex: 1 }} source={{ uri: this.state.imageUri}}/>

        <Text>Message: {this.state.message}</Text>
        <Camera style={{ flex: 1 }} ref={ref => {this.Camera = ref;}} type={this.state.type}>
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
                this.setState({type:
                  this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                });
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
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})

export default App;
