// pages/testAPI/testAPI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"请输入手机号",
    code:"请输入验证码"
  },
  bindPhone:function(e){
    this.setData({
      phone:e.detail.value
    });
  },
  bindCode:function(e){
    this.setData({
      code:e.detail.value
    });
  },
  login:function(){
      wx:wx.request({
        url: 'url',
        data: data,
        method: post,
        timeout: 0,
        success: (result) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
  }

})