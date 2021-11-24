// index.js
// 获取应用实例
const app = getApp()
import request from "../../utils/request.js"
Page({
  data: {
    swiperList:[],
    navigateList:[],
    levList:[],
    asd:"jjjj"
  },

  //通过封装函数获取轮播数据
// async asd(){
//     let result = await request('/home/swiperdata',{type:2})
//     this.setData({
//             swiperList:result.message
//           })
//   },
  async nav(){
    let navigate = await request("/home/catitems",{type:2})
    this.setData({
      navigateList:navigate.message
    })
  },
  async lev(){
    let levl = await request("/home/floordata",{type:2})
    this.setData({
      levList:levl.message
    })
  },
  onLoad:function(){

    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success:(res)=>{
        console.log(res)
        this.setData({
          swiperList:res.data.message
        })
      }
    })

    
    // this.asd()
    this.nav()
    this.lev()
    //获取导航栏
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
    //   data:{type:2},
    //   success:(res)=>{
    //     // console.log(res)
    //     this.setData({
    //       navigateList:res.data.message
    //     })
    //   }
    // })

    //获取楼层图
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
    //   data:{type:2},
    //   success:(res)=>{
    //     // console.log(res)
    //     this.setData({
    //       levList:res.data.message
    //     })
    //   }
    // })
  },
onPullDownRefresh:function () {
  this.setData({
    swiperList:[],
    navigateList:[],
    levList:[]
  })
  this.asd()
    this.nav()
    this.lev()
    wx.stopPullDownRefresh({
      success: (res) => {
        wx.showToast({
          title: '刷新成功',
          icon:"success",
          duration:1000
        })
      },
    })
}
})
