import request from '@/utils/request'

// 查询点检分类统计列表
export function listDianjianfenlei(query) {
  return request({
    url: '/system/dianjianfenlei/list',
    method: 'get',
    params: query
  })
}

// 查询点检分类统计详细
export function getDianjianfenlei(id) {
  return request({
    url: '/system/dianjianfenlei/' + id,
    method: 'get'
  })
}

// 新增点检分类统计
export function addDianjianfenlei(data) {
  return request({
    url: '/system/dianjianfenlei',
    method: 'post',
    data: data
  })
}

// 修改点检分类统计
export function updateDianjianfenlei(data) {
  return request({
    url: '/system/dianjianfenlei',
    method: 'put',
    data: data
  })
}

// 删除点检分类统计
export function delDianjianfenlei(id) {
  return request({
    url: '/system/dianjianfenlei/' + id,
    method: 'delete'
  })
}

// 导出点检分类统计
export function exportDianjianfenlei(query) {
  return request({
    url: '/system/dianjianfenlei/export',
    method: 'get',
    params: query
  })
}