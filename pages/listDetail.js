import React, { Component } from 'react';
import {
  WebView
} from 'react-native';

export default class listDetail extends Component{

	constructor(props) {
        super(props);
        const {navigate,goBack,state} = this.props.navigation;
        this.state = {
            url:state.params.url
        }
        // alert(state.params.url)
    }
	render(){
		return (
			<WebView source={{uri:this.state.url}}></WebView>
		)
	}
}