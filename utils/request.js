let times=0
export default(url,data={},method="GET")=>{
  wx.showLoading({
    title: '加载中',
  })
  times++
  return new Promise((resolve,reject) => {
    let host="https://api-hmugo-web.itheima.net/api/public/v1"
    wx.request({
      url:host+url,
      data,
      method,
      success:(res)=>{
       resolve(res.data)
      },
      fail:(err)=>{
       reject(err)
      },
      complete:()=>{
        times--
        if(times==0){
          wx.hideLoading()
        }
      }
    })
  })
}