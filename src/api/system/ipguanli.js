import request from '@/utils/request'

// 查询IP管理列表
export function listIpguanli(query) {
  return request({
    url: '/system/ipguanli/list',
    method: 'get',
    params: query
  })
}

// 查询IP管理详细
export function getIpguanli(id) {
  return request({
    url: '/system/ipguanli/' + id,
    method: 'get'
  })
}

// 新增IP管理
export function addIpguanli(data) {
  return request({
    url: '/system/ipguanli',
    method: 'post',
    data: data
  })
}

// 修改IP管理
export function updateIpguanli(data) {
  return request({
    url: '/system/ipguanli',
    method: 'put',
    data: data
  })
}

// 删除IP管理
export function delIpguanli(id) {
  return request({
    url: '/system/ipguanli/' + id,
    method: 'delete'
  })
}

// 导出IP管理
export function exportIpguanli(query) {
  return request({
    url: '/system/ipguanli/export',
    method: 'get',
    params: query
  })
}