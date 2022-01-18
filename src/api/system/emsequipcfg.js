import request from '@/utils/request'

// 查询能源介质配置列表
export function listEmsequipcfg(query) {
  return request({
    url: '/system/emsequipcfg/list',
    method: 'get',
    params: query
  })
}

// 查询能源介质配置详细
export function getEmsequipcfg(id) {
  return request({
    url: '/system/emsequipcfg/' + id,
    method: 'get'
  })
}

// 新增能源介质配置
export function addEmsequipcfg(data) {
  return request({
    url: '/system/emsequipcfg',
    method: 'post',
    data: data
  })
}

// 修改能源介质配置
export function updateEmsequipcfg(data) {
  return request({
    url: '/system/emsequipcfg',
    method: 'put',
    data: data
  })
}

// 删除能源介质配置
export function delEmsequipcfg(id) {
  return request({
    url: '/system/emsequipcfg/' + id,
    method: 'delete'
  })
}

// 导出能源介质配置
export function exportEmsequipcfg(query) {
  return request({
    url: '/system/emsequipcfg/export',
    method: 'get',
    params: query
  })
}