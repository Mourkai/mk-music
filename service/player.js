import mkRequest from './mkRequest.js'

export function getSongDetail(ids){
    return mkRequest.get('/song/detail',{ids})
}

export function getSongLyric(id){
    return mkRequest.get('/lyric',{id})
}