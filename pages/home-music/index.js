// pages/home-music/index.js
import {getBanner,getSongMenu} from '../../service/music.js'
import {domHeight} from '../../utils/dom-height.js'
import { rankingStore } from '../../store/index'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        swiperHeight:0,
        banner:[],
        hotSongMenu:[],
        recommendSongMenu:[],
        recommendSongs:[],
        rankings:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getPageData()
        //store数据
        rankingStore.dispatch("getRankingDataAction")
        rankingStore.onState("hotRanking",(res)=>{
            if(!res.tracks) return;
            const recommendSongs = res.tracks.slice(0,6)
            this.setData({
                recommendSongs
            })
        })
        rankingStore.onState("newRanking",this.getRankingDataHandle)
        rankingStore.onState("originRanking",this.getRankingDataHandle)
        rankingStore.onState("topRanking",this.getRankingDataHandle)
    },
    getPageData(){
        getBanner().then(res=>{
            this.setData({
                banner:res.banners
            })
        })
        getSongMenu().then(res=>{
            this.setData({
                hotSongMenu:res.playlists
            })
        })
        getSongMenu('华语').then(res=>{
            this.setData({
                recommendSongMenu:res.playlists
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
    getRankingDataHandle(res){
        if(!res.tracks) return;
        const name = res.name;
        const coverImgUrl = res.coverImgUrl;
        const songList = res.tracks.slice(0,3)
        const playCount = res.playCount;
        const rankingObj = {name,coverImgUrl,songList,playCount}
        const newRankings = [...this.data.rankings]
        newRankings.push(rankingObj)
        this.setData({
            rankings:newRankings
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