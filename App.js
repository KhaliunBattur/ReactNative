import React, { Component } from 'react'
import { Text, View ,ActivityIndicator,FlatList, TouchableOpacity,Button, StyleSheet, ImageBackground} from 'react-native';
import { Camera } from 'expo-camera';
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
      this.setState({base64: data.base64});
      // console.log("base64: "+this.state.base64);
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
          username: "Khaliun",
          // data: this.state.base64
          date:null
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
