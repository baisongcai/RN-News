/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Index from './pages/Index'
import detail from './pages/detail'
import list from './pages/list'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  render() {
    return (
      <NavigatorIOS style={styles.flex_1} initialRoute={{title:'首页',component:list}}></NavigatorIOS>
    );
  }
}

const styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    
  },
  padding_20_top:{
    paddingTop:20
  },
  part_1_left:{
    flex:1,
    borderColor:'#DCD7CD',
    borderRightWidth:0.5,
    borderBottomWidth:1,
  },
  part_2_right:{
    flex:2,
    borderColor:'#DCD7CD',
    borderRightWidth:0.5,
    borderBottomWidth:1,
  },
  flex_1:{
    flex:1,
  },
  hanbao:{
    width:55,
    height:55
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    // margin: 10,
    marginTop:10,
    paddingBottom:20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  pic:{
    width:100,
    height:100,
  }
});
