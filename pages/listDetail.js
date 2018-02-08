import React, { Component } from 'react';
import {
  WebView
} from 'react-native';

export default class listDetail extends Component{

	constructor(props) {
        super(props);
        this.state = {
            url:this.props.url
        }
    }
	render(){
		return (
			<WebView source={{uri:this.state.url}}></WebView>
		)
	}
}