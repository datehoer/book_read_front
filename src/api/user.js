import request from '@/api/request'
export function login(data){
    return request({
        url:'/user/login',
        method:'post',
        data: data
    })
}