import request from '@/utils/request'

export function getNav() {
  return request({
    url: '/nav',
    method: 'get'
  })
}

export function postNav(data) {
  return request({
    url: '/nav',
    method: 'post',
    data: data
  })
}

export function putNav(id, data) {
  return request({
    url: '/nav/' + id,
    method: 'put',
    data: data
  })
}

export function deleteNav(id) {
  return request({
    url: '/nav/' + id,
    method: 'delete'
  })
}
