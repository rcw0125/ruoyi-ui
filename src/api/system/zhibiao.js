import request from '@/utils/request'

// 查询指标记录列表
export function listZhibiao(query) {
  return request({
    url: '/system/zhibiao/list',
    method: 'get',
    params: query
  })
}

// 查询指标记录列表
export function listZhibiaoApi(query) {
  return request({
    url: '/system/zhibiao/api/ZhiBiaoList',
    method: 'get',
    params: query
  })
}

// 根据部门查询所属指标列表
export function getinfo(query) {
  return request({
    url: '/system/zhibiaocfg/info?dept='+query,
    method: 'get',
  })
}

// 根据部门查询所属指标列表
export function getinfoApi(query) {
  return request({
    url: '/system/zhibiaocfg/api/GetInfo?dept='+query,
    method: 'get',
  })
}

// 查询指标记录详细
export function getZhibiao(id) {
  return request({
    url: '/system/zhibiao/' + id,
    method: 'get'
  })
}

// 查询指标记录详细
export function getZhibiaoApi(id) {
  return request({
    url: '/system/zhibiao/api/GetInfoById/' + id,
    method: 'get'
  })
}

// 新增指标记录
export function addZhibiao(data) {
  return request({
    url: '/system/zhibiao',
    method: 'post',
    data: data
  })
}

// 修改指标记录
export function updateZhibiao(data) {
  return request({
    url: '/system/zhibiao',
    method: 'put',
    data: data
  })
}

// 删除指标记录
export function delZhibiao(id) {
  return request({
    url: '/system/zhibiao/' + id,
    method: 'delete'
  })
}

// 导出指标记录
export function exportZhibiao(query) {
  return request({
    url: '/system/zhibiao/export',
    method: 'get',
    params: query
  })
}
// 下载用户导入模板
export function importTemplate() {
  return request({
    url: '/system/zhibiao/importTemplate',
    method: 'get'
  })
}