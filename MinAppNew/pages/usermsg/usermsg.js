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
  nickName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //这里直接打印是可以得出nickname的
    // console.log(options.nickname)
    this.setData({
      nickName: options.nickname
    })
    //在这里就开始报错了
    // console.log(nickName)
  },

  formSubmit(e) {
    console.log("form发生了submit事件，携带数据为：", e.detail.value)
    console.log(e.detail.value.username)
    console.log(e.detail.value.gender[0])
    wx.request({
      url: 'http://127.0.0.1/API/wxuser/usermsg.php', //自己的服务接口地址
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      // 需要传给后端的数据
      data: {
        username: e.detail.value.username,
        gender: e.detail.value.gender[0],
        age: e.detail.value.age,
        phone: e.detail.value.phone,
        nickName: e.detail.value.nickName
      },
      success: (res) =>{
        console.log("res:",res.data)
      }
    })
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