/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-14 10:45:36
 */
import axios from 'axios';
let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
