import request from '@/utils/request'

// 查询标准化检查列表
export function listBzhjc(query) {
  return request({
    url: '/system/bzhjc/list',
    method: 'get',
    params: query
  })
}

export function listBzhjcApi(query) {
  return request({
    url: '/system/bzhjc/api/BzhList',
    method: 'get',
    params: query
  })
}

// 查询标准化检查详细
export function getBzhjcApi(id) {
  return request({
    url: '/system/bzhjc/api/GetInfoById/' + id,
    method: 'get'
  })
}

// 查询标准化检查列表---整改回复
export function listReplyBzhjc(query) {
  return request({
    url: '/system/bzhjc/getReplyList',
    method: 'get',
    params: query
  })
}

// 查询标准化检查列表---验证
export function listConfirmBzhjc(query) {
  return request({
    url: '/system/bzhjc/getConfirmList',
    method: 'get',
    params: query
  })
}


// 查询标准化检查详细
export function getBzhjc(id) {
  return request({
    url: '/system/bzhjc/' + id,
    method: 'get'
  })
}

// 查询标准化检查详细（）
export function replyBzhjc(id) {
  return request({
    url: '/system/bzhjc/getReplyInfo/' + id,
    method: 'get'
  })
}

// 查询标准化检查详细（）
export function confirmBzhjc(id) {
  return request({
    url: '/system/bzhjc/getConfirmInfo/' + id,
    method: 'get'
  })
}

// 新增标准化检查
export function addBzhjc(data) {
  return request({
    url: '/system/bzhjc',
    method: 'post',
    data: data
  })
}

// 整改回复标准化检查
export function replyBzhjcForm(data) {
  return request({
    url: '/system/bzhjc/reply',
    method: 'post',
    data: data
  })
}

// 检查人验证标准化检查
export function confirmBzhjcForm(data) {
  return request({
    url: '/system/bzhjc/confirm',
    method: 'post',
    data: data
  })
}


// 修改标准化检查
export function updateBzhjc(data) {
  return request({
    url: '/system/bzhjc',
    method: 'put',
    data: data
  })
}

// 删除标准化检查
export function delBzhjc(id) {
  return request({
    url: '/system/bzhjc/' + id,
    method: 'delete'
  })
}

// 导出标准化检查
export function exportBzhjc(query) {
  return request({
    url: '/system/bzhjc/export',
    method: 'get',
    params: query
  })
}