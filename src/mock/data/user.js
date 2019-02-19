import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 10001,
    username: 'test',
    password: '123456',
    role: 'admin',
    permissions: '管理员',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: 'Normal Star'
  },
  {
    id: 10002,
    username: 'super',
    password: '123456',
    role: 'superAdmin',
    permissions: '超级管理员',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: 'Super Star'
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
