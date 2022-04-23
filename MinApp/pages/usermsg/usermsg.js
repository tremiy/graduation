// pages/usermsg/usermsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {hasPerson: false,
    chosen: '',
    gender: [
      { name:'0', value:'男'},
      { name:'1', value:'女'},
  ],
  hasPerson:false,
  checkNum: 0,
  max:false,
  maxCheckedNum: 1,
  realgender: '',
  //明明这里定义了nickname
  nickName:"",
  username:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    //这里直接打印是可以得出nickname的
    // console.log(options)
    that.setData({
      nickName: options.nickname
    })
    //在这里就开始报错了
    // console.log(nickName)
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log('uermsg',res.data)
        that.setData({
          nickName: res.data.nickName
        })
      }, fail(e) {
        console.log("未登录")
      }
    })
  },

  formSubmit(e) {
    console.log("form发生了submit事件，携带数据为：", e.detail.value)
    console.log(e.detail.value.username)
    console.log(e.detail.value.gender[0])
    var t = e.detail.value.gender[0]
    if(e.detail.value.username==""){
      wx.showModal({
        content:"姓名不能为空"
      })
    }
    else if(!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(e.detail.value.username)){
      wx.showModal({
        content:"只能输入中文/英文的姓名，请勿输入其他符号"
      })
    }
    else if(e.detail.value.gender==""){
      wx.showModal({
        content:"性别不能为空"
      })
    }
    else if(e.detail.value.age==""){
      wx.showModal({
        content:"年龄不能为空"
      })
    }
    else if(!/^([1-9]\d?|1[01]\d|120)$/.test(e.detail.value.age)){
      wx.showModal({
        content:"请输入正确的年龄"
      })
    }
    else if(e.detail.value.phone==""){
      wx.showModal({
        content:"电话不能为空"
      })
    }
    else if (!/^1[3456789]\d{9}$/.test(e.detail.value.phone) || e.detail.value.phone.length < 11) {
      wx.showModal({
        content:"您输入的电话号码有误"
      })
   }
    else{
      wx.setStorageSync('age', e.detail.value.age)
      wx.request({
        url: 'http://127.0.0.1/API/wxuser/usermsg.php', //自己的服务接口地址
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        // 需要传给后端的数据
        data: {
          username: e.detail.value.username,
          gender: t,
          age: e.detail.value.age,
          phone: e.detail.value.phone,
          nickName: this.data.nickName
        },
        success: (res) =>{
          console.log("res:",res.data)
          wx.showModal({
            content: '提交成功',
            confirmText: '确定',
            success: function(res) {
              // 用户没有授权成功，不需要改变 isHide 的值
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/msgshow/msgshow'
                })
              }
            }
          });
          
        }
      })
    }
    
  },

  formReset(e) {
    console.log("form发生了reset事件，携带数据为：", e.detail.value)
    this.setData({
      chosen: ''
    })
  },

  checkChange(e) {
    let id = e.currentTarget.id;
    this.setData({
      realgender: id
    })
    this.data.gender[id].checked = !this.data.gender[id].checked;
    this.data.checkNum = this.data.gender[id].checked ? this.data.checkNum + 1 : this.data.checkNum - 1;
    this.checkMax(this.data.checkNum);
    
},

  checkMax(num) {
    const maxNum = this.data.maxCheckedNum;
    const gender = this.data.gender;
    if (num == maxNum) {
        var status = true;
    } else if (num < maxNum && this.data.max) {
        var status = false;
    }
    if (status != undefined) {
        this.data.max = status;
        for (var i = 0; i < gender.length; i++) {
            if (!gender[i].checked) gender[i].canCheck = status;
        }
        this.setData({
            gender: gender
        })
    }
},


})