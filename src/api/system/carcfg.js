import request from '@/utils/request'

// 查询用车台账列表
export function listCarcfg(query) {
  return request({
    url: '/system/carcfg/list',
    method: 'get',
    params: query
  })
}

// 查询用车台账详细
export function getCarcfg(id) {
  return request({
    url: '/system/carcfg/' + id,
    method: 'get'
  })
}

// 新增用车台账
export function addCarcfg(data) {
  return request({
    url: '/system/carcfg',
    method: 'post',
    data: data
  })
}

// 修改用车台账
export function updateCarcfg(data) {
  return request({
    url: '/system/carcfg',
    method: 'put',
    data: data
  })
}

// 删除用车台账
export function delCarcfg(id) {
  return request({
    url: '/system/carcfg/' + id,
    method: 'delete'
  })
}

// 导出用车台账
export function exportCarcfg(query) {
  return request({
    url: '/system/carcfg/export',
    method: 'get',
    params: query
  })
}