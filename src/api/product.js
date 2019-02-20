import request from '@/utils/request'

export function getAll(page = 1) {
  return request({
    url: '/product/list',
    method: 'get',
    params: {
      page: page
    }
  })
}

export function postProduct(data) {
  return request({
    url: 'product/create',
    method: 'post',
    data: data
  })
}

export function putProduct(id, data) {
  return request({
    url: 'product/dis/' + id,
    method: 'put',
    data: data
  })
}

export function delProduct(id) {
  return request({
    url: 'product/del/' + id,
    method: 'delete'
  })
}
