// pages/music-player/index.js
import { audioContext,playerStore } from '../../store/index'
const playModeNameArr = ['order','repeat','random']
Page({
    data: {
        song:{},
        lyricInfo:[],
        durationTime:0,
        currentTime:0,
        currentLyricIndex:0,
        isPlaying:false,
        playModeIndex:0,
        playModeName:"order",
        isShowLyric:true,
        currentPage:0,
        swiperHeight:0,
        sliderValue:0,
        lyricScrollTop:0,
        sliderChanging:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setupPlayStoreListener()
        const globalData = getApp().globalData
        const statusBarHeight = globalData.statusBarHeight
        const screenHeight = globalData.screenHeight
        const screenWidth = globalData.screenWidth
        const swiperHeight = screenHeight - statusBarHeight - 44;
        this.setData({
            swiperHeight
        })
        const device = screenHeight/screenWidth;
        if(device < 2){
            this.setData({
                isShowLyric:false
            })
        }
    },
    pauseMusic(){
        playerStore.dispatch('changeMusicPlayStatus')
    },
    handleSwiperChange(e){
        const currentPage = e.detail.current
        this.setData({
            currentPage,
            sliderChanging:false
        })
    },
    handleSliderChange(e){
        const value = e.detail.value
        const currentTime = this.data.durationTime * value / 100
        audioContext.pause()
        audioContext.seek(currentTime/1000)
        this.setData({
            sliderValue:value
        })
    },
    handleSliderChanging(e){
        const value = e.detail.value
        const currentTime = this.data.durationTime * value / 100
        this.setData({sliderChanging:true,currentTime})
    },
    playModeClick(){
        let playModeIndex = this.data.playModeIndex + 1
        if(playModeIndex === 3){
            playModeIndex = 0
        }
        playerStore.setState('playModeIndex',playModeIndex)
    },
    back(){
        wx.navigateBack()
    },
    setupPlayStoreListener:function(){
        playerStore.onStates(["song","lyricInfo","durationTime"],({
            song,
            lyricInfo,
            durationTime
        })=>{
            if(song) this.setData({song})
            if(lyricInfo) this.setData({lyricInfo})
            if(durationTime) this.setData({durationTime})
        })

        playerStore.onStates(["currentTime","currentLyricIndex"],({currentTime,currentLyricIndex})=>{
            if(currentTime && !this.data.sliderChanging){
                const sliderValue = currentTime / this.data.durationTime * 100
                this.setData({currentTime,sliderValue})
            }
            if(currentLyricIndex){
                this.setData({currentLyricIndex,lyricScrollTop:currentLyricIndex * 35})
            }
        })
        playerStore.onStates(["playModeIndex","isPlaying"],({playModeIndex,isPlaying})=>{
            if(playModeIndex){
                this.setData({playModeIndex,playModeName:playModeNameArr[playModeIndex]})
            }
            if(isPlaying !== undefined){
                this.setData({isPlaying})
            }
        })
    }
})