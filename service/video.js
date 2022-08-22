import mkRequest from './mkRequest.js'

export function topMv(data){
    return mkRequest.get('/top/mv',data)
}

export function getMvURL(id){
    return mkRequest.get('/mv/url',{id})
}

export function getMvDetail(mvid){
    return mkRequest.get('/mv/detail',{mvid})
}

export function getRelatedMv(id){
    return mkRequest.get('/related/allvideo',{id})
}