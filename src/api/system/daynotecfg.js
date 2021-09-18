import request from '@/utils/request'

// 查询工作日志模板列表
export function listDaynotecfg(query) {
  return request({
    url: '/system/daynotecfg/list',
    method: 'get',
    params: query
  })
}

// 查询岗位，填充下拉框
export function getPostInfo() {
  return request({
    url: '/system/daynotecfg/info_post',
    method: 'get',
  })
}

// 查询工作日志模板详细
export function getDaynotecfg(id) {
  return request({
    url: '/system/daynotecfg/' + id,
    method: 'get'
  })
}

// 新增工作日志模板
export function addDaynotecfg(data) {
  return request({
    url: '/system/daynotecfg',
    method: 'post',
    data: data
  })
}

// 修改工作日志模板
export function updateDaynotecfg(data) {
  return request({
    url: '/system/daynotecfg',
    method: 'put',
    data: data
  })
}

// 删除工作日志模板
export function delDaynotecfg(id) {
  return request({
    url: '/system/daynotecfg/' + id,
    method: 'delete'
  })
}

// 导出工作日志模板
export function exportDaynotecfg(query) {
  return request({
    url: '/system/daynotecfg/export',
    method: 'get',
    params: query
  })
}