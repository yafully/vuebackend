/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-16 14:50:29
 */
import Mock from 'mockjs'

const Telephone = []

for (let i = 0; i < 44; i++) {
	Telephone.push(Mock.mock({
		id: Mock.Random.guid(),
		name: Mock.Random.cname(),
		//name: Mock.Random.city(),
		lat: Mock.mock({
			"number|3-53.5-6": 1
		}),
		lon: Mock.mock({
			"number|73-153.5-6": 1
		}),
		telephone: Mock.Random.string('number', 11),
		address: Mock.mock('@county(true)'),
		description: Mock.Random.email()
	}));
}

export { Telephone }
