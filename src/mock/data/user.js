import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 10001,
    username: 'test',
    password: '123456',
    email:"78866326@qq.com",
    roleInfo: {
        role: 'admin',
        permissions: '管理员'        
    },
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: 'Normal Star'
  },
  {
    id: 10002,
    username: 'super',
    password: '123456',
    email:"yafully@gmail.com",
    roleInfo: {
        role: 'superAdmin',
        permissions: '超级管理员'        
    },
    avatar: 'https://avatars1.githubusercontent.com/u/917101?s=400&u=c5a56a8537aed38fc41cea7630d433e227c63b2a&v=4',
    name: 'Super Star'
  },
  {
    id: 10003,
    username: 'customer',
    password: '123456',
    email:"2986567@qq.com",
    roleInfo: {
        role: 'customer',
        permissions: '编辑'        
    },
    avatar: 'https://avatars1.githubusercontent.com/u/18225919?s=460&v=4',
    name: 'Lower Star'
  }
];

//随机数据模拟
const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    telephone: Mock.Random.string('number', 11),
    password: Mock.Random.string('number',6),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
