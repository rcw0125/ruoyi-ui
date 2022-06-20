import request from '@/utils/request'

// 查询能源数据列表
export function listNengyuanday(query) {
  return request({
    url: '/system/nengyuanday/list',
    method: 'get',
    params: query
  })
}

// 查询能源数据详细
export function getNengyuanday(logtime) {
  return request({
    url: '/system/nengyuanday/' + logtime,
    method: 'get'
  })
}

// 新增能源数据
export function addNengyuanday(data) {
  return request({
    url: '/system/nengyuanday',
    method: 'post',
    data: data
  })
}

// 修改能源数据
export function updateNengyuanday(data) {
  return request({
    url: '/system/nengyuanday',
    method: 'put',
    data: data
  })
}

// 删除能源数据
export function delNengyuanday(logtime) {
  return request({
    url: '/system/nengyuanday/' + logtime,
    method: 'delete'
  })
}

// 导出能源数据
export function exportNengyuanday(query) {
  return request({
    url: '/system/nengyuanday/export',
    method: 'get',
    params: query
  })
}