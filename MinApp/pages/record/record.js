// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      doctorsList:[],
      nickname:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      var that = this
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          console.log('uermsg',res.data)
          let nickname=res.data.nickName
          console.log(nickname)
          wx.request({
            url: 'http://127.0.0.1/API/wxuser/record.php', //自己的服务接口地址
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            // 需要传给后端的数据
            data: {
              nickname:nickname
            },
            success: (res) =>{
              console.log("res:",res.data)
              that.setData({
                doctorsList:res.data
              })
            }
          })
        }, fail(e) {
          console.log("未登录")
        }
      })

  },

})