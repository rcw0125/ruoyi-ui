import request from '@/utils/request'

// 查询精炼喂线数据列表
export function listWire(query) {
  return request({
    url: '/system/wire/list',
    method: 'get',
    params: query
  })
}

// 查询精炼喂线数据列表
export function listSumWire(query) {
  return request({
    url: '/system/wire/SumList',
    method: 'get',
    params: query
  })
}

// 查询精炼喂线数据详细
export function getWire(id) {
  return request({
    url: '/system/wire/' + id,
    method: 'get'
  })
}

// 新增精炼喂线数据
export function addWire(data) {
  return request({
    url: '/system/wire',
    method: 'post',
    data: data
  })
}

// 修改精炼喂线数据
export function updateWire(data) {
  return request({
    url: '/system/wire',
    method: 'put',
    data: data
  })
}

// 删除精炼喂线数据
export function delWire(id) {
  return request({
    url: '/system/wire/' + id,
    method: 'delete'
  })
}

// 导出精炼喂线数据
export function exportWire(query) {
  return request({
    url: '/system/wire/export',
    method: 'get',
    params: query
  })
}

// 导出精炼喂线数据
export function exportSumWire(query) {
  return request({
    url: '/system/wire/SumExport',
    method: 'get',
    params: query
  })
}