// app.js
App({
  onLaunch() {
    wx.getSystemInfo({
      success: (result) => {
          this.globalData.screenHeight = result.screenHeight
          this.globalData.screenWidth = result.screenWidth
      }
    })
  },
  globalData: {
    screenWidth:0,
    screenHeight:0
  }
})
