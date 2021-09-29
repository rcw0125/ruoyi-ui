import request from '@/utils/request'

// 查询故障报修列表
export function listGuzhang(query) {
  return request({
    url: '/system/guzhang/list',
    method: 'get',
    params: query
  })
}

// 手机扫码点检，根据设备id查询信息
export function getAddInfoByPhone(sid) {
  return request({
    url: '/system/guzhang/getAddInfoByPhone/' + sid,
    method: 'get'
  })
}

// 查询故障报修列表-接收
export function listJsGuzhang(query) {
  return request({
    url: '/system/guzhang/JsList',
    method: 'get',
    params: query
  })
}

// 查询故障报修列表-处理
export function listClGuzhang(query) {
  return request({
    url: '/system/guzhang/ClList',
    method: 'get',
    params: query
  })
}

// 查询故障报修列表-验证
export function listYzGuzhang(query) {
  return request({
    url: '/system/guzhang/YzList',
    method: 'get',
    params: query
  })
}

// 查询故障报修详细
export function getGuzhang(id) {
  return request({
    url: '/system/guzhang/' + id,
    method: 'get'
  })
}

// 新增时获取数据信息
export function getAddInfo() {
  return request({
    url: '/system/guzhang/getAddInfo',
    method: 'get'
  })
}

// 新增故障报修
export function addGuzhang(data) {
  return request({
    url: '/system/guzhang',
    method: 'post',
    data: data
  })
}

// 故障报修-接收
export function acceptGuzhang(data) {
  return request({
    url: '/system/guzhang/accept',
    method: 'post',
    data: data
  })
}

// 故障报修-更正维修车间
export function gzDeptGuzhang(data) {
  return request({
    url: '/system/guzhang/gzDept',
    method: 'post',
    data: data
  })
}

// 故障报修-处理
export function replyGuzhang(data) {
  return request({
    url: '/system/guzhang/reply',
    method: 'post',
    data: data
  })
}

// 故障报修-验证
export function confirmGuzhang(data) {
  return request({
    url: '/system/guzhang/confirm',
    method: 'post',
    data: data
  })
}

// 修改故障报修
export function updateGuzhang(data) {
  return request({
    url: '/system/guzhang',
    method: 'put',
    data: data
  })
}

// 删除故障报修
export function delGuzhang(id) {
  return request({
    url: '/system/guzhang/' + id,
    method: 'delete'
  })
}

// 导出故障报修
export function exportGuzhang(query) {
  return request({
    url: '/system/guzhang/export',
    method: 'get',
    params: query
  })
}