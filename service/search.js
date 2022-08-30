import mkRequest from './mkRequest.js'

export function getSearch(){
    return mkRequest.get('/search/hot')
}

export function getSearchSuggest(keywords){
    return mkRequest.get('/search/suggest',{
        keywords,
        type:'mobile'
    })
}

export function getSearchResult(keywords){
    return mkRequest.get('/search',{
        keywords
    })
}