// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keshi:'',
    zhengzhuang:'',
    yufang:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    console.log(options.keshi);
    that.setData({
      keshi:options.keshi
    })
    wx.request({
      url: 'http://127.0.0.1/API/hospital/showdis.php',
      method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        // 需要传给后端的数据
        data: {
          keshi: options.keshi
        },
        success: (res) =>{
          console.log("res:",res.data)
          that.setData({
            zhengzhuang:res.data.zhengzhuang,
            yufang: res.data.yufang
          })
        }
    })
    
  },

  toRegister: function(e){
    console.log(e.currentTarget.dataset.key)
    var keshi = e.currentTarget.dataset.key
    wx.navigateTo({
      url: '../register/register?keshi=' + keshi
    })
  }
})