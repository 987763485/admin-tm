import request from '@/utils/request'

export function getCate(params) {
  return request({
    url: '/product/cat',
    method: 'get'
  })
}

export function postCate(data) {
  return request({
    url: '/product/cat',
    method: 'post',
    data: data
  })
}

export function putCate(id, data) {
  return request({
    url: '/product/cat/' + id,
    method: 'put',
    data: data
  })
}

export function deleteCate(id) {
  return request({
    url: '/product/cat/' + id,
    method: 'delete'
  })
}
