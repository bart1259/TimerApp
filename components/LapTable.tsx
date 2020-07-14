import React, {Component} from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import LapLabel from './LapLabel'

export default class LabTable extends Component{

    render(){

        return (
            <ScrollView style = {[styles.lapTable, this.props.style]}>
                {this.props.children}
            </ScrollView>
        )

    }

}

const styles = StyleSheet.create({

    lapTable: {
        backgroundColor: 'black',
        flexDirection: 'column',
        alignSelf: 'stretch'
    }

});