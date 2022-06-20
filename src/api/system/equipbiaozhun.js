import request from '@/utils/request'

// 查询点检标准列表
export function listEquipbiaozhun(query) {
  return request({
    url: '/system/equipbiaozhun/list',
    method: 'get',
    params: query
  })
}


// 查询点检标准列表--月明细
export function listYueMingXi(query) {
  return request({
    url: '/system/equipbiaozhun/YueMingXiList',
    method: 'get',
    params: query
  })
}

// 查询点检标准列表--月班组点检率
export function listTeamRate(query) {
  return request({
    url: '/system/equipbiaozhun/YueTeamList',
    method: 'get',
    params: query
  })
}

// 查询点检标准列表--月车间点检率
export function listDeptRate(query) {
  return request({
    url: '/system/equipbiaozhun/YueDeptList',
    method: 'get',
    params: query
  })
}



// 查询点检标准列表--月明细
export function listZhouMingXi(query) {
  return request({
    url: '/system/equipbiaozhun/ZhouMingXiList',
    method: 'get',
    params: query
  })
}

// 查询点检标准列表--月班组点检率
export function listZhouTeamRate(query) {
  return request({
    url: '/system/equipbiaozhun/ZhouTeamList',
    method: 'get',
    params: query
  })
}

// 查询点检标准列表--月车间点检率
export function listZhouDeptRate(query) {
  return request({
    url: '/system/equipbiaozhun/ZhouDeptList',
    method: 'get',
    params: query
  })
}


// 将设备从我的设备移除
export function delMyDianJian(query) {
  return request({
    url: '/system/mydianjian/delMyDianJian?bzid='+query,
    method: 'get',
  })
}

// 添加设备到我的设备
export function addMyDianJian(query) {
  return request({
    url: '/system/mydianjian/addMyDianJian?ids='+query,
    method: 'get',
  })
}

// 根据部门查询岗位列表
export function getPostinfo(query) {
  return request({
    url: '/system/equipbiaozhun/getPostInfo?dept='+query,
    method: 'get',
  })
}

// 查询我的车间、班组的点检标准列表
export function listMyEquipbiaozhun(query) {
  return request({
    url: '/system/equipbiaozhun/myList',
    method: 'get',
    params: query
  })
}

// 查询我的车间、班组的点检标准列表，判断是否可以点检
export function listMydianjian(query) {
  return request({
    url: '/system/equipbiaozhun/myDianJianList',
    method: 'get',
    params: query
  })
}

// 配置我的设备列表，查询属于我的班组，但不属于我的设备
export function notMyDianJianList(query) {
  return request({
    url: '/system/equipbiaozhun/notMyDianJianList',
    method: 'get',
    params: query
  })
}

// 查询点检标准详细
export function getEquipbiaozhun(id) {
  return request({
    url: '/system/equipbiaozhun/' + id,
    method: 'get'
  })
}

// 新增点检标准
export function addEquipbiaozhun(data) {
  return request({
    url: '/system/equipbiaozhun',
    method: 'post',
    data: data
  })
}

// 修改点检标准
export function updateEquipbiaozhun(data) {
  return request({
    url: '/system/equipbiaozhun',
    method: 'put',
    data: data
  })
}

// 删除点检标准
export function delEquipbiaozhun(id) {
  return request({
    url: '/system/equipbiaozhun/' + id,
    method: 'delete'
  })
}

// 导出点检标准
export function exportEquipbiaozhun(query) {
  return request({
    url: '/system/equipbiaozhun/export',
    method: 'get',
    params: query
  })
}