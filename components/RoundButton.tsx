import React, {Component} from "react"
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from "react-native"


export default class RoundButton extends Component{

    render(){
        return(
            <TouchableOpacity activeOpacity={0.5} onPress={this.props.onPress}>
                <View style = {[styles.roundButton, this.props.buttonStyle]}>
                    <Text style = {styles.buttonText}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}


const styles = StyleSheet.create({
    roundButton: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: '#f00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
  });