/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-03-11 15:30:47
 */
import Mock from 'mockjs'
const Articles = []
const count = 100

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="http://59.175.109.211:8081/awbridal/media/ipbanners/_1920x800-0306_1.jpg"></p>'
const image_uri = 'http://59.175.109.211:8081/awbridal/media/ipbanners/_1920x800-0306_1.jpg'

for (let i = 0; i < count; i++) {
  Articles.push(Mock.mock({
    id: '@increment',
    timestamp: Mock.Random.date(),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: '我是测试数据',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}

export { Articles }
