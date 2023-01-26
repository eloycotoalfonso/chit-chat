//Importing necesary dependencies
import React, { Component } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';


//define the color theme user will be able to choose
const backgroundColors = {
    black: { backgroundColor: '#090C08'},
    purple: {backgroundColor: '#474056'},
    blue: {backgroundColor: '#8A95A5'},
    green: {backgroundColor: '#B9C6AE'}
};


//Component(s) section
export default class Start extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            color: 'black.backgroundColor'
        };
    }

    
    render() {
        const { black, purple, blue, green} = backgroundColors;
        return (
            <View style = {styles.container}>
                <ImageBackground
                    source = {require('./../assets/backGroundImage.png')}
                    style = {styles.image}
                >
                    <Text style = {styles.title}> ChitChat! </Text>
                    <View style = {styles.menu}>
                        <TextInput
                            style = {[styles.input, styles.text]}
                            onChangeText = {(name) => this.setState({name})}
                            value = {this.state.name}
                            placeholder = 'Enter your username'
                        />
                        <View>
                            <Text style = {styles.text}> Choose Background Color: </Text>
                            <View style = {styles.colorsWrapper}>
                                <Button
                                    title = 'black'
                                    style = {[
                                        styles.color,
                                        black
                                    ]}
                                    onPress = {() => this.setState({color: black.backgroundColor})}
                                />
                                <Button
                                    title = 'purple'
                                    style = {[
                                        styles.color,
                                        purple,
                                    ]}
                                    onPress = {() => this.setState({color: purple.backgroundColor})}
                                />
                                <Button
                                    title = 'blue'
                                    style = {[
                                        styles.color,
                                        blue,
                                    ]}
                                    onPress = {() => this.setState({color: blue.backgroundColor})}
                                />
                                <Button
                                    title = 'green'
                                    style = {[
                                        styles.color,
                                        green,
                                    ]}
                                    onPress = {() => this.setState({color: green.backgroundColor})}
                                />
                            </View>
                        </View>
                        <Button
                            title = 'Go to the chat'
                            style = {styles.button}
                            onPress = {() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
                        />
                        
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        resizeMode: 'cover',
    },

    title: {
        fontSize: 45,
        fontWeight: 600,
        color: '#FFFFFF'
    },

    menu: {
        backgroundColor: '#FFF',
        width: '88%',
        height: '44%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    input: {
        height: 50,
        width: '88%',
        borderColor: 'gray',
        color: '#757083',
        borderWidth: 2,
        borderRadius: 10,
    },

    text: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        // opacity: '50%',
        textAlign: 'center',
    },

    colorsWrapper:{
        flexDirection: 'row',
        marginTop: '20',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    color: {
        borderRadius: 20,
        width: 40,
        height: 40,
        marginRight: 40,
    },

    button: {
        fontSize: 16,
        fontWeight: 600,
        width: '88%',
        color: '#FFFFF',
        // backgroundColor: '#788083',
        color: 'black',
    },
});