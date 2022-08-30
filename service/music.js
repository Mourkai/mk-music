import mkRequest from './mkRequest.js'

export function getBanner(){
    return mkRequest.get('/banner',{type:2})
}

export function getRankings(id){
    return mkRequest.get('/playlist/detail',{id})
}

export function getSongMenu(cat="全部",limit=6,offset=0){
    return mkRequest.get('/top/playlist',{
        cat,limit,offset
    })
}

export function getSongDetail(id){
    return mkRequest.get('/playlist/detail/dynmaic',{id})
}