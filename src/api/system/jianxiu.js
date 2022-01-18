import request from '@/utils/request'

// 查询计划检修列表
export function listJianxiu(query) {
  return request({
    url: '/system/jianxiu/list',
    method: 'get',
    params: query
  })
}

// 查询计划检修详细
export function getJianxiu(id) {
  return request({
    url: '/system/jianxiu/' + id,
    method: 'get'
  })
}

// 新增计划检修
export function addJianxiu(data) {
  return request({
    url: '/system/jianxiu',
    method: 'post',
    data: data
  })
}

// 修改计划检修
export function updateJianxiu(data) {
  return request({
    url: '/system/jianxiu',
    method: 'put',
    data: data
  })
}

// 删除计划检修
export function delJianxiu(id) {
  return request({
    url: '/system/jianxiu/' + id,
    method: 'delete'
  })
}

// 导出计划检修
export function exportJianxiu(query) {
  return request({
    url: '/system/jianxiu/export',
    method: 'get',
    params: query
  })
}