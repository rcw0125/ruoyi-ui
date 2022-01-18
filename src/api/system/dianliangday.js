import request from '@/utils/request'

// 查询每日电量列表
export function listDianliangday(query) {
  return request({
    url: '/system/dianliangday/list',
    method: 'get',
    params: query
  })
}

// 查询每日电量详细
export function getDianliangday(id) {
  return request({
    url: '/system/dianliangday/' + id,
    method: 'get'
  })
}

// 新增每日电量
export function addDianliangday(data) {
  return request({
    url: '/system/dianliangday',
    method: 'post',
    data: data
  })
}

// 修改每日电量
export function updateDianliangday(data) {
  return request({
    url: '/system/dianliangday',
    method: 'put',
    data: data
  })
}

// 删除每日电量
export function delDianliangday(id) {
  return request({
    url: '/system/dianliangday/' + id,
    method: 'delete'
  })
}

// 导出每日电量
export function exportDianliangday(query) {
  return request({
    url: '/system/dianliangday/export',
    method: 'get',
    params: query
  })
}