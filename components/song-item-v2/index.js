// components/song-item-v2/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data:{
            type:Object,
            value:{}
        },
        index:{
            type:String | Number,
            value:""
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
            const id = this.properties.data.id
            wx.navigateTo({
              url: '/pages/music-player/index?id='+id,
            })
        }
    }
})
