import request from '@/api/request'

export function list(query){
    return request({
        url: '/chapter/list',
        method: 'get',
        params: query
    })
}
export function getChapterNeighbors(query){
    return request({
        url: '/chapter/getChapterNeighbors',
        method: 'get',
        params: query
    })
}