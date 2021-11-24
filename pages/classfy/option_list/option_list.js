// pages/classfy/option_list/option_list.js
import request from "../../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    index:0,
    isActive:false,
    tabs:[
      {
        id:0,
        title:"综合",
        isActive:true
      },
      {
        id:1,
        title:"销量",
        isActive:false
      },
      {
        id:2,
        title:"价格",
        isActive:false
      }
    ]
  },
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:7
  },

  /**
   * 生命周期函数--监听页面加载
   */
  itemChange(e){
    let index=e.detail.index
    let tabs=this.data.tabs
     tabs.forEach((v,i)=>i==index?v.isActive=true:v.isActive=false)
      this.setData({
        tabs,
        index
      })
  },
  item(){

  },
  refresh(){
    this.setData({
      goods:[]
    })
    this.QueryParams.pagenum=1
    this.option()
  },
  totalPages:1,
  async option(){
    let res = await request("/goods/search",this.QueryParams)
    const total = res.message.total;
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
    console.log(res)
    this.setData({
      goods:[...this.data.goods,...res.message.goods],
        isActive:false
    })
    console.log(this.data.goods)
  },

  onLoad: function (options) {
    this.QueryParams.cid=options.cid
    this.option()
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
    // this.setData({
    //   goods:[],
    // })
    // let pagenum = this.QueryParams.pagenum
    // pagenum = 1
    // console.log(pagenum)
    // this.option()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum>=this.totalPages){
    }
    else{
      this.QueryParams.pagenum++;
      this.option()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})