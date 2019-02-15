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