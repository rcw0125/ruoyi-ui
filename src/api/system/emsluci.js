import request from '@/utils/request'

// 查询能源介质最新炉号列表
export function listEmsluci(query) {
  return request({
    url: '/system/emsluci/list',
    method: 'get',
    params: query
  })
}

// 查询能源介质最新炉号详细
export function getEmsluci(id) {
  return request({
    url: '/system/emsluci/' + id,
    method: 'get'
  })
}

// 新增能源介质最新炉号
export function addEmsluci(data) {
  return request({
    url: '/system/emsluci',
    method: 'post',
    data: data
  })
}

// 修改能源介质最新炉号
export function updateEmsluci(data) {
  return request({
    url: '/system/emsluci',
    method: 'put',
    data: data
  })
}

// 删除能源介质最新炉号
export function delEmsluci(id) {
  return request({
    url: '/system/emsluci/' + id,
    method: 'delete'
  })
}

// 导出能源介质最新炉号
export function exportEmsluci(query) {
  return request({
    url: '/system/emsluci/export',
    method: 'get',
    params: query
  })
}