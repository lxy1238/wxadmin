import request from '@/utils/request'

export function login(name, password) {
  return request({
    url: 'http://api.7weixin.top/login',
    method: 'post',
    data: {
      name,
      password
    }
  })
}

export function getInfo(id) {
  return request({
    url: 'http://api.7weixin.top/user/info',
    method: 'post',
    data: {
      id: id
    }
  })
}

/**
 * 新增用户
 * @param email 邮箱
 * @param name 名称
 * @param nickname 真实姓名
 * @param password 密码
 */
export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data: data
  })
}

/**
 * 编辑用户
 * @param id 用户id
 * @param email 邮箱
 * @param name 名称
 * @param nickname 真实姓名
 * @param password 密码
 */
export function editUser(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data: data
  })
}
/**
 * 新增用户
 * @param page 第几页
 * @param pagesize 每页限制数量
 * @param name  名字搜索
 */

export function userList(data) {
  return request({
    url: '/user/show',
    method: 'post',
    data: data
  })
}

/**
 * 新增用户
 * @param id 第几页
 * @param status 每页限制数量 normal disable
 */

export function changeUserStatus(data) {
  return request({
    url: '/user/status',
    method: 'post',
    data: data
  })
}
