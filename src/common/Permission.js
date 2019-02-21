/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-21 16:04:21
 * @discription  标签级鉴权
 * @useage 在任意标签上绑定 v-role="['superAdmin','admin']" 对应权限
 */
import Vue from 'vue'

Vue.directive('role',{
  bind:function (el,binding) {
  	
    let roleArr = binding.value;
    let userRole =  JSON.parse(sessionStorage.getItem('info')).roleInfo.role
    //console.log(userRole)
    if (roleArr && roleArr.indexOf(userRole) !== -1) {
      return false
    } else {
    	if (el.parentNode) {
    		el.parentNode.removeChild(el)
    	}else{
        	el.style.display = 'none'
        }
    }
  }
})
export default Vue
