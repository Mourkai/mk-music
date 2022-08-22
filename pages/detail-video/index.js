import {getMvURL,getMvDetail,getRelatedMv} from '../../service/video.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mvUrlInfo:{},
        mvDetail:{},
        relatedData:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const id = options.id
        this.getPageData(id)
    },
    getPageData(id){
        getMvURL(id).then(res=>{
            this.setData({
                mvUrlInfo:res.data
            })
        })
        getMvDetail(id).then(res=>{
            this.setData({
                mvDetail:res.data
            })
        })
        getRelatedMv(id).then(res=>{
            this.setData({
                relatedData:res.data
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