// pages/msgshow/msgshow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nickname:'',
      name:'',
      gender:'',
      age:'',
      phone:''
  },

  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log('uermsg',res.data)
        that.setData({
          nickname: res.data.nickName
        })
      }, fail(e) {
        console.log("未登录")
      }
    })
  },

  onLoad(options) {
    wx.request({
      url: 'http://127.0.0.1/API/wxuser/userback.php', //自己的服务接口地址
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) =>{
        console.log("res:",res.data)
        this.setData({
          name: res.data.username,
          gender: res.data.gender,
          age: res.data.age,
          phone: res.data.phone
        })
      }
    })
  },

  onUnload: function(){
    wx.reLaunch({
      url:"../../pages/index/index"
    })
  },

  toUsermsg: function (e) {
    wx.navigateTo({
      url: '../usermsg/usermsg'
    }) 

  },

})