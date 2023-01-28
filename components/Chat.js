//Importing necesary dependencies
import React from 'react';
import {View, Text, StyleSheet} from 'react-native'


//Component(s) section

export default class Chat extends React.Component {

    render() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({title: name})
        let color = this.props.route.params.color; 
        return (
            <View style = {[ styles.container, { backgroundColor: color}]}>
                <Text>Chat page</Text>
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