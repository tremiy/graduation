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
        // console.log(options.keshi)
        // var keshi='神经内科'
        wx.request({
            url: 'http://127.0.0.1/API/hospital/doctorList.php', //自己的服务接口地址
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            // 需要传给后端的数据
            data: {
              keshi:options.keshi
              // keshi:keshi
            },
            success: (res) =>{
              console.log("res:",res.data)
              that.setData({
                doctorsList: res.data
              })
            }
          });

    },

    onShow: function () {
      var that = this
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          console.log('uermsg',res.data)
          that.setData({
            nickname: res.data.nickname
          })
        }, fail(e) {
          console.log("未登录")
        }
      })
    },

    yuyue:function(e){
      // console.log(e)
      let id = e.currentTarget.dataset.key;
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          console.log('uermsg',res.data)
          let nickname=res.data.nickName
          console.log(nickname)
          wx.request({
            url: 'http://127.0.0.1/API/hospital/yuyue.php', //自己的服务接口地址
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            // 需要传给后端的数据
            data: {
              nickname:nickname,
              doctorId:id
            },
            success: (res) =>{
              console.log("res:",res.data)
              wx.showModal({
                content: '挂号成功',
                showCancel: false,
                confirmText: '确定',
                success: function(res) {
                  // 用户没有授权成功，不需要改变 isHide 的值
                  if (res.confirm) {
                    wx.switchTab({
                      url: '/pages/record/record'
                    })
                  }
                }
              });
            }
          })
        }, fail(e) {
          console.log("未登录")
        }
      })
      
    }

  })