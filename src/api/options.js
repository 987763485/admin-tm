import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/option/info',
    method: 'get'
  })
}

export function postInfo(info) {
  return request({
    url: '/option/info',
    method: 'post',
    data: {
      values: info
    }
  })
}

export function getSeo() {
  return request({
    url: '/option/seo',
    method: 'get'
  })
}

export function postSeo(seo) {
  return request({
    url: '/option/seo',
    method: 'post',
    data: {
      values: seo
    }
  })
}

export function getCDN() {
  return request({
    url: '/option/cdn',
    method: 'get'
  })
}

export function postCDN(cdn) {
  return request({
    url: '/option/cdn',
    method: 'post',
    data: {
      values: cdn
    }
  })
}

export function getPriceRange() {
  return request({
    url: '/option/price',
    method: 'get'
  })
}

export function postPriceRange(price) {
  return request({
    url: '/option/price',
    method: 'post',
    data: {
      values: price
    }
  })
}
