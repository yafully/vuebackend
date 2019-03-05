<template>
 <transition name="el-message-fade">
  <div v-show="visible" class="my-msg">{{message}}</div>
  </transition>
</template>

<script>
  let Util = Util || {}
  Util.fireEvent = function(fn,arg){
    if(typeof fn !== 'function') return
    var args = Array.isArray(arg) ? arg : [].push(arg)
    return arg ? fn.apply(this,args) : fn.call(this)
  }
  export default{
      data(){
         return{
             message:'',
             visible:true
         } 
      },
      methods:{
          close(){
              setTimeout(()=>{
                this.visible = false
                this.$el.parentNode.removeChild(this.$el)
                Util.fireEvent(this.onClose,[this.message])
              },2000)
          },
      },
      mounted() {
      this.close()
    }
  }
</script>
