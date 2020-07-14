import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TimeLabel from './components/TimeLabel'
import RoundButton from './components/RoundButton'
import ButtonRow from './components/ButtonRow';
import LabLabel from './components/LapLabel';
import LabTable from './components/LapTable';

const TEMP_DATA = {
  accumulatedTime: 154134,
  currentLap: 12094
}

export default class App extends Component{

  state : any;

  constructor(props){
    super(props)

    this.state = {
      timerStarted: false,
      startTime: 0,
      currentTime: 0,
      completedLaps: []
    };

    this.updateLoop = this.updateLoop.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.lapTimer = this.lapTimer.bind(this);
    setInterval(this.updateLoop, 1)
  }

  startTimer(){
      console.log("Starting timer");

      let curTime = new Date().getTime()
      let startTime = curTime - (this.state.currentTime - this.state.startTime);
      

      this.setState({
        startTime: startTime,
        currentTime: curTime,
        timerStarted: true,
      });
  }

  lapTimer(){
    console.log("Lapping timer");

    const lapTime  = this.state.currentTime - this.state.startTime - this.state.completedLaps.reduce((a : number, c : number) => a + c, 0);
    this.setState(prevState => ({
      completedLaps: [...prevState.completedLaps, lapTime]
    }))
  }

  stopTimer(){
    console.log("Stoping timer");

    const curTime = new Date().getTime();

    this.setState({
      currentTime: curTime,
      timerStarted: false,
    });
  }

  resetTimer(){
    console.log("Reseting timer");

    const curTime = new Date().getTime();

    this.setState({
      startTime: curTime,
      currentTime: curTime,
      completedLaps: [],
      timerStarted: false,
    });
  }


  updateLoop(){
    if(this.state.timerStarted){
      const curTime = new Date().getTime();
      this.setState({
        currentTime: curTime,
      });
    }
  }

  getLapColor(bestTime: number, worstTime: number, time: number){
    
    if(bestTime == worstTime){
      return 'white';
    }

    let percent = (2 * (time - bestTime) / (worstTime - bestTime)) - 1;
    if(percent < 0){

      //Better than average
      let rb = Math.round((1 + percent) * 255);

      return "rgba(+" + rb + ",255," + rb + ",1.0)";
    }
    if(percent > 0){
      //worse than average
      let gb = Math.round((1 - percent) * 255);

      return 'rgba(255,' + gb + "," + gb + ",1.0)";
    }

    return 'white';
  }

  render(){

    const elaspedTime = this.state.currentTime - this.state.startTime;
    const currentLapTime = elaspedTime - this.state.completedLaps.reduce((a : number, c : number) => a + c, 0);

    return (
      <View style={styles.app}>
        <View style={styles.contentWrapper}>
          <TimeLabel style = {{fontSize: 75}} currentTime={elaspedTime}/>
          <TimeLabel style = {{fontSize: 30}} currentTime={currentLapTime}/>
          {this.state.timerStarted == false &&
            <ButtonRow style = {styles.buttonRow}>
              <RoundButton text = {"Reset"} buttonStyle = {{backgroundColor: 'gray'}} onPress = {this.resetTimer}/>
              <RoundButton text = {"Start"} buttonStyle = {{backgroundColor: 'green'}} onPress = {this.startTimer}/>
            </ButtonRow>
          }
          {this.state.timerStarted == true &&
            <ButtonRow style = {styles.buttonRow}>
              <RoundButton text = {"Lap"} buttonStyle = {{backgroundColor: 'gray'}} onPress = {this.lapTimer}/>
              <RoundButton text = {"Stop"} buttonStyle = {{backgroundColor: 'red'}} onPress = {this.stopTimer}/>
            </ButtonRow>
          }
          <LabTable style ={{marginBottom: 100}}>
            {this.state.completedLaps.map((element, i : number) => {

              let lapIndex = this.state.completedLaps.length - i - 1;
              let displayIndex = lapIndex + 1;
              let lapTime = this.state.completedLaps[lapIndex];

              let bestTime = Math.min(...this.state.completedLaps);
              let worstTime = Math.max(...this.state.completedLaps);

              return <LabLabel index = {displayIndex} time = {lapTime} textColor= {this.getLapColor(bestTime, worstTime, lapTime)}></LabLabel>
            })}
          </LabTable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  contentWrapper: {
    marginTop: 150,
    backgroundColor: '#000',
    flexGrow: 1,
    alignItems: 'center'
  },
  buttonRow: {
    marginTop: 20, 
    marginBottom: 20,
    paddingTop: 15, 
    paddingBottom: 15, 
    borderBottomWidth: 2, 
    borderTopWidth: 2, 
    borderColor: '#AAA'
  }
});
