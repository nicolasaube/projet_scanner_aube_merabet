import React, { useState, useEffect } from 'react';
import { Text, View, Vibration, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements'
import { Camera } from 'expo-camera';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BarcodeMask from 'react-native-barcode-mask';

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default class ScannerView extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            isFlashOn: false,
            flashState: Camera.Constants.FlashMode.torch,
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            scanned: null
        }
    }

    async componentDidMount() {
        //Getting Permission result from app details.
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    changeFlash(){
        this.state.isFlashOn ? 
            this.setState({isFlashOn: false}) :
            this.setState({isFlashOn: true})
    }

    handleBarCodeScanned = ({ type, data }) => {

        this.setState({scanned: true})
        Vibration.vibrate();
        

        fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`) 
            .then((response) => response.json())
            .then((responseJson) => {

                // Variante de navigate si je veux aller dans une autre pile de navigation
                // https://reactnavigation.org/docs/params#passing-params-to-nested-navigators
                this.props.navigation.navigate('Accueil', {
                    screen: 'Details',
                    params: { product: responseJson.product },
                });

            })
            .catch((error) =>{
                console.error(error);
            });

        
	};


    render(){
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return (
                <View>
                    <Text>No access to camera</Text>
                </View>
            );
        } else {

            return (
            <View style={{ flex: 1 }}>
              <Camera
                    type={this.state.type}
                    flashMode={this.state.isFlashOn ?  Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                    }}>
              <BarcodeMask width={300} height={100} edgeBorderWidth={1} />
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: 80
                }}>

                    <TouchableOpacity
                        style={{
                            marginHorizontal: 50,
                            height: 60,
                            width: 60,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            borderRadius: 20,
                            alignItems: "center",
                            paddingVertical: 12
                        }}
                        onPress={()=> this.changeFlash()}
                    >
                        <Ionicons name="ios-flashlight" size={36} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginHorizontal: 50,
                            height: 60,
                            width: 60,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            borderRadius: 20,
                            alignItems: "center",
                            paddingVertical: 12
                        }}
                        onPress={()=> this.setState({scanned: null})}
                    >
                        <MaterialCommunityIcons name="restart" size={36} color="white" />
                    </TouchableOpacity>
                </View>

              </Camera>
            </View>
          );

        }
    }

  
}
