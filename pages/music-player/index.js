// pages/music-player/index.js
import {getSongDetail} from '../../service/player'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        song:{},
        currentPage:0,
        swiperHeight:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getPageData(options)
        const globalData = getApp().globalData
        const statusBarHeight = globalData.statusBarHeight
        const screenHeight = globalData.screenHeight
        const swiperHeight = screenHeight - statusBarHeight - 44;
        this.setData({
            swiperHeight
        })
        const audioContext = wx.createInnerAudioContext()
        audioContext.src = `https://music.163.com/song/media/outer/url?id=475479888.mp3`
        //audioContext.play()
    },
    handleSwiperChange(e){
        const currentPage = e.detail.current
        this.setData({
            currentPage
        })
    },
    getPageData({id}){
        getSongDetail(id).then(res=>{
            this.setData({
                song:res.songs[0]
            })
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