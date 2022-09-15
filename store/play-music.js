import {
    HYEventStore
} from "hy-event-store"
import getLyricText from '../utils/getLyric'
import {
    getSongDetail,
    getSongLyric
} from '../service/player'
const audioContext = wx.createInnerAudioContext()

const playerStore = new HYEventStore({
    state: {
        id: '',
        song: {},
        lyricInfo: [],
        durationTime: 0,
        currentLyricIndex: 0,
        isPlaying:false,
        currentTime: 0,
        playModeIndex:0,//0循环播放，1单曲循环，2随机播放
    },
    actions: {
        playMusicWithSongIdAction(ctx, {
            id
        }) {
            if (id === ctx.id) return;
            ctx.id = id
            ctx.isPlaying = true
            getSongDetail(id).then(res => {
                ctx.song = res.songs[0]
                ctx.durationTime = res.songs[0].dt
            })
            getSongLyric(id).then(res => {
                const string = res.lrc.lyric
                const lyricInfo = getLyricText(string)
                ctx.lyricInfo = lyricInfo
            })
            audioContext.stop()
            audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
            audioContext.autoplay = true
            this.dispatch('setupAudioContextListener')
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
        },
        changeMusicPlayStatus(ctx){
            ctx.isPlaying = !ctx.isPlaying
            if(ctx.isPlaying){
                audioContext.play()
            }else{
                audioContext.pause()
            }
        }
    }
})



export {
    audioContext,
    playerStore
}