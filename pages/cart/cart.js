

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    judge:false,
    address:[],
    cart:[],
    allchecked:false,
    allprice:0
  },
  //获取地址
getinfo(){
  wx.chooseAddress({
    success: (result) => {
      // console.log(result)
      wx.setStorageSync('result', result)
      let address = wx.getStorageSync('result')
      this.setData({
        judge:true,
        address:address
      })
    },
    fail: (err) =>{
      this.setData({
        judge:false,
        address:[],
      })
      wx.setStorageSync('result', '')
    }
  })
},
//将地址传入data
getaddress(){
      let address = wx.getStorageSync('result')
      if(address){
      this.setData({
        judge:true,
        address:address
      })}
  },
  //将cart缓存传入data
  getcart(){
    let cart = wx.getStorageSync('cart')||[]
    this.setData({
      cart:cart
    })
  },
  //减少商品数量
  reduce(e){
    let cart = this.data.cart
    let index = e.currentTarget.dataset.index
    if(cart[index].num>1){
      cart[index].num--
      this.setData({
        cart
      })
      wx.setStorageSync('cart', cart)
      this.allprice()
    }
    else{
      wx.showModal({
        title:"提示",
        content:"是否删除商品",
        cancelColor: 'cancelColor',
        showCancel:true,
        success:(res)=>{
          if(res.confirm){
            cart.splice(index,1);
          console.log(cart)
          this.setData({
            cart,
          })
          if(cart){
            this.setData({
              allchecked:false
            })
          }
          wx.setStorageSync('cart', cart)
          this.allprice()
          }
        }
      })
    }
  },
  //增加商品数量
  add(e){
    let cart = this.data.cart
    let index = e.currentTarget.dataset.index
    console.log(cart[index].num)
    if(cart[index].num<10){
      cart[index].num++
    }
    else{
      wx.showToast({
        title: '商品数最大为10',
        icon:"none"
      })
    }
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
    this.allprice()
  },
  allcheck(){
    if(cart){
    var allchecked = true
    cart.forEach(v=>{
      if(!v.checked){
        allchecked=false
      }
    })
  }
  },
  //计算总价
  allprice(){
    let cart = wx.getStorageSync('cart')
    let allprice=0
    let allchecked = true
    if(cart.length!=0){
    cart.forEach(v=>{
      if(v.checked){
        allprice+=v.goods_price*v.num
      }
      else{
        allchecked=false
      }
    })
  }
    else{
    allchecked=false
  }
    this.setData({
      allprice:allprice,
      allchecked:allchecked
    })
    console.log(allchecked)
  },
  //checked框点击修改后台checked的数据
  state(e){
    let index = e.currentTarget.dataset.id
    let cart = this.data.cart
    cart[index].checked=!cart[index].checked
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
    this.allprice()
  },
  //全选切换
  allchange(){
    let cart = this.data.cart
    this.data.allchecked=!this.data.allchecked
    if(this.data.allchecked){
      for(let i=0;i<cart.length;i++){
        cart[i].checked=true
      }
    }
    else{
      for(let i=0;i<cart.length;i++){
        cart[i].checked=false
      }
    }
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getaddress()
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
    this.getcart()
    this.allprice()
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
    this.setData({
      address:[],
      cart:[]
    })
    wx.stopPullDownRefresh({
      success: (res) => {
        this.getaddress()
        this.getcart()
      },
    })
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