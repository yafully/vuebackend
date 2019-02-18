/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-15 09:05:36
 * mock数据请求,真实环境需要禁用本模块
 */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, Users } from './data/user'//用户数据

//const Telephone = () => import('./data/telephone')
import { Telephone } from './data/telephone';
let _Users = Users
let _Telephone = Telephone
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

	    //菜单鉴权
	    mock.onGet('/role').reply(config => {
	      let {name} = config.params
	      let roleUsers = LoginUsers.filter(user => {
	        return user.username === name
	      })
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            role: roleUsers[0].role,
	            permissions: roleUsers[0].permissions
	          }])
	        }, 1000)
	      })
	    })

	    //用户列表
	    //获取用户列表
	    mock.onGet('/user/list').reply(config => {
	      let {name} = config.params
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
	      let {page, name} = config.params
	      let mockUsers = _Users.filter(user => {
	        if (name && user.name.indexOf(name) == -1) return false
	        return true
	      });
	      let total = mockUsers.length;
	      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            total: total,
	            users: mockUsers
	          }]);
	        }, 1000);
	      })
	    })
	    //编辑用户
	    mock.onGet('/user/edit').reply(config => {
	      let { id, name, addr, age, birth, sex } = config.params
	      _Users.some(u => {
	        if (u.id === id) {
	          u.name = name
	          u.addr = addr
	          u.age = age
	          u.birth = birth
	          u.sex = sex
	          return true
	        }
	      })
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            code: 200,
	            msg: '编辑成功'
	          }])
	        }, 500)
	      })
	    })
	    //删除用户
	    mock.onGet('/user/remove').reply(config => {
	      let { id } = config.params
	      _Users = _Users.filter(u => u.id !== id)
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            code: 200,
	            msg: '删除成功'
	          }])
	        }, 500)
	      })
	    })
	    //新增用户
	    mock.onGet('/user/add').reply(config => {
	      let { name, addr, age, birth, sex } = config.params
	      _Users.push({
	        name: name,
	        addr: addr,
	        age: age,
	        birth: birth,
	        sex: sex
	      })
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            code: 200,
	            msg: '新增成功'
	          }])
	        }, 500)
	      })
	    })
	    //批量删除用户
	    mock.onGet('/user/batchremove').reply(config => {
	      let { ids } = config.params
	      ids = ids.split(',')
	      _Users = _Users.filter(u => !ids.includes(u.id))
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            code: 200,
	            msg: '删除成功'
	          }]);
	        }, 500);
	      })
	    })

		// 获取联系我们列表
		mock.onGet('/telephone/list').reply(config => {
		  let {page, name} = config.params
	      let mockTel = _Telephone.filter(telephone => {
	        if (name && telephone.name.indexOf(name) == -1) return false
	        return true
	      });
	      let total = mockTel.length;
	      mockTel = mockTel.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            total: total,
	            telephones: mockTel
	          }]);
	        }, 1000);
	      })
		})
		//联系我们删除
	    mock.onGet('/telephone/remove').reply(config => {
	      let { id } = config.params
	      _Telephone = _Telephone.filter(u => u.id !== id)
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            code: 200,
	            msg: '删除成功'
	          }])
	        }, 500)
	      })
	    })
	}
}