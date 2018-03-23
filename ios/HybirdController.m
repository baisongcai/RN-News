//
//  HybirdController.m
//  ReactNativeLearn
//
//  Created by baisongcai on 2018/3/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "HybirdController.h"
#import "SVProgressHUD.h"

@implementation HybirdController
RCT_EXPORT_MODULE();

// 接收传过来的 NSString
RCT_EXPORT_METHOD(showLoading){
  [SVProgressHUD show];
}

RCT_EXPORT_METHOD(dismiss){
  [SVProgressHUD dismiss];
}

RCT_EXPORT_METHOD(text:(NSString*)name){
   NSLog(@"接收传过来的NSString+NSString: %@", name);
}


@end
