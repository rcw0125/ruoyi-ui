import request from '@/utils/request'

// 查询设备区域列表
export function listQuyu(query) {
  return request({
    url: '/system/quyu/list',
    method: 'get',
    params: query
  })
}

// 查询设备区域详细
export function getQuyu(id) {
  return request({
    url: '/system/quyu/' + id,
    method: 'get'
  })
}

// 新增设备区域
export function addQuyu(data) {
  return request({
    url: '/system/quyu',
    method: 'post',
    data: data
  })
}

// 修改设备区域
export function updateQuyu(data) {
  return request({
    url: '/system/quyu',
    method: 'put',
    data: data
  })
}

// 删除设备区域
export function delQuyu(id) {
  return request({
    url: '/system/quyu/' + id,
    method: 'delete'
  })
}

// 导出设备区域
export function exportQuyu(query) {
  return request({
    url: '/system/quyu/export',
    method: 'get',
    params: query
  })
}