import React, { Component } from 'react'
import { Text, View , TextInput, TouchableOpacity,Button, SafeAreaView, StyleSheet, ImageBackground} from 'react-native';
import { Camera } from 'expo-camera';

const axios = require('axios');

class App extends Component {
  state = {
    imageUri: "https://reactnative.dev/img/tiny_logo.png",
    type: Camera.Constants.Type.back,
    base64: "",
    username: "",
    status: "",
    isLoading: false,
  }

  takePicture = async() => {
    if(this.Camera){
      const data = await this.Camera.takePictureAsync({ base64: true });
      this.setState({imageUri: data.uri});
      this.setState({base64: data.base64});
      this.login();
    }
  }
  
  
  
  login = async () => {
    try {
      this.setState({isLoading: true});
      fetch('http://18.190.16.127:3005/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auth: "testing-api",
          timestamp: 1000,
          username: this.state.username,
          data: this.state.base64,
          })
      }).then((responseData) => {
        this.setState({isLoading: false});
        console.log(JSON.stringify(responseData.status),
        this.setState({status: JSON.stringify(responseData.status)})
        )
      });  
    } catch (error) {
      console.error(error);
    }
  };

  renderElement(){
    if(!this.state.isLoading && this.state.status != "")
       return <Text style={{color: 'red', padding: 10}}>{this.state.status == 200 ? "Login success!" : "Login failed"}</Text>;
    else if(this.state.isLoading == true)
      return <Text style={{color: 'red', padding: 10}}>Sending request to server please wait...</Text>;  
    return null;
 }

 cameraOrImage(){
   if(this.state.isLoading){
    return <ImageBackground style={{ flex: 1 }} source={{ uri: this.state.imageUri}}/>
   }
   else
   {
      return <Camera style={{ flex: 1 }} ref={ref => {this.Camera = ref;}} type={this.state.type}>
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
   }
 }

 render() {
    return (
      <SafeAreaView style={styles.container}>
        
        <View style={{ flex: 1 }}>
        <TextInput
          style={{ height: 40, padding: 10}}
          onChangeText={username => this.setState({username})}
          placeholder = "Username..."
        />
        {this.renderElement()}
        {this.cameraOrImage()}
        </View>
      </SafeAreaView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})

export default App;
