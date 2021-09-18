import request from '@/utils/request'

// 查询员工自主改善列表
export function listZizhugaishan(query) {
  return request({
    url: '/system/zizhugaishan/list',
    method: 'get',
    params: query
  })
}


// 查询自主改善--需要车间审核列表
export function getChjList(query) {
  return request({
    url: '/system/zizhugaishan/getChjList',
    method: 'get',
    params: query
  })
}

// 查询自主改善--需要科室审核列表
export function getKesList(query) {
  return request({
    url: '/system/zizhugaishan/getKesList',
    method: 'get',
    params: query
  })
}

// 查询自主改善--需要精益办审核列表
export function getJybList(query) {
  return request({
    url: '/system/zizhugaishan/getJybList',
    method: 'get',
    params: query
  })
}

// 查询员工自主改善详细
export function getZizhugaishan(id) {
  return request({
    url: '/system/zizhugaishan/' + id,
    method: 'get'
  })
}



// 查询员工修改详细（）
export function getUpdateInfo(id) {
  return request({
    url: '/system/zizhugaishan/getUpdateInfo/' + id,
    method: 'get'
  })
}



// 查询车间审核详细（）
export function getChjInfo(id) {
  return request({
    url: '/system/zizhugaishan/getChjInfo/' + id,
    method: 'get'
  })
}

// 查询科室审核详细（）
export function getKesInfo(id) {
  return request({
    url: '/system/zizhugaishan/getKesInfo/' + id,
    method: 'get'
  })
}



// 查询精益办审核详细（）
export function getJybInfo(id) {
  return request({
    url: '/system/zizhugaishan/getJybInfo/' + id,
    method: 'get'
  })
}


// 车间审核操作
export function chjShh(data) {
  return request({
    url: '/system/zizhugaishan/chjShh',
    method: 'post',
    data: data
  })
}

// 科室审核操作
export function kesShh(data) {
  return request({
    url: '/system/zizhugaishan/kesShh',
    method: 'post',
    data: data
  })
}

// 精益办审核操作
export function jybShh(data) {
  return request({
    url: '/system/zizhugaishan/jybShh',
    method: 'post',
    data: data
  })
}


// 新增员工自主改善
export function addZizhugaishan(data) {
  return request({
    url: '/system/zizhugaishan',
    method: 'post',
    data: data
  })
}

// 修改员工自主改善
export function updateZizhugaishan(data) {
  return request({
    url: '/system/zizhugaishan',
    method: 'put',
    data: data
  })
}

// 删除员工自主改善
export function delZizhugaishan(id) {
  return request({
    url: '/system/zizhugaishan/' + id,
    method: 'delete'
  })
}

// 导出员工自主改善
export function exportZizhugaishan(query) {
  return request({
    url: '/system/zizhugaishan/export',
    method: 'get',
    params: query
  })
}