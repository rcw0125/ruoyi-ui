import request from '@/utils/request'

// 查询电量配置列表
export function listDianliangcfg(query) {
  return request({
    url: '/system/dianliangcfg/list',
    method: 'get',
    params: query
  })
}

// 查询电量配置详细
export function getDianliangcfg(id) {
  return request({
    url: '/system/dianliangcfg/' + id,
    method: 'get'
  })
}

// 新增电量配置
export function addDianliangcfg(data) {
  return request({
    url: '/system/dianliangcfg',
    method: 'post',
    data: data
  })
}

// 修改电量配置
export function updateDianliangcfg(data) {
  return request({
    url: '/system/dianliangcfg',
    method: 'put',
    data: data
  })
}

// 删除电量配置
export function delDianliangcfg(id) {
  return request({
    url: '/system/dianliangcfg/' + id,
    method: 'delete'
  })
}

// 导出电量配置
export function exportDianliangcfg(query) {
  return request({
    url: '/system/dianliangcfg/export',
    method: 'get',
    params: query
  })
}