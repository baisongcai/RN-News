//
//  HybirdViewController.m
//  ReactNativeLearn
//
//  Created by baisongcai on 2018/3/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "HybirdViewController.h"

@interface HybirdViewController ()

@end

@implementation HybirdViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  UILabel *label = [[UILabel alloc]initWithFrame:CGRectMake(0, 70, self.view.frame.size.width, 60)];
  label.text = @"我是ios页面";
  [self.view addSubview:label];
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

/*
 #pragma mark - Navigation
 
 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */

@end
