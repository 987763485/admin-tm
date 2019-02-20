import request from '@/utils/request'

export function getImgList() {
  return request({
    url: 'img',
    method: 'get'
  })
}
