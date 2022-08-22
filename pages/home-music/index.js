// pages/home-music/index.js
import {getBanner} from '../../service/music.js'
import {domHeight} from '../../utils/dom-height.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        swiperHeight:0,
        banner:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getPageData()
    },
    getPageData(){
        getBanner().then(res=>{
            this.setData({
                banner:res.banners
            })
        })
    },
    handleImageLoaded(){
        domHeight('.swiper-image').then(res=>{
            this.setData({
                swiperHeight:res[0].height
            })
        })
    },
    handleInputClick(){
        wx.navigateTo({
          url: '/pages/detail-search/index'
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log(getApp().globalData.userInfo);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})