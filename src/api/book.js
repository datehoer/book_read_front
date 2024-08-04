import request from '@/api/request'

export function list(query){
    return request({
        url: '/book/list',
        method: 'get',
        params: query
    })
}

export function getBookInfoByBookId(bookId){
    return request({
        url: '/book/'+bookId,
        method: 'get',
    })
}