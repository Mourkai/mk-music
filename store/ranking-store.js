import {
    HYEventStore
} from 'hy-event-store'
import {
    getRankings
} from '../service/music'
const rankingMap = {3779629:'newRanking',3778678:'hotRanking',2884035:'originRanking',19723756:'topRanking'}
const idArr = [3779629,3778678,2884035,19723756]
const rankingStore = new HYEventStore({
    state: {
        newRanking: {}, //新歌
        hotRanking: {}, //热歌
        originRanking: {}, //原创
        topRanking: {} //飙升
    },
    actions: {
        getRankingDataAction(ctx) {
            idArr.forEach(item=>{
                getRankings(item).then(res => {
                    ctx[rankingMap[item]] = res.playlist
                })
            })
        }
    }
})

export {
    rankingStore,
    rankingMap
}