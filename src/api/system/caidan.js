import request from '@/utils/request'

// 查询新闻菜单列表
export function listCaidan(query) {
  return request({
    url: '/system/caidan/list',
    method: 'get',
    params: query
  })
}

// 查询新闻菜单详细
export function getCaidan(id) {
  return request({
    url: '/system/caidan/' + id,
    method: 'get'
  })
}

// 新增新闻菜单
export function addCaidan(data) {
  return request({
    url: '/system/caidan',
    method: 'post',
    data: data
  })
}

// 修改新闻菜单
export function updateCaidan(data) {
  return request({
    url: '/system/caidan',
    method: 'put',
    data: data
  })
}

// 删除新闻菜单
export function delCaidan(id) {
  return request({
    url: '/system/caidan/' + id,
    method: 'delete'
  })
}

// 导出新闻菜单
export function exportCaidan(query) {
  return request({
    url: '/system/caidan/export',
    method: 'get',
    params: query
  })
}