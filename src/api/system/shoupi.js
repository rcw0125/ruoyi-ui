import request from '@/utils/request'

// 查询收坯统计列表
export function listShoupi(query) {
  return request({
    url: '/system/shoupi/list',
    method: 'get',
    params: query
  })
}

// 查询收坯统计详细
export function getShoupi(ccmid) {
  return request({
    url: '/system/shoupi/' + ccmid,
    method: 'get'
  })
}

// 新增收坯统计
export function addShoupi(data) {
  return request({
    url: '/system/shoupi',
    method: 'post',
    data: data
  })
}

// 修改收坯统计
export function updateShoupi(data) {
  return request({
    url: '/system/shoupi',
    method: 'put',
    data: data
  })
}

// 删除收坯统计
export function delShoupi(ccmid) {
  return request({
    url: '/system/shoupi/' + ccmid,
    method: 'delete'
  })
}

// 导出收坯统计
export function exportShoupi(query) {
  return request({
    url: '/system/shoupi/export',
    method: 'get',
    params: query
  })
}