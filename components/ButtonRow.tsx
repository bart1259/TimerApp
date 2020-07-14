import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'

export default class ButtonRow extends Component{

    render(){
        return(
            <View style = {[styles.buttonRow, this.props.style]}>
                {this.props.children}
            </View>
        );
    }

}

const styles = StyleSheet.create({

    buttonRow: {
        backgroundColor: '#000',
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    }


});