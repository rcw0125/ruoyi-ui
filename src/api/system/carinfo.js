import request from '@/utils/request'

// 查询用车台账列表
export function listCarinfo(query) {
  return request({
    url: '/system/carinfo/list',
    method: 'get',
    params: query
  })
}

// 查询我的用车台账列表
export function listMyCarinfo(query) {
  return request({
    url: '/system/carinfo/myList',
    method: 'get',
    params: query
  })
}

// 查询用车台账详细
export function getCarinfo(id) {
  return request({
    url: '/system/carinfo/' + id,
    method: 'get'
  })
}

// 新增用车台账
export function addCarinfo(data) {
  return request({
    url: '/system/carinfo',
    method: 'post',
    data: data
  })
}

// 修改用车台账
export function updateCarinfo(data) {
  return request({
    url: '/system/carinfo',
    method: 'put',
    data: data
  })
}

// 删除用车台账
export function delCarinfo(id) {
  return request({
    url: '/system/carinfo/' + id,
    method: 'delete'
  })
}

// 导出用车台账
export function exportCarinfo(query) {
  return request({
    url: '/system/carinfo/export',
    method: 'get',
    params: query
  })
}