//Importing necesary dependencies
import React from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';


//Component(s) section

export default class Chat extends React.Component {
    
    constructor() {
        super();
        this.state = ({
            // Here is were messages are temporarily stored.
            messages: [
                
                {
                    _id: 1,
                    text: 'You have now entered the chat. Tell other people you are here.',
                    createdAt: new Date(),
                    system: true,
                },
                {
                    _id: 2,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                
            ],
        })
    }

    componentDidMount () {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name })
    };

    // function trigered when the user press or clicks on send message
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    //Function that allows to change the style of the chat bubbles
    renderBubble(props) {
        return(
            <Bubble
                {...props}
                wrapperStyle = {{
                    right: {
                        backgroundColor: '#000'
                    }
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
                <GiftedChat
                    renderBubble = { this.renderBubble.bind(this)}
                    messages = {this.state.messages}
                    onSend = {messages => this.onSend(messages)}
                    user = {{
                        _id: 1,
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