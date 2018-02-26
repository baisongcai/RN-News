import React, { Component,PropTypes } from 'react';
import Swiper from 'react-native-swiper';
import Detail from './detail'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';

var sliderImgs = [
    'https://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
    'https://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png',
    'https://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg'
];
var BUIcon = [
  'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/%E6%9C%AA%E6%A0%87%E9%A2%98-1.png',
  'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/feiji.png',
  'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/lvyou.png',
  'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/gonglue.png'
];
var Images = [
  'https://webresource.c-ctrip.com/ResCRMOnline/R5/html5/images/zzz_pic_salead01.png',
  'https://images3.c-ctrip.com/rk/apph5/B1/201505/app_home_ad06_310_120.jpg'
];
class Slider extends React.Component{
    render(){
      return (
        <Swiper showsButtons={false} autoplay={true} height={80} showsPagination={false}>
        <TouchableHighlight underlayColor={'#FA6778'} style={{flex:1}} onPress={() => console.log('pressed1')}>
          <Image style={{height:40,width:100}} source={{uri: sliderImgs[0]}}></Image>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={'#FA6778'} style={{flex:1}} onPress={() => console.log('pressed2')}>
          <Image style={[styles.slide,]} source={{uri: sliderImgs[1]}}></Image>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={'#FA6778'} style={{flex:1}} onPress={() => console.log('pressed3')}>
          <Image style={[styles.slide,]} source={{uri: sliderImgs[2]}}></Image>
        </TouchableHighlight>
        </Swiper>
      );
  }
}

export default class Index extends Component<{}> {
  clickJump(){
    // this.props.navigator.push({
    //   component: Detail,
    //   title:'详情',
    //   rightButtonTitle: '收藏',
    //    onRightButtonPress: function(){
    //      alert('点击了收藏按钮。');
    //    }
    // })
  }
  getListData(){
    let param = {
      key:'1a52343f75501c9e0988e66bcb45d58e',
      type:''
    }
    var jsonStr = JSON.stringify(param);

      // fetch('https://v.juhe.cn/toutiao/index?key=1a52343f75501c9e0988e66bcb45d58e').then((response)=>response.json()).
      // then((json)=>{
      //   alert(1)
      //   console.log('111111111111111111111111111111111111111111');
      //   console.log(json);
      // }).catch((error)=>{
      //   console.log(error);
      // })

      // fetch('https://v.juhe.cn/toutiao/index',{
      //   method:'POST',
  
      //   body:'type=&key=1a52343f75501c9e0988e66bcb45d58e'
      // }).then((response)=>response.json()).
      // then((json)=>{
      //   console.log('111111111111111111111111111111111111111111');
      //   console.log(json);
      // }).catch((error)=>{
      //   console.log(error);
      // })
  
  }
  render() {
    this.getListData();
    return (
      <ScrollView>
        <View style={styles.container}>
          <Slider/>
        
          <View style = {[styles.sbu_red,styles.sbu_view]}>
            <TouchableHighlight underlayColor={'#FA6778'} style={{flex:1}} onPress={this.clickJump.bind(this)}>
              <View style={[styles.sbu_flex,styles.sbu_borderRight]}>
                <View style={[styles.sbu_flex,styles.sub_con_flex]}>
                  <Text style={styles.font16}>新闻</Text>
                </View>
              <View style={styles.sub_con_flex}>
                  <Image style={[styles.sbu_icon_img]} source={{uri:BUIcon[0]}}></Image>
                </View>
              </View>
            </TouchableHighlight>
            <View style={[styles.sbu_flex,styles.sbu_borderRight]}>
              <View style={[styles.sbu_flex,styles.sub_con_flex]}>
                <Text style={styles.font16}>海外</Text>
              </View>
              <View style={[styles.sbu_flex,styles.sub_con_flex,styles.sbu_borderTop]}>
                <Text style={styles.font16}>周边</Text>
              </View>
            </View>
            <View style={[styles.sbu_flex]}>
              <View style={[styles.sbu_flex,styles.sub_con_flex]}>
                <Text style={styles.font16}>团购.特惠</Text>
              </View>
              <View style={[styles.sbu_flex,styles.sub_con_flex,styles.sbu_borderTop]}>
                <Text style={styles.font16}>客栈.公寓</Text>
              </View>
            </View>
          </View>
          <View style = {[styles.sbu_red,styles.sbu_view]}>
            <TouchableHighlight underlayColor={'#FA6778'} style={{flex:1}}>
              <View style={[styles.sbu_flex,styles.sbu_borderRight]}>
                <View style={[styles.sbu_flex,styles.sub_con_flex]}>
                  <Text style={styles.font16}>机票</Text>
                </View>
              <View style={styles.sub_con_flex}>
                  <Image style={[styles.sbu_icon_img]} source={{uri:BUIcon[1]}}></Image>
                </View>
              </View>
            </TouchableHighlight>
            <View style={[styles.sbu_flex,styles.sbu_borderRight]}>
              <View style={[styles.sbu_flex,styles.sub_con_flex]}>
                <Text style={styles.font16}>火车票</Text>
              </View>
              <View style={[styles.sbu_flex,styles.sub_con_flex,styles.sbu_borderTop]}>
                <Text style={styles.font16}>接收机</Text>
              </View>
            </View>
            <View style={[styles.sbu_flex]}>
              <View style={[styles.sbu_flex,styles.sub_con_flex]}>
                <Text style={styles.font16}>汽车票</Text>
              </View>
              <View style={[styles.sbu_flex,styles.sub_con_flex,styles.sbu_borderTop]}>
                <Text style={styles.font16}>自驾.专车</Text>
              </View>
            </View>
          </View>
          <View style = {[styles.sbu_red,styles.sbu_view]}>
            <TouchableHighlight underlayColor={'#FA6778'} style={{flex:1}}>
              <View style={[styles.sbu_flex,styles.sbu_borderRight]}>
                <View style={[styles.sbu_flex,styles.sub_con_flex]}>
                  <Text style={styles.font16}>旅游</Text>
                </View>
              <View style={styles.sub_con_flex}>
                  <Image style={[styles.sbu_icon_img]} source={{uri:BUIcon[2]}}></Image>
                </View>
              </View>
            </TouchableHighlight>
            <View style={[styles.sbu_flex,styles.sbu_borderRight]}>
              <View style={[styles.sbu_flex,styles.sub_con_flex]}>
                <Text style={styles.font16}>门票.玩乐</Text>
              </View>
              <View style={[styles.sbu_flex,styles.sub_con_flex,styles.sbu_borderTop]}>
                <Text style={styles.font16}>出境WiFi</Text>
              </View>
            </View>
            <View style={[styles.sbu_flex]}>
              <View style={[styles.sbu_flex,styles.sub_con_flex]}>
                <Text style={styles.font16}>游轮</Text>
              </View>
              <View style={[styles.sbu_flex,styles.sub_con_flex,styles.sbu_borderTop]}>
                <Text style={styles.font16}>签证</Text>
              </View>
            </View>
          </View>
          <View style = {[styles.sbu_red,styles.sbu_view]}>
            <TouchableHighlight underlayColor={'#FA6778'} style={{flex:1}}>
              <View style={[styles.sbu_flex,styles.sbu_borderRight]}>
                <View style={[styles.sbu_flex,styles.sub_con_flex]}>
                  <Text style={styles.font16}>攻略</Text>
                </View>
              <View style={styles.sub_con_flex}>
                  <Image style={[styles.sbu_icon_img]} source={{uri:BUIcon[3]}}></Image>
                </View>
              </View>
            </TouchableHighlight>
            <View style={[styles.sbu_flex,styles.sbu_borderRight]}>
              <View style={[styles.sbu_flex,styles.sub_con_flex]}>
                <Text style={styles.font16}>周末游</Text>
              </View>
              <View style={[styles.sbu_flex,styles.sub_con_flex,styles.sbu_borderTop]}>
                <Text style={styles.font16}>礼品卡</Text>
              </View>
            </View>
            <View style={[styles.sbu_flex]}>
              <View style={[styles.sbu_flex,styles.sub_con_flex]}>
                <Text style={styles.font16}>美食.购物</Text>
              </View>
              <View style={[styles.sbu_flex,styles.sub_con_flex,styles.sbu_borderTop]}>
                <Text style={styles.font16}>更多</Text>
              </View>
            </View>
          </View>
          <View style={[styles.sbu_flex,styles.img_view]}>
            <View style={styles.sbu_flex}>
              <Image style={styles.img_wh} source={{uri:Images[0]}}></Image>
            </View>
            <View style={styles.sbu_flex}>
              <Image style={styles.img_wh} source={{uri:Images[1]}}></Image>
            </View>
            
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	container:{
    	// backgroundColor:'#F2F2F2',
    	// flex:1
	},
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
  sbu_flex:{
    flex:1,
  },
  slide:{
  	width:100,
 	height:40,
  },
  slide: {
    height:80,
    resizeMode: Image.resizeMode.contain,
  },
  wrapper:{
  	// height:40
  },
  sbu_borderRight:{
    borderColor:'#fff',
    borderRightWidth: 0.5,
  },
  sbu_borderTop:{
    borderColor:'#fff',
    borderTopWidth: 0.5,
  },
  sub_con_flex:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub_text:{
    justifyContent:'center',
  },
  font16:{
    fontSize:17,
    color:'#FFF',
    fontWeight:'900',
  },
  sbu_icon_img:{
    height:40,
    width:40,
    resizeMode:Image.resizeMode.contain,
  },
  sbu_view:{
    height:84,
    marginLeft: 5,
    marginRight:5,
    borderWidth:1,
    borderRadius:5,
    marginBottom:10,
    flexDirection:'row',
  },
  sbu_red:{
    backgroundColor: '#FA6778',
    borderColor:'#FA6778',
  },
  img_view:{
    height:62,
    marginLeft: 5,
    marginRight:5,
    borderWidth:1,
    marginBottom:10,
    flexDirection:'row',
    backgroundColor:'#FFF',
    borderColor:'#dcdcdc'
  },
  img_flex:{
      flex:1,
      borderWidth:1,
      borderColor:'#ccc',
    },
    img_wh: {
      height:59,
      borderRightWidth:0,
      resizeMode:Image.resizeMode.contain,
    }
});