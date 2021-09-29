import request from '@/utils/request'

// 查询点检记录列表
export function listDianjianlist(query) {
  return request({
    url: '/system/dianjianlist/list',
    method: 'get',
    params: query
  })
}

// 查询点检记录详细
export function getDianjianBiaoZhun(id) {
  return request({
    url: '/system/dianjianlist/getBzInfo/' + id,
    method: 'get'
  })
}

// 查询点检记录详细
export function getDianjianlist(id) {
  return request({
    url: '/system/dianjianlist/' + id,
    method: 'get'
  })
}

// 新增点检记录
export function addDianjianlist(data) {
  return request({
    url: '/system/dianjianlist',
    method: 'post',
    data: data
  })
}

// 修改点检记录
export function updateDianjianlist(data) {
  return request({
    url: '/system/dianjianlist',
    method: 'put',
    data: data
  })
}

// 删除点检记录
export function delDianjianlist(id) {
  return request({
    url: '/system/dianjianlist/' + id,
    method: 'delete'
  })
}

// 导出点检记录
export function exportDianjianlist(query) {
  return request({
    url: '/system/dianjianlist/export',
    method: 'get',
    params: query
  })
}