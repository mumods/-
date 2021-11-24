import request from '../../utils/request.js'

// pages/classfy/classfy.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    rightContent:[],
    leftList:[],
    current:0,
    Cates:[],
    top:0
  },
  
async getdata(){
  let getdata = await request("/categories")
  this.data.Cates=getdata.message
  // console.log(this.Cates)
  let leftList = this.data.Cates.map(v=>v.cat_name)
  let right = this.data.Cates[0].children
  this.setData({
    leftList:leftList,
    rightContent:right
  })
  console.log(this.data.rightContent)
},
binditem(e){
  console.log(e)
  let {index} = e.currentTarget.dataset
  let right = this.data.Cates[index].children
  this.setData({
    rightContent:right,
    current:index
  })
},
  // wx.request({
  //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
  //   success:(res)=>{
  //     // console.log(res)
  //     this.Cates=res.data.message
  //     // console.log(this.Cates)
  //     //获取每一项的cat_name
  //     let leftList=this.Cates.map(v=>v.cat_name)
  //     let rightContent=this.Cates[0].children
  //     this.setData({
  //       leftList:leftList,
  //       rightContent:rightContent
  //     })
  //   }
  // })
  onLoad: function () {
    this.getdata()
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})