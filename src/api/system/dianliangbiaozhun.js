import request from '@/utils/request'

// 查询电量标准列表
export function listDianliangbiaozhun(query) {
  return request({
    url: '/system/dianliangbiaozhun/list',
    method: 'get',
    params: query
  })
}

// 查询电量标准详细
export function getDianliangbiaozhun(id) {
  return request({
    url: '/system/dianliangbiaozhun/' + id,
    method: 'get'
  })
}

// 新增电量标准
export function addDianliangbiaozhun(data) {
  return request({
    url: '/system/dianliangbiaozhun',
    method: 'post',
    data: data
  })
}

// 修改电量标准
export function updateDianliangbiaozhun(data) {
  return request({
    url: '/system/dianliangbiaozhun',
    method: 'put',
    data: data
  })
}

// 删除电量标准
export function delDianliangbiaozhun(id) {
  return request({
    url: '/system/dianliangbiaozhun/' + id,
    method: 'delete'
  })
}

// 导出电量标准
export function exportDianliangbiaozhun(query) {
  return request({
    url: '/system/dianliangbiaozhun/export',
    method: 'get',
    params: query
  })
}