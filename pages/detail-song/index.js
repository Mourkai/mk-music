// pages/detail-song/index.js
import { rankingStore} from '../../store/index'
import { getSongDetail } from '../../service/music.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type:'',
        ranking:'',
        songInfo:{},
        menuInfo:{}
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            type:options.type
        })
        if(options.type == 'menu'){
            getSongDetail(options.id).then(res=>{
                this.setData({
                    songInfo:res.playlist
                })
            })
        }else{
            this.setData({
                ranking:options.ranking
            })
            rankingStore.onState(options.ranking,this.getRankingData)
        }
    },
    getRankingData(res){
        this.setData({
            songInfo:res
        })
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        if(this.data.ranking){
            rankingStore.offState(this.data.ranking,this.getRankingData)
        }
    }
})