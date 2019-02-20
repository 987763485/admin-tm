import request from '@/utils/request'

export function getToken() {
  return request({
    url: 'upload/qiniu',
    method: 'get'
  })
}

export function upload(url, data) {
  return request({
    url: url,
    method: 'get',
    data: data
  })
}
