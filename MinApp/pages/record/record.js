// pages/doctor/doctor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false
  },

  detailFun:function(){
    if(this.data.type == 0){
      wx.navigateTo({
        url: '/pages/GHDetail/GHDetail',
      })
    }
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
            isLogin:true
          })
        }, fail(e) {
          console.log("未登录")
          wx.showModal({
            content: '未登录',
            confirmText: '确定',
            success: function(res) {
              // 用户没有授权成功，不需要改变 isHide 的值
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }
            }
          });
        }
      })
    },

    noLogin: function(){
      wx.navigateTo({
        url: 'pages/noLogin/noLogin'
      })
    }

})
