import request from '@/utils/request'

// 查询介质停送记录列表
export function listJizhi(query) {
  return request({
    url: '/system/jiezhi/list',
    method: 'get',
    params: query
  })
}

// 根据工序查询炉次信息
export function getHeatIdInfo(query) {
  return request({
    url: '/system/jiezhi/getHeatIdInfo?gongxu='+query,
    method: 'get',
  })
}

// 查询能源介质设备
export function getEmsequipcfg(query) {
  return request({
    url: '/system/emsequipcfg/info?type='+query,
    method: 'get',
  })
}

// 查询介质停送记录详细
export function getJizhi(id) {
  return request({
    url: '/system/jiezhi/' + id,
    method: 'get'
  })
}

// 新增介质停送记录
export function addJizhi(data) {
  return request({
    url: '/system/jiezhi',
    method: 'post',
    data: data
  })
}

// 回复介质停送记录
export function reply(data) {
  return request({
    url: '/system/jiezhi/reply',
    method: 'post',
    data: data
  })
}

// 修改介质停送记录
export function updateJizhi(data) {
  return request({
    url: '/system/jiezhi',
    method: 'put',
    data: data
  })
}

// 删除介质停送记录
export function delJizhi(id) {
  return request({
    url: '/system/jiezhi/' + id,
    method: 'delete'
  })
}

// 导出介质停送记录
export function exportJizhi(query) {
  return request({
    url: '/system/jiezhi/export',
    method: 'get',
    params: query
  })
}