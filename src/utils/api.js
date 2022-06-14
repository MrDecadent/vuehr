import axios from 'axios'
import { Message } from 'element-ui'

axios.interceptors.response.use(success=>{
    //success.status是浏览器相应上面的状态码
    //success.data.status是返回的数据里面的status字段
    if(success.status && success.status==200 && success.data.status==500){//业务上的错误
        Message.error({message:success.data.msg})
        return;
    }
    if(success.data.msg){
        Message.success({message: success.data.msg})
    }
    return success.data;
},error =>{
    if(error.response.status == 504 ||error.response.status == 404 ){
        Message.error({message:'服务被恰咯( ╯□╰ )'})
    }else if(error.response.status == 403){
        Message.error({message:'权限不足，请联系管理员'})
    }else if(error.response.status == 401){
        Message.error({message:'尚未登陆，请登录'})
    }else{
        if(error.response.msg != null){
            Message.error({message:error.response.data.msg})
        }else{
            Message.error({message:'未知错误'})
        }
    }
    return;
})

let base ='';

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export const postRequest=(url,params)=>{
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

export const putRequest=(url,params)=>{
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}

export const getRequest=(url,params)=>{
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}

export const deleteRequest=(url,params)=>{
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}