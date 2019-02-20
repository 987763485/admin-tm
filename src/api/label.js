import request from '@/utils/request'

export function getLabel() {
  return request({
    url: 'product/label',
    method: 'get'
  })
}

export function postLabel(data) {
  return request({
    url: 'product/label',
    method: 'post',
    data: data
  })
}

export function putLabel(id, data) {
  return request({
    url: 'product/label/' + id,
    method: 'put',
    data: data
  })
}

export function deleteLabel(id) {
  return request({
    url: 'product/label/' + id,
    method: 'delete'
  })
}
