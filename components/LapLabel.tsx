import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import TimeLabel from './TimeLabel'

export default class LabLabel extends Component{

    render(){

        return (
            <View style = {styles.lapContainer}>
                <Text style = {[styles.lapLabel, {color: this.props.textColor}]}>Lap {this.props.index}</Text>
                <TimeLabel currentTime = {this.props.time} style = {[styles.lapLabel, {color: this.props.textColor}]}></TimeLabel>
            </View>
        );

    }

}


const styles = StyleSheet.create({

    lapLabel: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Trebuchet MS',
    },
    lapContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    }

});