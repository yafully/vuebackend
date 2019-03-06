<template>
 <transition name="el-message-fade">
  <div v-show="visible" class="my-msg">{{message}}</div>
  </transition>
</template>

<script>

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
