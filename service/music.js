import mkRequest from './mkRequest.js'

export function getBanner(){
    return mkRequest.get('/banner',{type:2})
}