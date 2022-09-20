import {
    HYEventStore
} from "hy-event-store"
import getLyricText from '../utils/getLyric'
import {
    getSongDetail,
    getSongLyric
} from '../service/player'
const audioContext = wx.getBackgroundAudioManager()

const playerStore = new HYEventStore({
    state: {
        isFirstPlay:true,
        id: '',
        song: {},
        lyricInfo: [],
        durationTime: 0,
        currentLyricIndex: 0,
        isPlaying:false,
        currentTime: 0,
        playModeIndex:0,//0循环播放，1单曲循环，2随机播放
        playListSongs:[],//当前播放歌曲的总列表
        playListIndex:0//当前播放歌曲的索引
    },
    actions: {
        playMusicWithSongIdAction(ctx, {
            id
        }) {
            if (id === ctx.id) return;
            ctx.id = id
            ctx.isPlaying = true
            ctx.lyricInfo = []
            ctx.song = {}
            ctx.durationTime = 0
            ctx.currentTime = 0
            ctx.currentLyricIndex=0
            audioContext.stop()
            audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
            audioContext.title = id
            audioContext.autoplay = true
            
            getSongDetail(id).then(res => {
                ctx.song = res.songs[0]
                ctx.durationTime = ctx.song.dt
                audioContext.title = ctx.song.name
                audioContext.coverImgUrl = ctx.song.al.picUrl
            })
            getSongLyric(id).then(res => {
                const string = res.lrc.lyric
                const lyricInfo = getLyricText(string)
                ctx.lyricInfo = lyricInfo
            })
            if(ctx.isFirstPlay){
                this.dispatch('setupAudioContextListener')
                ctx.isFirstPlay = false
            }
        },
        setupAudioContextListener(ctx) {
            audioContext.onCanplay(() => {
                audioContext.play()
            })  
            audioContext.onTimeUpdate(() => {
                const currentTime = audioContext.currentTime * 1000
                ctx.currentTime = currentTime
                const currentLyricIndex = ctx.lyricInfo.findIndex(item => item.time > currentTime);
                ctx.currentLyricIndex = currentLyricIndex - 1
            })

            audioContext.onEnded(()=>{
                this.dispatch('changeNewMusic')
            })
            audioContext.onPause(()=>{
                ctx.isPlaying = false
            })
            audioContext.onPlay(()=>{
                ctx.isPlaying = true
            })
        },
        changeMusicPlayStatus(ctx){
            ctx.isPlaying = !ctx.isPlaying
            if(ctx.isPlaying){
                audioContext.play()
            }else{
                audioContext.pause()
            }
        },
        changeNewMusic(ctx,isNext = true){//type 0上一首， 1下一首
            let index  = ctx.playListIndex
            if(ctx.playModeIndex == 0){ //列表循环
                index = isNext ? index+1:index-1
                //下一首最后一首回到原点
                if(index == ctx.playListSongs.length) index = 0
                //上一首，到第一手 跳到最后一首
                if(index == -1) index = ctx.playListSongs.length-1
            }else if(ctx.playModeIndex == 1){ //单曲播放
                console.log('单曲循环');
            }else{ //随机播放
                index = Math.floor(Math.random() * ctx.playListSongs.length)
            }
            let currentSong = ctx.playListSongs[index]
            if(!currentSong){
                currentSong = ctx.currentSong
            }else{
                ctx.playListIndex = index
            }
            this.dispatch('playMusicWithSongIdAction',{id:currentSong.id})
        }
    }
})



export {
    audioContext,
    playerStore
}