var app = getApp()
var gburl = app.globalData.url
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    loginSH: "",
    zhuxiaoSH: "",
    _src:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          loginSH: "none",
          zhuxiaoSH: "block",
          _src: res.data.avatarUrl,
        })
      }, fail(e) {
        console.log("未登录")
        that.setData({
          loginSH: "block",
          zhuxiaoSH: "none"
        })
      }
    })
  },

  login: function (e) {
    wx.navigateTo({
      url: '../selectlogin/selectlogin'
    })
  },
  zhuxiao:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '您确定要注销登录吗？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'userInfo',
            success(res) {
              that.setData({
                loginSH: "block",
                zhuxiaoSH: "none",
                _src: "",
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })  
   
  },
  
  toUsermessage: function (e) {
    wx.navigateTo({
      url: '../msgshow/msgshow?nickName='
    })

  }

})