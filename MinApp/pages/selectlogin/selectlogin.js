// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    avatarUrl: null,
    nickName: null,
    gender: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  login() {
    wx.switchTab({
      url: 'pages/index/index'
    })
  },

  getUserProfile(e) {
    let that = this
    // 获取个人信息
    wx.getUserProfile({
      desc: '用于获取用户个人信息',
      success: function (detail) {
        // console.log(detail);
        that.setData({
          avatarUrl: detail.userInfo.avatarUrl,
          nickName: detail.userInfo.nickName,
          gender: detail.userInfo.gender,
        })
        wx.login({
          success: res => {
            var code = res.code; //登录凭证
            // console.log('login detail:',detail)
            // console.log('detail.userInfo.nickName',detail.userInfo.nickName)
            wx.request({
              url: 'http://127.0.0.1/API/wxuser/user.php', //自己的服务接口地址
              method: 'post',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              // 需要传给后端的数据
              data: {
                encryptedData: detail.encryptedData,
                iv: detail.iv,
                code: code,
                userInfo: detail.rawData,
                name:detail.userInfo.nickName,
                url:detail.userInfo.avatarUrl
              },
              success: (res) => {
                console.log("res:", res.data)
                // console.log(res.data.session_key)
                // 将用户授权信息存储到本地
                wx.setStorageSync('userinfo', detail.userInfo)
                // 将后端返回的token存储到本地
                wx.setStorageSync('token', res.data.token)
                that.setData({
                  userInfo: detail.userInfo,
                  hasUserInfo: true
                })
              },
              fail: function () {
                console.log('系统错误')
              }
            })
          }
        });
      },
      fail: function () {
       wx.showModal({
         content: '取消授权将会影响相关服务，您确定取消授权吗？',
         success (res) {
           if (res.confirm) {
             wx.showToast({
               title: '已取消授权',
               duration: 1500
             })
           } else if (res.cancel) {
             that.getUserProfile()
           }
         }

       })
      }
    })
  },

  
  onGetUserInfo(e) {
    
    // if (userInfo) {
      let that = this
      // 获取个人信息
      wx.getUserProfile({
        desc: '用于获取用户个人信息',
        success: function (detail) {
          console.log(detail);
          const userInfo = detail.userInfo
          that.setData({
            avatarUrl: detail.userInfo.avatarUrl,
            nickName: detail.userInfo.nickName,
            gender: detail.userInfo.gender,
          })
          wx.login({
            success: res => {
              var code = res.code; //登录凭证 
              // console.log('login detail:',detail)
              // console.log('detail.userInfo.nickName',detail.userInfo.nickName)
              wx.request({
                url: 'http://127.0.0.1/API/wxuser/user.php', //自己的服务接口地址
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                // 需要传给后端的数据
                data: {
                  encryptedData: detail.encryptedData,
                  iv: detail.iv,
                  code: code,
                  userInfo: detail.rawData,
                  name:detail.userInfo.nickName,
                  url:detail.userInfo.avatarUrl
                },
                success: (res) => {
                  console.log("res:", res.data)
                  // console.log(res.data.session_key)
                  // 将用户授权信息存储到本地
                  wx.setStorage({
                    key: 'userInfo',
                    data: userInfo
                  })
                  wx.setStorageSync('userinfo', detail.userInfo)
                  // 将后端返回的token存储到本地
                  wx.setStorageSync('token', res.data.token)
                  that.setData({
                    userInfo: detail.userInfo,
                    hasUserInfo: true
                  }),
                  wx.showModal({
                    title: userInfo.nickName,
                    content: '授权登录成功',
                    showCancel: false,
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
                },
                fail: function () {
                  console.log('系统错误')
                }
              })
            }
          });
        },
        fail: function () {
         wx.showModal({
           content: '取消授权将会影响相关服务，您确定取消授权吗？',
           success (res) {
             if (res.confirm) {
               wx.showToast({
                 title: '已取消授权',
                 duration: 1500
               })
             } else if (res.cancel) {
               that.getUserProfile()
             }
           }
  
         })
        }
      })

  }
})