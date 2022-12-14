const BASE_URL = 'http://codercba.com:9002'
class mkRequest{
    request(url,method,data){
        return new Promise((resovle,reject)=>{
            wx.request({
                url: BASE_URL+url,
                data,
                method,
                success: (result) => {
                    resovle(result.data)
                },
                fail: reject
              })
        })
    }

    get(url,data){
        return this.request(url,'GET',data)
    }

    post(url,data){
        return this.request(url,'POST',data)
    }
}

const request = new mkRequest()
export default request
