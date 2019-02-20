import request from '@/utils/request'

export function getLink() {
  return request({
    url: 'link',
    method: 'get'
  })
}

export function postLink(data) {
  return request({
    url: 'link',
    method: 'post',
    data: data
  })
}

export function putLink(id, data) {
  return request({
    url: 'link/' + id,
    method: 'put',
    data: data
  })
}

export function deleteLink(id) {
  return request({
    url: 'link/' + id,
    method: 'delete'
  })
}
