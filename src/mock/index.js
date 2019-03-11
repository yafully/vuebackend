/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-15 09:05:36
 * mock数据请求,真实环境需要禁用本模块
 */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, Users } from './data/user'//用户数据
import { Roles } from './data/role'//角色数据
//const Telephone = () => import('./data/telephone')
import { Telephone } from './data/telephone';
let _Users = Users
let _Telephone = Telephone
let _Roles = Roles
let _LoginUsers = LoginUsers

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
	            // role: roleUsers[0].role,
	            // permissions: roleUsers[0].permissions,
	            roleInfo: roleUsers[0].roleInfo,
	            avatar: roleUsers[0].avatar,
	            name: roleUsers[0].name,
	            id: roleUsers[0].id
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

	    //获取角色列表（分页）
	    mock.onGet('/role/listpage').reply(config => {
	      let {page} = config.params
			let mockRoles = false
	      let total = _Roles.length;
	      if (page !== 'all') {
	    	mockRoles = _Roles.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
	      }else{
	    	mockRoles = _Roles
	      }
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            total: total,
	            roles: mockRoles
	          }]);
	        }, 1000);
	      })
	    })
	    //编辑角色
	    mock.onGet('/role/edit').reply(config => {
	      let { id, permissions, role } = config.params
	      _Roles.some(u => {
	        if (u.id === id) {
	          u.permissions = permissions
	          u.role = role
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
	    //新增角色
	    mock.onGet('/role/add').reply(config => {
	      let { id, permissions, role } = config.params
	      _Roles.push({
	        permissions: permissions,
	        role: role
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
	    //删除角色
	    mock.onGet('/role/remove').reply(config => {
	      let { id } = config.params
	     _Roles = _Roles.filter(u => u.id !== id)
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            code: 200,
	            msg: '删除成功'
	          }])
	        }, 500)
	      })
	    })

	    //获取管理员列表（分页）
	    mock.onGet('/role/adminlist').reply(config => {
	      let {page} = config.params

	      let total = LoginUsers.length;
	      let mockAdmins = LoginUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            total: total,
	            admins: mockAdmins
	          }]);
	        }, 1000);
	      })
	    })
	    //新增管理员
	    mock.onGet('/role/addadmin').reply(config => {
	      let { id, username, name, password, email, roleInfo, avatar } = config.params
	      LoginUsers.push({
	        username: username,
	        password: password,
	        email:email,
	        roleInfo:roleInfo,
	        avatar:avatar,
	        name:name
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

	    //编辑管理员
	    mock.onGet('/role/editadmin').reply(config => {
	      let { id, username, newpassword, email, roleInfo, avatar, name } = config.params
	      LoginUsers.some(u => {
	        if (u.id === id) {
	          u.username = username
	          if (newpassword != '') {
	          	u.password = newpassword
	          }
	          u.email = email
	          u.roleInfo = roleInfo
	          u.avatar = avatar
	          u.name = name
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
	    //删除管理员
	    mock.onGet('/role/removeadmin').reply(config => {
	      let { id } = config.params
	      LoginUsers.filter(u => u.id !== id)
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            code: 200,
	            msg: '删除成功'
	          }])
	        }, 500)
	      })
	    })
	    // 获取用户列表
		mock.onGet('/search/user').reply(config => {
	      let {name} = config.params
	      let mockUsers = _Users.filter(user => {
	        if (name && user.name.indexOf(name) == -1) return false
	        return true
	      })
	      console.log(name)
	      console.log(mockUsers)
	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          resolve([200, {
	            users: mockUsers
	          }])
	        }, 1000)
	      })
	    })

	    //获取文章列表
	    
	}
}