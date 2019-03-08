/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-16 10:10:56
 */
// const SIGN_REGEXP = /([yMdhsm])(\1*)/g
// const DEFAULT_PATTERN = 'yyyy-MM-dd'
// function padding(s, len) {
//     var len = len - (s + '').length
//     for (var i = 0; i < len; i++) { s = '0' + s }
//     return s
// }
function padding(source){
	return source>9?source:'0'+source;  
}

let Util = Util || {}
/**
 * 获取当前运行环境
 */
Util.isDev = (process.env.NODE_ENV === 'development')
/**
  *判断当前终端是否为Mobile
**/
Util.isMobile = function () {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
	    //跳转移动端页面
	    return true
	} else {
	    //跳转pc端页面
	    return false
	}
}
/**
  * 回调函数封装
**/
Util.fireEvent = function(fn,arg){
	if(typeof fn !== 'function') return
	var args = Array.isArray(arg) ? arg : [].push(arg)
	return arg ? fn.apply(this,args) : fn.call(this)
}
/**
 * 对目标日期对象进行格式化
 * 
 * @name formatDate.format
 * @function
 * @grammar formatDate.format(new Date(),'yyyy-MM-ddThh:mm:ss')
 * @param {Date}
 *            source 目标日期对象
 * @param {string}
 *            pattern 日期格式化规则
 * @remark
 * 
 * <b>格式表达式，变量含义：</b><br>
 * <br>
 * hh: 带 0 补齐的两位 12 进制时表示<br>
 * h: 不带 0 补齐的 12 进制时表示<br>
 * HH: 带 0 补齐的两位 24 进制时表示<br>
 * H: 不带 0 补齐的 24 进制时表示<br>
 * mm: 带 0 补齐两位分表示<br>
 * m: 不带 0 补齐分表示<br>
 * ss: 带 0 补齐两位秒表示<br>
 * s: 不带 0 补齐秒表示<br>
 * yyyy: 带 0 补齐的四位年表示<br>
 * yy: 带 0 补齐的两位年表示<br>
 * MM: 带 0 补齐的两位月表示<br>
 * M: 不带 0 补齐的月表示<br>
 * dd: 带 0 补齐的两位日表示<br>
 * d: 不带 0 补齐的日表示
 * 
 * 
 * @returns {string} 格式化后的字符串
 */
Util.formatDate = function (source, pattern) {
	if ('string' != typeof pattern) {
		return source.toString();
	}

	function replacer(patternPart, result) {
		pattern = pattern.replace(patternPart, result)
	}

	let pad = padding, 
	   year = source.getFullYear(), 
	  month = source.getMonth() + 1, 
	  date2 = source.getDate(), 
	  hours = source.getHours(), 
	minutes = source.getMinutes(), 
	seconds = source.getSeconds();

	replacer(/yyyy/g, pad(year, 4))
	replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2))
	replacer(/MM/g, pad(month, 2))
	replacer(/M/g, month)
	replacer(/dd/g, pad(date2, 2))
	replacer(/d/g, date2)

	replacer(/HH/g, pad(hours, 2))
	replacer(/H/g, hours)
	replacer(/hh/g, pad(hours % 12, 2))
	replacer(/h/g, hours % 12)
	replacer(/mm/g, pad(minutes, 2))
	replacer(/m/g, minutes)
	replacer(/ss/g, pad(seconds, 2))
	replacer(/s/g, seconds)
	return pattern;	
}
/**
 * 将目标字符串转换成日期对象
 * 
 * @name formatDate.parse
 * @function
 * @grammar formatDate.parse('2014-05-06T12:20:35')
 * @param {string}
 *            source 目标字符串
 * @remark
 * 
 * 对于目标字符串，下面这些规则决定了 parse 方法能够成功地解析：
 * 短日期可以使用"/"或"-"作为日期分隔符，但是必须用月/日/年的格式来表示，例如"7/20/96"。
 * 以 "July 10 1995" 形式表示的长日期中的年、月、日可以按任何顺序排列，年份值可以用 2 位数字表示也可以用 4
 * 位数字表示。如果使用 2 位数字来表示年份，那么该年份必须大于或等于 70
 * 括号中的任何文本都被视为注释。这些括号可以嵌套使用
 * 逗号和空格被视为分隔符。允许使用多个分隔符
 * 月和日的名称必须具有两个或两个以上的字符。如果两个字符所组成的名称不是独一无二的，那么该名称就被解析成最后一个符合条件的月或日。例如，"Ju"
 * 被解释为七月而不是六月
 * 在所提供的日期中，如果所指定的星期几的值与按照该日期中剩余部分所确定的星期几的值不符合，那么该指定值就会被忽略。例如，尽管 1996 年 11
 * 月 9 日实际上是星期五，"Tuesday November 9 1996" 也还是可以被接受并进行解析的。但是结果 date 对象中包含的是
 * "Friday November 9 1996"
 * JScript 处理所有的标准时区，以及全球标准时间 (UTC) 和格林威治标准时间 (GMT)
 * 小时、分钟、和秒钟之间用冒号分隔，尽管不是这三项都需要指明。"10:"、"10:11"、和 "10:11:12" 都是有效的
 * 如果使用 24 小时计时的时钟，那么为中午 12 点之后的时间指定 "PM" 是错误的。例如 "23:15 PM" 就是错误的
 * 包含无效日期的字符串是错误的。例如，一个包含有两个年份或两个月份的字符串就是错误的
 * 
 * 
 * 
 * @returns {Date} 转换后的日期对象
 */
Util.parseDate = function (source) {
	var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
	if ('string' == typeof source) {
		if (reg.test(source) || isNaN(Date.parse(source))) {
			var d = source.split(/ |T/), d1 = d.length > 1 ? d[1]
					.split(/[^\d]/) : [ 0, 0, 0 ], d0 = d[0].split(/[^\d]/);
			return new Date(d0[0] - 0, d0[1] - 1, d0[2] - 0, d1[0] - 0,
					d1[1] - 0, d1[2] - 0);
		} else {
			return new Date(source);
		}
	}

	return new Date();
}

/**
  * Object
**/
Util.object = Util.object || {}

Util.object.size = function(object) {
    var size = 0
    for (var key in object) {
        if (object.hasOwnProperty(key)) size++
    }
    return size
}
//删除对象指定键
Util.object.erase = function(object, key){
	if (object.hasOwnProperty(key)) delete object[key]
	return object
}

/**
  * String
**/
Util.string = Util.string || {}

Util.string.getRegexForTag = function(tag, contents){
	tag = tag || ''
	var regstr = contents ? `<${tag}(?!\\w)[^>]*>([\\s\\S]*?)</${tag}(?!\\w)>`: `</?${tag}([^>]+)?>`,
		reg = new RegExp(regstr, 'gi')
	return reg
};

//获取标签
Util.string.getTags = function(source, tag, contents){
	return source.match(Util.string.getRegexForTag(tag, contents)) || []
}
//去除标签
Util.string.stripTags = function(source, tag, contents){
	return source.replace(Util.string.getRegexForTag(tag, contents), '')
}
//替换所有
Util.string.replaceAll = function(source,s1,s2,ignore) {
	return source.replace(new RegExp(s1.replace(/([,!\\^${}[\]().*+?|<>\-&])/g, function(c){return '\\' + c}), 'g'+(ignore?'i':'')), s2)
};
// 从左截取指定长度的字串
Util.string.left = function(source,n){
	return source.slice(0, n)
};
// 从右截取指定长度的字串
Util.string.right = function(source,n){ 
	return source.slice(source.length - n)
};
/**
  * Array
**/
Util.array = Util.array || {}
/**
 * 移除数组中的项
 * 
 * @name Util.array.remove
 * @function
 * @grammar Util.array.remove(source, match)
 * @param {Array}
 *            source 需要移除项的数组
 * @param {Any}
 *            match 要移除的项
 * @meta standard
 * @see Util.array.removeAt
 * 
 * @returns {Array} 移除后的数组
 */
Util.array.remove = function(source, match) {
	if (!match) {
		source = []
	} else {
		var len = source.length
		while (len--) {
			if (len in source && source[len] === match) {
				source.splice(len, 1)
			}
		}
	}
	return source
}
/**
 * 根据索引移除数组中的项
 * 
 * @name Util.array.removeAt
 * @function
 * @grammar Util.array.removeAt(source, index)
 * @param {Array}
 *            source 需要移除项的数组
 * @param {number}
 *            index 要移除项的索引位置
 * @see Util.array.remove
 * @meta standard
 * @returns {Any} 被移除的数组项
 */

Util.array.removeAt = function(array, from, to) {  
  var rest = array.slice((to || from) + 1 || array.length)
  array.length = from < 0 ? array.length + from : from
  array.push.apply(array, rest)
  return array
}
/*
//返回2个数组的交集
*/
Util.array.intersect = function(source,other){
	var cpy = source.slice()
	source.forEach(function(el,i) {
		if (other.indexOf(el) < 0)cpy.splice(cpy.indexOf(el), 1)
	})
	return cpy
}
/*
*向对象数组push一个元素，如果它在数组中不存在,大小写敏感
*/
Util.array.include =  function(source,item){
	if (!source.includes(item)) source.push(item)
	return source
}
/*
*联合2个数组且去掉重复项
*/
Util.array.combine = function(source,array){
	for (var i = 0, l = array.length; i < l; i++) Util.array.include(source,array[i])
	return source
}
/*
//返回2个数组的差集
*/
Util.array.differentiate = function(source,other){
	var src = source.slice()
	var cmp = other.slice()
	other.forEach(function(el,i) {
		if (src.indexOf(el) > -1) {
			// remove from both
			src.splice(src.indexOf(el), 1)
			cmp.splice(cmp.indexOf(el), 1)
		}
	})
	return Util.array.combine(src,cmp)
}
//仿Linq条件查询返回所有满足条件的数组
//item	Object	当前回调返回的数组第index个元素
//index	Int	可选参数,当前回调返的数组的索引
//$.array.where(stooges,function(item,index){return item.name=="larry"})
Util.array.where = function(source,clause) {
	if (!clause)return
	var len = source.length, newArray = []
	for (var i = 0; i < len; i++) {
		if (clause(source[i], i)) {
			newArray[newArray.length] = source[i]
		}
	}
	return newArray
}
//el为dom对象或ID
Util.getCoordinates = function(el) {
	let elem = Object.prototype.toString.call(el) === '[object String]' ? document.getElementById(el) : el
	if(!elem) return
	let xy = elem.getBoundingClientRect();
	let top = xy.top - document.documentElement.clientTop + document.documentElement.scrollTop,//document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
	bottom = xy.bottom,
	left = xy.left - document.documentElement.clientLeft + document.documentElement.scrollLeft,//document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
	right = xy.right,
	width = xy.width || right - left, //IE67不存在width 使用right - left获得
	height = xy.height || bottom - top;
	return {
		top:top,
		right:right,
		bottom:bottom,
		left:left,
		width:width,
		height:height
	}
}

export { Util }