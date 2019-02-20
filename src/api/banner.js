
import request from '@/utils/request'

export function getBanner() {
  return request({
    url: '/banner',
    mothed: 'get'
  })
}

export function postBanner(banner) {
  return request({
    url: '/banner',
    method: 'post',
    data: banner
  })
}

export function putBanner(id, banner) {
  return request({
    url: '/banner/' + id,
    method: 'put',
    data: banner
  })
}

export function deleteBanner(id) {
  return request({
    url: '/banner/' + id,
    method: 'delete'
  })
}
