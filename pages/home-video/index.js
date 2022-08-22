// pages/home-video/index.js
import {topMv} from '../../service/video.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        topMvs:[],
        hasMore:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.loadData(0)
    },
    async loadData(offset){
        wx.showNavigationBarLoading()
        const mv = await topMv({offset,limit:10});
        let newData = []
        if(offset == 0){
            newData = mv.data
        }else{
            newData = this.data.topMvs.concat(mv.data)
        }
        this.setData({
            topMvs:newData,
            hasMore:mv.hasMore
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
    },
    onPullDownRefresh() {
        this.loadData(0)
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    async onReachBottom() {
        if(this.data.hasMore){
            this.loadData(this.data.topMvs.length)
        }
    },
    handleVideoClick(event){
        console.log(event);
        const id = event.currentTarget.dataset.item.id;
        wx.navigateTo({
          url: '/pages/detail-video/index?id='+id,
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



    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})