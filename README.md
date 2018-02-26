# RN-News
一个新闻的demo
此项目是我第一个github分享的demo，也是第一个RN的小项目，主要是用来练手，RN版本为0.52.0，代码中用了免费的集合数据API，过期可能就无效。此demo对于深入研究
RN的意义不大，对于入门级的可以参考，希望能帮助到和我一样的小白。目前只支持IOS，后续会兼容android，因为有限的API，页面也就这么多了。  
##页面要点

### **APP.js** 入口文件使用StackNavigator组件做导航

```
import {StackNavigator} from "react-navigation"; 
const RouteConfigs = {
  Home:{
    screen:list,
    navigationOptions: ({navigation}) => ({
      title: '首页',
    }),
  },
  detail:{
    screen:detail,
    navigationOptions: ({navigation}) => ({
      title: '详情',
    }),
  }
}
const StackNavigatorConfig = {
  initialRouteName:'Home',
  initialRouteParams: {initPara: '初始页面参数'},
    navigationOptions: {
        title: '标题',
        // headerTitleStyle: {fontSize: 18, color: '#666666'},
        headerStyle: {height: 48, backgroundColor: '#fff'},
    },
    cardStyle: {backgroundColor: "#ffffff"},
}
```
**注意：使用StackNavigator需要先安装react-navigation`npm install --save react-navigation`**  
**详细使用请看<http://blog.csdn.net/sinat_17775997/article/details/70861065>**
***
### **list.js** 项目首页，目前有只有下拉刷新功能、点击新闻进入新闻详情页
```
	import React, { Component } from 'react';
	import Dimensions from 'Dimensions'   //获取屏幕的尺寸
	import listDetail from './listDetail'

	import {
	  Platform,
	  StyleSheet,
	  Text,
	  View,
	  Image,
	  TouchableHighlight,
	  Button,
	  FlatList,
	  RefreshControl,
	} from 'react-native';

	var ITEM_HEIGHT = 100;
	export default class list extends Component{
    
    _flatList;
    navigation;
    static navigationOptions = {
        title: 'FlatListExample',
    }

    //控制器即将销毁的时候
        componentWillUnmount() {
        // 请注意Un"m"ount的m是小写

        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        // this.timer1 && clearTimeout(this.timer1);
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            imageStyle:{}
        }
        const {navigate,goBack,state} = this.props.navigation;
        navigation = navigate;
    }
    refreshing=()=>{
        this.setState({
            isLoading: true,
        });

        let timer = setTimeout(()=>{
            clearTimeout(timer)
            this.getListData()
        },1000)
    }

    onload(){
        let timer = setTimeout(()=>{
            clearTimeout(timer)
            alert('加载成功')
        })
    }

    getListData(){
        fetch('https://v.juhe.cn/toutiao/index?key=1a52343f75501c9e0988e66bcb45d58e').then((response) => response.json()).
        then((json) => {
            let data =  json.result.data;
             let dataBlob = [];
             let i = 0;
             data.map(function (item) {
                dataBlob.push({
                    key: i,
                    value: item,
                })
                i++;
             });
            this.setState({
                    //复制数据源
                    dataArray: dataBlob,
                    isLoading: false,
                });
                data = null;
                dataBlob = null;
            
            console.log('111111111111111111');
            console.log(this.state.dataArray);
        }).catch((error) => {
            console.log(error);
        })  }

    pusDetailView(obj){
        navigation('detail',{url:obj.url});
    }

    _renderItem = (item) => {

        let obj = item.item.value;
        return( 
            <TouchableHighlight underlayColor={'#dcdcdc'} onPress={this.pusDetailView.bind(this,obj)}> 
            <View style={styles.bgView}>
                <Text>{obj.title}</Text>
                <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10}}>
                    <View style={{flex:1}}>
                        <Image style={[this.state.imageStyle,styles.img_view]} source={{uri: obj.thumbnail_pic_s,cache:'force-cache'}}></Image>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Image style={[this.state.imageStyle,styles.img_view]} source={{uri: obj.thumbnail_pic_s02,cache:'force-cache'}}></Image>
                    </View>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Image style={[this.state.imageStyle,styles.img_view]} source={{uri: obj.thumbnail_pic_s03,cache:'force-cache'}}></Image>         
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1,textAlign:'left'}}>{obj.author_name}</Text>
                    <Text style={{flex:1,textAlign:'right'}}>{obj.date}</Text>
                </View>
            </View>
            </TouchableHighlight>
        )

    }



    _separator = () => {
        return <View style={{height:1,backgroundColor:'#dcdcdc',marginLeft:15,marginRight:15}}/>;
    }

    componentDidMount() {
        // alert(1)
        //请求数据
        this.getListData();
             var ScreenWidth = Dimensions.get('window').width;
        let imageWith = (ScreenWidth-50)/3;
        this.setState({
            imageStyle:{
                width:imageWith,
                height:100
            }
        });
    }


    render(){
        return (
            <View style={{flex:1}}>
                <Button title='' onPress={()=>{
                    //this._flatList.scrollToEnd();
                    //this._flatList.scrollToIndex({viewPosition:0,index:8});
                    this._flatList.scrollToOffset({animated: true, offset: 200});
                }}/>
                <View style={{flex:1}}>
                    <FlatList
                        ref={(flatList)=>this._flatList = flatList}
                        ListHeaderComponent={this._header}
                        ListFooterComponent={this._footer}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        onRefresh={this.refreshing}
                        refreshing={this.state.isLoading}
                        // extraData={this.state}

                        // onEndReachedThreshold={0}
                        // onEndReached={
                        //     this.onload
                        // }

                        //列数 组件内元素必须是等高的,无法支持瀑布流布局 
                        // numColumns ={3}

                        //numColumns大于1时，设置每行的样式
                        //columnWrapperStyle={{borderWidth:2,borderColor:'black',paddingLeft:20}}

                        //设置为true则变为水平列表
                        //horizontal={true}

                        //如果我们知道行高可以用此方法节省动态计算行高的开销。 
                        // getItemLayout={(data,index)=>(
                        // {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT+1) * index, index}
                        // )}

                        // onEndReachedThreshold={5}
                        // onEndReached={(info)=>{
                        // console.warn(info.distanceFromEnd);
                        // }}

                        // onViewableItemsChanged={(info)=>{
                        // console.warn(info);
                        // }}
                        data={this.state.dataArray} style={{marginTop:-34}}>
                    </FlatList>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    bgView:{
        flex:1,
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:15,
        paddingRight:15
    },
    img_view:{
        // height:100,
        resizeMode: Image.resizeMode.center,
        // borderWidth:1,
        // paddingRight:5,
        // flex:1,
        backgroundColor:'#FFF',
        borderColor:'#dcdcdc'
    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    }
});
```
