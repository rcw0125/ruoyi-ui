import request from '@/utils/request'

// 查询点检标准列表
export function listEquipbiaozhun(query) {
  return request({
    url: '/system/equipbiaozhun/list',
    method: 'get',
    params: query
  })
}

// 查询我的车间、班组的点检标准列表
export function listMyEquipbiaozhun(query) {
  return request({
    url: '/system/equipbiaozhun/myList',
    method: 'get',
    params: query
  })
}

// 查询点检标准详细
export function getEquipbiaozhun(id) {
  return request({
    url: '/system/equipbiaozhun/' + id,
    method: 'get'
  })
}

// 新增点检标准
export function addEquipbiaozhun(data) {
  return request({
    url: '/system/equipbiaozhun',
    method: 'post',
    data: data
  })
}

// 修改点检标准
export function updateEquipbiaozhun(data) {
  return request({
    url: '/system/equipbiaozhun',
    method: 'put',
    data: data
  })
}

// 删除点检标准
export function delEquipbiaozhun(id) {
  return request({
    url: '/system/equipbiaozhun/' + id,
    method: 'delete'
  })
}

// 导出点检标准
export function exportEquipbiaozhun(query) {
  return request({
    url: '/system/equipbiaozhun/export',
    method: 'get',
    params: query
  })
}