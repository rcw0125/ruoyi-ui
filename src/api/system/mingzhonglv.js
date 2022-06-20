import request from '@/utils/request'

// 查询成分命中率列表
export function listMingzhonglv(query) {
  return request({
    url: '/system/mingzhonglv/list',
    method: 'get',
    params: query
  })
}

// 查询成分命中率详细
export function getMingzhonglv(id) {
  return request({
    url: '/system/mingzhonglv/' + id,
    method: 'get'
  })
}

// 新增成分命中率
export function addMingzhonglv(data) {
  return request({
    url: '/system/mingzhonglv',
    method: 'post',
    data: data
  })
}

// 修改成分命中率
export function updateMingzhonglv(data) {
  return request({
    url: '/system/mingzhonglv',
    method: 'put',
    data: data
  })
}

// 删除成分命中率
export function delMingzhonglv(id) {
  return request({
    url: '/system/mingzhonglv/' + id,
    method: 'delete'
  })
}

// 导出成分命中率
export function exportMingzhonglv(query) {
  return request({
    url: '/system/mingzhonglv/export',
    method: 'get',
    params: query
  })
}