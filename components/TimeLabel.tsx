import React, {Component} from "react"
import {StyleSheet, View, Text} from "react-native"


export default class TimeLabel extends Component{

    parseTime = function(this : TimeLabel, time : number) : string {
        let ret = "";
        let minutes = Math.floor(time / (60 * 1000));
        let seconds = Math.floor((time - (minutes * 60 * 1000)) / 1000);
        let miliSeconds = Math.floor(time - (minutes * 60 * 1000) - (seconds * 1000));

        ret += this.padNumber(minutes.toString(), 2);
        ret += ":";
        ret += this.padNumber(seconds.toString(), 2);
        ret += ":";
        ret += this.padNumber(miliSeconds.toString(), 3);

        return ret;
    };

    padNumber = function(input : string, desiredLength : number) : string {
        let ret = input;
        
        while (ret.length < desiredLength) {
            ret = "0" + ret;
        }

        return ret;
    };

    render(){
        return(
            <View>
                <Text style={[styles.timeLabel, this.props.style]}>{this.parseTime(this.props.currentTime)}</Text>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    timeLabel: {
      color: 'white',
      fontFamily: 'Trebuchet MS'
    }
  });