// app.js
App({
  onLaunch() {
    wx.getSystemInfo({
      success: (result) => {
          this.globalData.screenHeight = result.screenHeight
          this.globalData.screenWidth = result.screenWidth
          this.globalData.statusBarHeight = result.statusBarHeight
      }
    })
  },
  globalData: {
    screenWidth:0,
    screenHeight:0,
    statusBarHeight:0
  }
})
