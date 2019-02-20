import request from '@/utils/request'

export function getArticles(page = 1) {
  return request({
    url: 'article',
    method: 'get',
    params: {
      page: page
    }
  })
}

export function getArticle(id) {
  return request({
    url: 'article/' + id,
    method: 'get'
  })
}

export function postArticle(data) {
  return request({
    url: 'article',
    method: 'post',
    data: data
  })
}

export function putArticle(id, data) {
  return request({
    url: 'article/' + id,
    method: 'put',
    data: data
  })
}

export function deleteArticle(id) {
  return request({
    url: 'article/' + id,
    method: 'delete'
  })
}
