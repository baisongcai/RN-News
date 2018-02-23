import React, { Component } from 'react';
import {
  WebView,
  Button
} from 'react-native';

export default class listDetail extends Component{

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.name,
        headerRight:(
          <Button title="布局"
                  onPress={()=>{
                    navigation.navigate('index')
                  }}
          ></Button>
        )
    });



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