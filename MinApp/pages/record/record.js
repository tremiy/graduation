// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      doctorsList:[],
      nickname:''
  },


  onRefresh(){
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.onLoad();
  },


  onPullDownRefresh: function () {
    //调用刷新时将执行的方法
    this.onRefresh();
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
              }),
              //隐藏loading 提示框
              wx.hideLoading();
              //隐藏导航条加载动画
              wx.hideNavigationBarLoading();
              //停止下拉刷新
              wx.stopPullDownRefresh();
            }
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

})