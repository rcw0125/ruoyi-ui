import request from '@/utils/request'

// 查询月点检统计列表
export function listDianjiantongji(query) {
  return request({
    url: '/system/dianjiantongji/list',
    method: 'get',
    params: query
  })
}

// 查询月点检统计详细
export function getDianjiantongji(id) {
  return request({
    url: '/system/dianjiantongji/' + id,
    method: 'get'
  })
}

// 新增月点检统计
export function addDianjiantongji(data) {
  return request({
    url: '/system/dianjiantongji',
    method: 'post',
    data: data
  })
}

// 修改月点检统计
export function updateDianjiantongji(data) {
  return request({
    url: '/system/dianjiantongji',
    method: 'put',
    data: data
  })
}

// 删除月点检统计
export function delDianjiantongji(id) {
  return request({
    url: '/system/dianjiantongji/' + id,
    method: 'delete'
  })
}

// 导出月点检统计
export function exportDianjiantongji(query) {
  return request({
    url: '/system/dianjiantongji/export',
    method: 'get',
    params: query
  })
}