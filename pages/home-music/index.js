// pages/home-music/index.js
import {getBanner,getSongMenu} from '../../service/music.js'
import {domHeight} from '../../utils/dom-height.js'
import { rankingStore,rankingMap} from '../../store/index'

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
            console.log(res);
            this.setData({
                hotSongMenu:res.playlists
            })
        })
        getSongMenu('华语').then(res=>{
            console.log(res);
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
        if(Object.keys(res).length === 0) return;
        const name = res.name;
        const coverImgUrl = res.coverImgUrl;
        const songList = res.tracks.slice(0,3)
        const playCount = res.playCount;
        const id = res.id;
        const rankingObj = {name,coverImgUrl,songList,playCount,id}
        const newRankings = [...this.data.rankings]
        newRankings.push(rankingObj)
        this.setData({
            rankings:newRankings
        })
    },
    onUnload(){
        console.log("onUnloadonUnloadonUnload");
    },
    handleMoreClick(re){
        const id = re.currentTarget.dataset.id;
        const rankingName = rankingMap[id]
        wx.navigateTo({
          url: '/pages/detail-song/index?ranking='+rankingName+'&type=ranking',
        })
    }
})