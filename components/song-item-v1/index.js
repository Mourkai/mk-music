// components/song-item-v1/index.js
import { playerStore } from '../../store/index'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item:{
            type:Object,
            value:{}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleSongClick(){
            const id = this.properties.item.id
            playerStore.dispatch('playMusicWithSongIdAction',{id})
            wx.navigateTo({
                url: '/pages/music-player/index?id='+id,
            })
        }
    }
})
