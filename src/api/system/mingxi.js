import request from '@/utils/request'

// 查询电量明细列表
export function listMingxi(query) {
  return request({
    url: '/system/mingxi/list',
    method: 'get',
    params: query
  })
}

// 计算每日电量
export function CalDianLiangDaylist(query) {
  return request({
    url: '/system/dianliangday/CalDianLiangDaylist',
    method: 'get',
    params: query
  })
}

// 查询电量明细详细
export function getMingxi(id) {
  return request({
    url: '/system/mingxi/' + id,
    method: 'get'
  })
}

// 新增电量明细
export function addMingxi(data) {
  return request({
    url: '/system/mingxi',
    method: 'post',
    data: data
  })
}

// 修改电量明细
export function updateMingxi(data) {
  return request({
    url: '/system/mingxi',
    method: 'put',
    data: data
  })
}

// 删除电量明细
export function delMingxi(id) {
  return request({
    url: '/system/mingxi/' + id,
    method: 'delete'
  })
}

// 导出电量明细
export function exportMingxi(query) {
  return request({
    url: '/system/mingxi/export',
    method: 'get',
    params: query
  })
}