import request from '@/utils/request'

export function getProperty() {
  return request({
    url: 'product/property',
    method: 'get'
  })
}

export function postProperty(data) {
  return request({
    url: 'product/property',
    method: 'post',
    data: data
  })
}

export function putProperty(id, data) {
  return request({
    url: 'product/property/' + id,
    method: 'put',
    data: data
  })
}

export function deleteProperty(id) {
  return request({
    url: 'product/property/' + id,
    method: 'delete'
  })
}
