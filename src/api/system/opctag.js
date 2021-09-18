import request from '@/utils/request'

// 查询opctag列表
export function listOpctag(query) {
  return request({
    url: '/system/opctag/list',
    method: 'get',
    params: query
  })
}

// 查询opctag详细
export function getOpctag(id) {
  return request({
    url: '/system/opctag/' + id,
    method: 'get'
  })
}

// 新增opctag
export function addOpctag(data) {
  return request({
    url: '/system/opctag',
    method: 'post',
    data: data
  })
}

// 修改opctag
export function updateOpctag(data) {
  return request({
    url: '/system/opctag',
    method: 'put',
    data: data
  })
}

// 删除opctag
export function delOpctag(id) {
  return request({
    url: '/system/opctag/' + id,
    method: 'delete'
  })
}

// 导出opctag
export function exportOpctag(query) {
  return request({
    url: '/system/opctag/export',
    method: 'get',
    params: query
  })
}