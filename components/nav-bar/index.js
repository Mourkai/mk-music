// components/nav-bar/index.js
Component({
    options:{
        multipleSlots:true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        title:{
            type:String,
            value:'我是默认'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        statusBarHeight:getApp().globalData.statusBarHeight
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
