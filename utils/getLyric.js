export default function getLyric(lyricString){
    const arr = lyricString.split('\n')
    const lyricExp = /\[(\d{2}):(\d{2}).(\d{2,3})\]/
    const info = []
    for (const item of arr) {
        const timeResult = lyricExp.exec(item)
        if(!timeResult) continue;
        const minute = timeResult[1] * 60 * 1000
        const second = timeResult[2] * 1000
        const millSecond = timeResult[3].length < 3 ? timeResult[3] * 10 : timeResult[3]*1
        const time = minute+second+millSecond
        const text = item.replace(lyricExp,"")
        info.push({time,text})
    }
    return info
}