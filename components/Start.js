//Importing necesary dependencies
import React, { Component } from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';


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
            color: backgroundColors.blue.backgroundColor
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
                            <Text style = {styles.text}> Theme: </Text>
                            <View style = {styles.colorsWrapper}>
                                <TouchableOpacity
                                    title = 'black'
                                    style = {[
                                        styles.color,
                                        black,
                                        this.state.color === black.backgroundColor
                                        ? styles.colorSelected
                                        : {},
                                    ]}
                                    onPress = {() => this.setState({color: black.backgroundColor})}
                                    accessible = {true}
                                    accessibilityLabel = "Set black theme"
                                    accessibilityHint = "Let you choose the background of your screen with color black"
                                    
                                />
                                <TouchableOpacity
                                    title = 'purple'
                                    style = {[
                                        styles.color,
                                        purple,
                                        this.state.color === purple.backgroundColor
                                        ? styles.colorSelected
                                        : {},
                                    ]}
                                    accessible = {true}
                                    accessibilityLabel = "Set purple theme"
                                    accessibilityHint = "Let you choose the background of your screen with color purple"
                                    onPress = {() => this.setState({color: purple.backgroundColor})}
                                />
                                <TouchableOpacity
                                    title = 'blue'
                                    style = {[
                                        styles.color,
                                        blue,
                                        this.state.color === blue.backgroundColor
                                        ? styles.colorSelected
                                        : {},
                                    ]}
                                    accessible = {true}
                                    accessibilityLabel = "Set blue theme"
                                    accessibilityHint = "Let you choose the background of your screen with color blue"
                                    onPress = {() => this.setState({color: blue.backgroundColor})}
                                />
                                <TouchableOpacity
                                    title = 'green'
                                    style = {[
                                        styles.color,
                                        green,
                                        this.state.color === green.backgroundColor
                                        ? styles.colorSelected
                                        : {},
                                    ]}
                                    accessible = {true}
                                    accessibilityLabel = "Set green theme"
                                    accessibilityHint = "Let you choose the background of your screen with color green"
                                    onPress = {() => this.setState({color: green.backgroundColor})}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            title = 'Go to the chat'
                            style = {styles.button}
                            onPress = {() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
                            accessible = {true}
                            accessibilityLabel = "Go to chat"
                            accessibilityHint = "Sends you to the chat screen with the current adjustments."
                        >
                            <Text style = {styles.buttonText}> Go to the chat</Text>
                        </TouchableOpacity>
                        
                    </View>
                </ImageBackground>
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
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
        fontWeight: '600',
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
        textAlign: 'center',
    },

    colorsWrapper:{
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    color: {
        borderRadius: 20,
        width: 40,
        height: 40,
        marginRight: 20,
        marginLeft: 20,
    },
    
    colorSelected: {
        borderStle: 'solid',
        borderWidth: 2,
        borderColor: '#5f5f5f',
        borderRadius: 23,
        width: 46,
        height: 46,

    },

    button: {
        width: '88%',
        backgroundColor: '#757083',
        height: 50,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    buttonText: {
        padding: 10,
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});