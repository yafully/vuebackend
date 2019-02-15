/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-15 09:05:36
 * mock数据请求,真实环境需要禁用本模块
 */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, Users } from './data/user'//用户数据
let _Users = Users

export default {
	bootstrap () {
		let mock = new MockAdapter(axios)

		// mock success request
	    mock.onGet('/success').reply(200, {
	      msg: 'success'
	    })

	    // mock error request
	    mock.onGet('/error').reply(500, {
	      msg: 'failure'
	    })

	    //Login
	    mock.onPost('/login').reply(config => {
	      let {username, password} = JSON.parse(config.data)
	      return new Promise((resolve, reject) => {
	        let user = null
	        setTimeout(() => {
	          //检测userdata中是否含有post过来的用户信息并返回状态
	          let hasUser = LoginUsers.some(u => {
	            if (u.username === username && u.password === password) {
	              user = JSON.parse(JSON.stringify(u))
	              user.password = undefined
	              return true
	            }
	          })

	          if (hasUser) {
	            resolve([200, { code: 200, msg: '请求成功', user }])
	          } else {
	            resolve([200, { code: 500, msg: '账号或密码错误' }])
	          }
	        }, 1000)
	      })
	    })

	    //用户列表
	    //获取用户列表
	    mock.onGet('/user/list').reply(config => {
	      let {name} = config.params
	      console.log(name)
	      let mockUsers = _Users.filter(user => {
	        if (name && user.name.indexOf(name) == -1) return false
	        return true
	      })
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            users: mockUsers
	          }])
	        }, 1000)
	      })
	    })
	    //获取用户列表（分页）
	    mock.onGet('/user/listpage').reply(config => {
	      let {page, name} = config.params;
	      let mockUsers = _Users.filter(user => {
	        if (name && user.name.indexOf(name) == -1) return false;
	        return true;
	      });
	      let total = mockUsers.length;
	      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            total: total,
	            users: mockUsers
	          }]);
	        }, 1000);
	      })
	    })
	}
}