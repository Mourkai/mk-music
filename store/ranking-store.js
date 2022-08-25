import {
    HYEventStore
} from 'hy-event-store'
import {
    getRankings
} from '../service/music'
const rankingStore = new HYEventStore({
    state: {
        newRanking: {}, //新歌
        hotRanking: {}, //热歌
        originRanking: {}, //原创
        topRanking: {} //飙升
    },
    actions: {
        getRankingDataAction(ctx) {
            const idArr = [3779629, 3778678, 2884035, 19723756]
            idArr.forEach((item, index) => {
                getRankings(item).then(res => {
                    switch (index) {
                        case 0:
                            ctx.newRanking = res.playlist
                            break;
                        case 1:
                            ctx.hotRanking = res.playlist
                            break;
                        case 2:
                            ctx.originRanking = res.playlist
                            break;
                        case 3:
                            ctx.topRanking = res.playlist
                            break;
                    }
                })
            })
        }
    }
})

export {
    rankingStore
}