import request from '@/utils/request'

// 查询设备故障统计列表
export function listGuzhangtongji(query) {
  return request({
    url: '/system/guzhangtongji/list',
    method: 'get',
    params: query
  })
}

// 查询设备故障统计详细
export function getGuzhangtongji(id) {
  return request({
    url: '/system/guzhangtongji/' + id,
    method: 'get'
  })
}

// 新增设备故障统计
export function addGuzhangtongji(data) {
  return request({
    url: '/system/guzhangtongji',
    method: 'post',
    data: data
  })
}

// 修改设备故障统计
export function updateGuzhangtongji(data) {
  return request({
    url: '/system/guzhangtongji',
    method: 'put',
    data: data
  })
}

// 删除设备故障统计
export function delGuzhangtongji(id) {
  return request({
    url: '/system/guzhangtongji/' + id,
    method: 'delete'
  })
}

// 导出设备故障统计
export function exportGuzhangtongji(query) {
  return request({
    url: '/system/guzhangtongji/export',
    method: 'get',
    params: query
  })
}