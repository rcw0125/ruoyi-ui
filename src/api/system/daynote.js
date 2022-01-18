import request from '@/utils/request'

// 查询工作日志列表
export function listDaynote(query) {
  return request({
    url: '/system/daynote/list',
    method: 'get',
    params: query
  })
}

// 根据部门查询所属岗位列表
export function getPostInfo(query) {
  return request({
    url: '/system/daynotecfg/getPostInfo?dept='+query,
    method: 'get',
  })
}

// 查询工作日志配置模板
export function getCfg() {
  return request({
    url: '/system/daynote/getCfg',
    method: 'get'
  })
}


// 查询工作日志配置模板
export function getLastCfg() {
  return request({
    url: '/system/daynote/getLastCfg',
    method: 'get'
  })
}

// 查询自己可修改的工作日志
export function samePostList() {
  return request({
    url: '/system/daynote/samePostList',
    method: 'get'
  })
}

// 锁定工作日志详细，已交班状态
export function lockDaynote(id) {
  return request({
    url: '/system/daynote/lockNote/' + id,
    method: 'get'
  })
}


// 查询工作日志详细
export function getDaynote(id) {
  return request({
    url: '/system/daynote/' + id,
    method: 'get'
  })
}

// 新增工作日志
export function addDaynote(data) {
  return request({
    url: '/system/daynote',
    method: 'post',
    data: data
  })
}

// 修改工作日志
export function updateDaynote(data) {
  return request({
    url: '/system/daynote',
    method: 'put',
    data: data
  })
}

// 删除工作日志
export function delDaynote(id) {
  return request({
    url: '/system/daynote/' + id,
    method: 'delete'
  })
}

// 导出工作日志
export function exportDaynote(query) {
  return request({
    url: '/system/daynote/export',
    method: 'get',
    params: query
  })
}