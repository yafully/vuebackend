/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-14 10:45:36
 */
import axios from 'axios'
let base = ''
//用户登录
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data)}
//鉴权
export const getRole = params => { return axios.get(`${base}/role`, { params: params })}
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
//联系我们
export const getTelephone = params=>{return axios.get(`${base}/telephone/list`, {params:params})}
//联系我们删除
export const removeTelephone = params => { return axios.get(`${base}/telephone/remove`, { params: params })}

//角色列表
export const getRoleList= params => { return axios.get(`${base}/role/listpage`, { params: params })}
//角色编辑
export const editRole = params => { return axios.get(`${base}/role/edit`, { params: params })}
//角色新增
export const addRole = params => { return axios.get(`${base}/role/add`, { params: params })}
//角色删除
export const removeRole = params => { return axios.get(`${base}/role/remove`, { params: params })}
//管理员列表
export const getAdminList = params => { return axios.get(`${base}/role/adminlist`, { params: params })}
//管理员新增
export const addAdmin = params => { return axios.get(`${base}/role/addadmin`, { params: params })}
//管理员编辑
export const editAdmin = params => { return axios.get(`${base}/role/editadmin`, { params: params })}
//管理员删除
export const removeAdmin = params => { return axios.get(`${base}/role/removeadmin`, { params: params })}