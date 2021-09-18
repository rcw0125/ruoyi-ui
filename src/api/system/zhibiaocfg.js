import request from '@/utils/request'

// 查询指标配置列表
export function listZhibiaocfg(query) {
  return request({
    url: '/system/zhibiaocfg/list',
    method: 'get',
    params: query
  })
}

// 查询指标配置详细
export function getZhibiaocfg(id) {
  return request({
    url: '/system/zhibiaocfg/' + id,
    method: 'get'
  })
}

// 新增指标配置
export function addZhibiaocfg(data) {
  return request({
    url: '/system/zhibiaocfg',
    method: 'post',
    data: data
  })
}

// 修改指标配置
export function updateZhibiaocfg(data) {
  return request({
    url: '/system/zhibiaocfg',
    method: 'put',
    data: data
  })
}

// 删除指标配置
export function delZhibiaocfg(id) {
  return request({
    url: '/system/zhibiaocfg/' + id,
    method: 'delete'
  })
}

// 导出指标配置
export function exportZhibiaocfg(query) {
  return request({
    url: '/system/zhibiaocfg/export',
    method: 'get',
    params: query
  })
}