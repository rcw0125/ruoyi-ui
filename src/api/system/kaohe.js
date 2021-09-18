import request from '@/utils/request'



// 查询相关方用户列表-------相关方考核
export function listWfUser_user(query) {
  return request({
    url: '/system/kaohe/wfList_user',
    method: 'get',
    params: query
  })
}

// 查询炼钢厂用户列表--查询炼钢厂所有用户，用于科室考核
export function listLgUser_user(query) {
  return request({
    url: '/system/kaohe/lgList_user',
    method: 'get',
    params: query
  })
}


// 查询我所在部门用户列表---------车间内部考核
export function listMyUser_user(query) {
  return request({
    url: '/system/kaohe/myList_user',
    method: 'get',
    params: query
  })
}

// 查询部门下拉树结构（相关方）-----相关方考核
export function treeselect_wf_dept() {
  return request({
    // url:'/system/dept/list/exclude/109',
    url: '/system/kaohe/treeSelectWf_dept',
    method: 'get'
  })
}
// 查询部门下拉树结构---查询炼钢厂所有部门，用于科室考核
export function treeselect_lg_dept() {
  return request({
    // url:'/system/dept/list/exclude/109',
    url: '/system/kaohe/treeSelectLg_dept',
    method: 'get'
  })
}


// 获取所有部门，填充下拉菜单数据--查询所有被考核单位
export function getDeptInfo() {
  return request({
    // url:'/system/dept/list/exclude/109',
    url: '/system/kaohe/info_dept',
    method: 'get'
  })
}

// 查询我的可删除考核单列表
export function listMyKaohe(query) {
  return request({
    url: '/system/kaohe/myList',
    method: 'get',
    params: query
  })
}

// 查询考核单列表
export function listKaoheApi(query) {
  return request({
    url: '/system/kaohe/api/KaoHelist',
    method: 'get',
    params: query
  })
}

// 查询考核单详细
export function getKaoheApi(kaoheId) {
  return request({
    url: '/system/kaohe/api/GetInfoById/' + kaoheId,
    method: 'get'
  })
}

// 查询考核单详细
export function getKaohe(kaoheId) {
  return request({
    url: '/system/kaohe/' + kaoheId,
    method: 'get'
  })
}

// 查询考核单列表
export function listKaohe(query) {
  return request({
    url: '/system/kaohe/list',
    method: 'get',
    params: query
  })
}

// 新增考核单
export function addKaohe(data) {
  return request({
    url: '/system/kaohe',
    method: 'post',
    data: data
  })
}

// 修改考核单
export function updateKaohe(data) {
  return request({
    url: '/system/kaohe',
    method: 'put',
    data: data
  })
}

// 删除考核单
export function delKaohe(kaoheId) {
  return request({
    url: '/system/kaohe/' + kaoheId,
    method: 'delete'
  })
}

// 导出考核单
export function exportKaohe(query) {
  return request({
    url: '/system/kaohe/export',
    method: 'get',
    params: query
  })
}