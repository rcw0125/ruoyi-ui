import request from '@/utils/request'

// 查询设备检修统计列表
export function listJianxiutongji(query) {
  return request({
    url: '/system/jianxiutongji/list',
    method: 'get',
    params: query
  })
}

// 查询设备检修统计详细
export function getJianxiutongji(id) {
  return request({
    url: '/system/jianxiutongji/' + id,
    method: 'get'
  })
}

// 新增设备检修统计
export function addJianxiutongji(data) {
  return request({
    url: '/system/jianxiutongji',
    method: 'post',
    data: data
  })
}

// 修改设备检修统计
export function updateJianxiutongji(data) {
  return request({
    url: '/system/jianxiutongji',
    method: 'put',
    data: data
  })
}

// 删除设备检修统计
export function delJianxiutongji(id) {
  return request({
    url: '/system/jianxiutongji/' + id,
    method: 'delete'
  })
}

// 导出设备检修统计
export function exportJianxiutongji(query) {
  return request({
    url: '/system/jianxiutongji/export',
    method: 'get',
    params: query
  })
}