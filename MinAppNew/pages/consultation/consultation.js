// pages/consultation/consultation.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航数组
    catesList:[] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCatesList();
  },

  // 获取分类导航数据
  getCatesList(){
    wx.request({
      url: 'http://127.0.0.1/API/catitems',
      success: (result) => {
        console.log(result)
        console.log(result.data.message)
        this.setData({
          catesList: result.data.message
        })
      }
    })
  },


})
