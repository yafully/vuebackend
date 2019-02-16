/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-14 10:45:36
 */
import axios from 'axios'
let base = ''
//用户登录
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data)}
//用户列表
export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params })}
//用户编辑
export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params })}
//用户删除
export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params })}
//用户新增
export const addUser = params => { return axios.get(`${base}/user/add`, { params: params })}
//用户批量删除
export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params })}