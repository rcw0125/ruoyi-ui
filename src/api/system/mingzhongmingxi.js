import request from '@/utils/request'

// 查询成分命中明细列表
export function listMingzhongmingxi(query) {
  return request({
    url: '/system/mingzhongmingxi/list',
    method: 'get',
    params: query
  })
}

// 查询成分命中明细详细
export function getMingzhongmingxi(id) {
  return request({
    url: '/system/mingzhongmingxi/' + id,
    method: 'get'
  })
}

// 新增成分命中明细
export function addMingzhongmingxi(data) {
  return request({
    url: '/system/mingzhongmingxi',
    method: 'post',
    data: data
  })
}

// 修改成分命中明细
export function updateMingzhongmingxi(data) {
  return request({
    url: '/system/mingzhongmingxi',
    method: 'put',
    data: data
  })
}

// 删除成分命中明细
export function delMingzhongmingxi(id) {
  return request({
    url: '/system/mingzhongmingxi/' + id,
    method: 'delete'
  })
}

// 导出成分命中明细
export function exportMingzhongmingxi(query) {
  return request({
    url: '/system/mingzhongmingxi/export',
    method: 'get',
    params: query
  })
}