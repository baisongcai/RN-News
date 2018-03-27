# RN-News
一个新闻的demo
此项目是我第一个github分享的demo，也是第一个RN的小项目，主要是用来练手，RN版本为0.52.0，代码中用了免费的集合数据API，过期可能就无效。此demo对于深入研究
RN的意义不大，对于入门级的可以参考，希望能帮助到和我一样的小白。支持IOS和Android，因为有限的API，页面也就这么多了。	
#####	在兼容Android过程中遇到了一个坑，在模拟器上没有问题，在真机就会报错   
####  Unable to load script from assets index.android.bundle 
####	解决方法
1.	android/app/src/main 这个路径下新建assets文件夹
2. 	在根目录运行 react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res 运行完在assets文件夹下会出现index.android.bundle 和 index.android.bundle.meta文件

3.  react-native run-android

4.	注意：光这样还是不行，这样只能第一次运行成功，后面修改js后，reload还会报错，这个Could not connect to development server错误，连接不上服务器，什么鬼，搞了一上午终于解决了，不太会安卓开发就是坑啊。 
5. 到网上一顿遨游啊，找到了解决办法。可通过 adb 反向代理端口，将 Mac 端口反向代理到测试机上  adb reverse tcp:8081 tcp:8081，ok试一下，what？没有安卓adb

####	安装adb
1.	启动Terminal终端工具
2. 输入cd ~/ 进入当前用户的home目录
3. 创建：touch .bash_profile
4. 打开并编辑：open .bash_profile
5. 在文件中写入以下内容：export PATH=${PATH}:/XX/XX/XX/Android/sdk/platflom-tools
6. 注意：这里又碰到一个坑，在android5.0以后，配置这个目录adb是不生效的，又找了半天才发现，export PATH=${PATH}:/Users/admin/Library/Android/sdk/tools这个目录就可以，所以在platflom-tools下把adb文件粘贴到tools目录下
7. 保存关闭文件，source .bash_profile，跟新文件，adb devices 可以查看连接的设备

#####	最后：运行adb reverse tcp:8081 tcp:8081，安卓的真机调试就没问题了，在安卓5.0以前需要在app上的 Dev setting 下 Debug server host & port for device 设置ip:8081


总结：  
index.android.bundle是用来调用原生控件的js脚本，每次当改变了 index.android.js，都需要使用上面的代码片段，来及时的更新index.android.bundle，然后打包才可以把新的index.android.js应用上，所以当没有index.android.bundle文件时，React-Native 项目是无法运行的。

##		页面要点

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

### **listDetail** 列表详情页面很简单只用了WebView组件加载列表页传过来的新闻地址，获取路由传过来参数的方法
```
const {navigate,goBack,state} = this.props.navigation;
this.state = {
	url:state.params.url
}
```

### **index** 页面是练习布局的，此页面用到了Swiper，首先先安装组件,这里只用到了简单的轮播效果
```
$ npm install react-native-swiper --save  
$ npm i react-timer-mixin --save

import Swiper from 'react-native-swiper';

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
```
## 最后别忘了npm install 
