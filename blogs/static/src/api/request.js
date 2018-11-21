import axios from 'axios';

export default {
    get(action, params) {
        let url = action;
        return axios.get(url, params).then(
            (res) => {
                if (!!res) {
                    return res;
                }
            }
        ).catch(error => {
            throw error;
        })
    },
    post(action,params,query){
        let url = action;
        return axios.post(url,params,query).then(
            (res)=>{
                if(!!res){
                    return res;
                }
            }
        ).catch(error=>{
            throw error;
        })
    }
}

