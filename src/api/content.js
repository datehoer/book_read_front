import request from '@/api/request'
export function getContentByChapterId(query) {
    return request({
        url: '/content/getContent',
        method: 'get',
        params: query
    })
}