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
    
  },

  onLoad(options) {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log('uermsg',res.data)
        that.setData({
          nickname: res.data.nickName
        })
        wx.request({
          url: 'http://127.0.0.1/API/wxuser/userback.php', //自己的服务接口地址
          method: 'post', 
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data:{
            nickName: res.data.nickName
          },
          success: (res) =>{
            console.log("res:",res.data)
            if(res.data==null){
              wx.showModal({
                content: '请先完善个人信息',
                confirmText: '确定',
                success: function(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/usermsg/usermsg'
                    })
                  }
                }
              });
            }
            else{
              that.setData({
                name: res.data.username,
                gender: res.data.gender,
                age: res.data.age,
                phone: res.data.phone
              })
            }
            
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

  tiaozhuan: function(e){
    wx.showModal({
      content: '请完善个人信息',
      confirmText: '确定',
      success: function(res) {
        // 用户没有授权成功，不需要改变 isHide 的值
        if (res.confirm) {
          wx.switchTab({
            url: '../usermsg/usermsg'
          })
        }
      }
    });
  }

})