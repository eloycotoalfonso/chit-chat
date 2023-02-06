import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const firebase = require ('firebase');
require ('firebase/firestore');

export default class CustomActions extends React.Component {

    pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        try {
            if(status === 'granted') {
                //we pick the image now
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images
                }).catch((e) => console.log(e));
                if(!result.canceled) {
                    const imageUrl = await this.uploadImageFetch(result.uri);
                    this.props.onSend({image: imageUrl});
                }
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    takePhoto = async () => {
        const { status } = await Permissions.askAsync (
            Permissions.CAMERA,
            Permissions.MEDIA_LIBRARY
        );
        try {
            if(status === "granted") {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                }).catch((e) => console.log(e));
                if(!result.canceled){
                    const imageUrl = await this.uploadImageFetch(result.uri);
                    this.props.onSend({ image: imageUrl});
                }
            }
        } catch (e) { console.log(e.message);}
    };

    getLocation = async () => {
        try {
            const { status } = await Permissions.askAsync (Permissions.LOCATION_FOREGROUND);
            if(status === 'granted') {
                const result = await Location.getCurrentPositionAsync({}).catch((e) => console.log(e));

                const longitude = JSON.stringify(result.coords.longitude);
                const latitude = JSON.stringify(result.coords.latitude);
                
                if(result) {
                    this.props.onSend({
                        location: {
                            longitude: result.coords.longitude,
                            latitude: result.coords.latitude,
                        },
                    });
                }
            }
        }catch(e) { console.log(e.message); }
    };

    uploadImageFetch = async (uri) => {
        const blob = await new Promise ((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function(e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const gottenName = uri.split('/');
        const imageName = gottenName[gottenName.length -1];

        const ref = firebase.storage().ref().child(`images/${imageName}`);

        const snapshot = await ref.put(blob);

        blob.close();

        return await snapshot.ref.getDownloadURL();
    };

    onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length -1;
        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        console.log('user wants to pick an image');
                        return this.pickImage();
                    case 1:
                        console.log('user wants to take a photo');
                        return this.takePhoto();
                    case 2:
                        console.log('user wants to send location');
                        return this.getLocation();
                    
                    default:
                }
            },
        );
    };
    
    render() {
        return(
            <TouchableOpacity 
            style = {[styles.container]}
            onPress = {this.onActionPress}
            accesible = {true}
            accessibilityLabel = 'Attach document'
            accessibilityHint = 'Send an image from your roll or camera or send your location'
            >
                <View style = {[styles.wrapper, this.props.wrapperStyle]}>
                    <Text style = {[styles.iconText, this.props.iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },

    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },

    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
  };
 
  CustomActions = connectActionSheet(CustomActions);
 