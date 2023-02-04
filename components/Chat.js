//Importing necesary dependencies
import React from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';


const firebase = require('firebase');
require('firebase/firestore');
require('firebase/app');

import AsyncStorage from '@react-native-async-storage/async-storage';

import NetInfo from '@react-native-community/netinfo';


//Component(s) section

export default class Chat extends React.Component {
    
    constructor() {
        super();
        this.state = {
            // Here is were messages are temporarily stored.
            messages: [],
            uid: 0,
            user: {
                _id: '',
                name: '',
                avatar: '',
            },
            loggedInText: 'You are using chit-chat offline',
            isConnected: false,
        };
        
        // console.log(firebase);
        if (!firebase.default.apps.length) {
            firebase.default.initializeApp({
                apiKey: "AIzaSyDPWX0zf_UtFOLu_3Nqj4_5Fb_OMvIgq3E",
                authDomain: "chit-chat-7a7d8.firebaseapp.com",
                projectId: "chit-chat-7a7d8",
                storageBucket: "chit-chat-7a7d8.appspot.com",
                messagingSenderId: "254656139150",
                appId: "1:254656139150:web:2b9a1efc3a50cc20a95edf"
            });
        }

        this.referenceChatMessages = firebase.default.firestore().collection('messages');
    };

    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages),
            });
        } catch (error) {
            console.log(error.message);
        }
    };
    
    componentDidMount () {
        //props that pass the name of the user and the background color to the chat screen
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
         
        //This function load the messages user has saved in the device
        this.getMessages();

        NetInfo.fetch().then(connection => {
            if(connection.isConnected) {

                this.setState({ isConnected: true});
                console.log('online');
    

                //Creating a reference to the message colection
                this.referenceChatMessages = firebase.default
                .firestore()
                .collection('messages');
                
                //Listen to authentification events
                this.authUnsubscribe = firebase.default.auth().onAuthStateChanged(async(user) => {
                    if(!user) {
                        await firebase.default.auth().signInAnonymously();
                        console.log(user);
                    }
                    this.setState({
                        uid: user.uid,
                        messages: [],
                        user: {
                            _id: user.uid,
                            name: name,
                        },
                        loggedInText: '',
                    });
                
                    // Listening for collection changes
                    this.unsubscribe = this.referenceChatMessages
                    .orderBy("createdAt", "desc")
                    .onSnapshot(this.onCollectionUpdate);
                });
        
            } else {
                this.setState({ isConnected: false});
                console.log('offline');
                this.getMessages();
            };
        });
    };

    componentWillUnmount() {
        if(this.isConnected){
            // Stop listening to authentification
            this.unsubscribe();

            //Stop listening for changes
            this.authUnsubscribe();
        }
    };

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        //go though each document
        querySnapshot.forEach((doc) => {
            //get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar:data.user.avatar || '',
                },
                image: data.image || null,
                location: data.location || null,
            });
        });
        this.setState({
            messages,
        });
    };


    // function trigered when the user press or clicks on send message
    onSend(messages = []) {
        this.setState(
            previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }),
        () => {
            this.addMessage();
            this.saveMessages();
        });
    };

    async saveMessages () {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message)
        }
    };

    addMessage = () => {
        const message = this.state.messages [0];
        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: message.user,
            image: message.image || null,
            location: message.location || null,
        });
    };

    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    };

    // Hidding the text input bar when offline
    renderInputToolbar(props) {
        console.log(this.isConnected);
        if (this.isConnected == false) {
        } else {
          return(
            <InputToolbar
            {...props}
            />
          );
        }
      }
    
    //Function that allows to change the style of the chat bubbles
    renderBubble(props) {
        return(
            <Bubble
                {...props}
                wrapperStyle = {{
                    right: {
                        backgroundColor: '#000'
                    },
                    left: {
                        backgroundColor: '#fff'
                    },
                }}
            />
        );
    }

    render() {
        // let name = this.props.route.params.name;
        // this.props.navigation.setOptions({title: name})
        let color = this.props.route.params.color; 
        return (
            <View style = {[ styles.container, { backgroundColor: color}]}>
                <Text>{this.state.loggedInText}</Text>
                <GiftedChat
                    renderBubble = { this.renderBubble.bind(this)}
                    // isConnected = {this.state.isConnected}
                    renderInputToolbar = {this.renderInputToolbar}
                    messages = {this.state.messages}
                    onSend = {messages => this.onSend(messages)}
                    user = {{
                        _id: this.state.uid,
                    }}
                />
                {/* Funtion to avoid problems with android old devices keyboard compatibility */}
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior = 'height' /> : null }
            </View>
        )
    }
};

//Here is where we define the styles for the components
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});