// pages/detail-search/index.js
import {
    getSearch,
    getSearchSuggest,
    getSearchResult
} from '../../service/search'
import debounce from '../../utils/debounce'
//防抖
const debounceGetSearchSuggest = debounce(getSearchSuggest, 500)
Page({
    /**
     * 页面的初始数据
     */
    data: {
        hotKeywords: [],
        suggestSongs: [],
        richSuggestSongs:[],
        resultSongs:[],
        searchValue: "",
        nodes: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getPageData()
    },
    getPageData() {
        getSearch().then(res => {
            this.setData({
                hotKeywords: res.result.hots
            })
        })
    },
    handleInputChange(e) {
        const value = e.detail
        this.setData({
            searchValue: value
        })
        if (!value.length) {
            this.setData({
                suggestSongs: [],
                resultSongs:[]
            })
            
            return;
        }
        //组装nodes
        debounceGetSearchSuggest(value).then(res => {
            const suggestSongs = res.result.allMatch
            const richSuggestSongs = [];
            suggestSongs.forEach(item=>{
                const nodes = [];
                //转换大小写匹配
                if(item.keyword.toUpperCase().startsWith(value.toUpperCase())){
                    const key1 = item.keyword.slice(0,value.length)
                    const node1 = {
                        name:'span',
                        attrs:{style:'color:#26ce8a;font-size:14px'},
                        children:[{type:'text',text:key1}]
                    }
                    nodes.push(node1)
                    const key2 = item.keyword.slice(value.length)
                    const node2 = {
                        name:'span',
                        attrs:{style:'font-size:14px'},
                        children:[{type:'text',text:key2}]
                    }
                    nodes.push(node2)
                }else{
                    const node = {
                        name:'span',
                        attrs:{style:'font-size:14px'},
                        children:[{type:'text',text:item.keyword}]
                    }
                    nodes.push(node)
                }
                richSuggestSongs.push({
                    nodes,
                    keyword:item.keyword
                })
            })
            this.setData({
                richSuggestSongs
            })
        })
    },
    handleInputAction(){
        const searchValue = this.data.searchValue
        getSearchResult(searchValue).then(res=>{
            this.setData({
                resultSongs:res.result.songs
            })
        })
    },
    handleKeywordItemClick(e){
        const searchValue = e.currentTarget.dataset.keyword
        this.setData({searchValue})
        this.handleInputAction()
    },
    onUnload() {

    },

})