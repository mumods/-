import request from "../../../../utils/request.js"
// pages/classfy/option_list/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    bottom:[
      {class:"icon-kefu",title:"联系客服"},
      {class:"icon-fenxiang",title:"分享"},
      {class:"icon-gouwuche",title:"购物车"}
    ]
  },
  good:{
    goods_id:''
  },
  goodsobj:{

  },
  /**
   * 生命周期函数--监听页面加载
   */
async goods(){
  let goo = await request("/goods/detail",this.good)
  this.goodsobj=goo.message
  this.setData({
    goodsList:goo.message
  })
},
preimg(e){
  let url = this.goodsobj.pics.map(v=>v.pics_mid)
  console.log(e)
  let {index} = e.currentTarget.dataset
  wx.previewImage({
    current:url[index],
    urls: url
  })
},
event(e){
  let index = e.currentTarget.dataset.index
  if(index==0){
    console.log("aaa")
  }
  else if(index==1){
    console.log("bbb")
  }
  else{
    wx.switchTab({
      url: '../../../cart/cart',
    })
  }
},
addcart(){
  let cart = wx.getStorageSync('cart')||[]
  let index = cart.findIndex(v=>v.goods_id==this.goodsobj.goods_id)
  if(index==-1){
    this.goodsobj.num=1
    this.goodsobj.checked=true
    cart.push(this.goodsobj)
  }
  else{
    cart[index].num++
  }
  wx.setStorageSync('cart', cart)
  wx.showToast({
    title: '加入成功',
    icon:"success",
    mask:true
  })
},
  onLoad: function (options) {
    this.good.goods_id=options.goods_id
    this.goods()
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