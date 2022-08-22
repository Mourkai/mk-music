const domHeight = dom=>{
    return new Promise((resolve,reject)=>{
        const query = wx.createSelectorQuery()
        query.select(dom).boundingClientRect()
        query.exec(res=>resolve(res))
    })
}

export {
    domHeight
}