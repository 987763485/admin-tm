import request from '@/utils/request'

export function getPage() {
  return request({
    url: '/page',
    method: 'get'
  })
}

export function postPage(data) {
  return request({
    url: '/page',
    method: 'post',
    data: data
  })
}

export function putPage(id, data) {
  return request({
    url: '/page/' + id,
    method: 'put',
    data: data
  })
}

export function deletePage(id) {
  return request({
    url: '/page/' + id,
    method: 'delete'
  })
}
