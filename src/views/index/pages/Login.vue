<template>
	<div v-wechat-title="$route.meta.title" id="login">
    <el-card shadow="always" class="login-box" v-if="normalLogin">
      <div slot="header" class="clear formTit">
        <span class="titIconbox">
          <span class="scan-tip">扫码登录</span>
          <i class="el-icon-saoma icon" @click="normalLogin = !normalLogin"></i>
        </span>
      </div>
  	  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
  	    <h3 class="title" v-text="$t('login.title')"></h3>
  	    <el-form-item prop="account">
  	      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" :placeholder="$t('login.account')"></el-input>
  	    </el-form-item>
  	    <el-form-item prop="checkPass">
  	      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" :placeholder="$t('login.password')"></el-input>
  	    </el-form-item>
  	    <el-checkbox v-model="checked" checked class="remember">{{$t('login.remember')}}</el-checkbox>
  	    <el-form-item style="width:100%;">
  	      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining" v-text="$t('login.login')"></el-button>
  	    </el-form-item>  
  	  </el-form>
      <div class="login-links">
        <router-link class="anilink" to="#">忘记密码</router-link>
        <router-link class="anilink" to="#">忘记会员名</router-link>
        <router-link class="anilink" to="#">免费注册</router-link>
      </div>
    </el-card>

    <el-card shadow="always" class="login-box" v-else>
      <div slot="header" class="clear formTit">
        <span class="titIconbox">
          <span class="scan-tip">普通登录</span>
          <i class="el-icon-computer icon" @click="normalLogin = !normalLogin"></i>
        </span>
      </div>
      <h3 class="title" v-text="`扫码登录`"></h3>
      <div class="scan-box">
        <img src="https://img.alicdn.com/tfscom/TB1ivYYyHvpK1RjSZFqwu3XUVXa.png">
        <div class="scan-info">
          <span class="vm">
            <i class="el-icon-saomafull"></i>
          </span>
          <span class="vm">
            打开 微信 扫一扫登录
          </span>  
        </div>
      </div>
      <div class="login-links">
        <router-link class="anilink" to="#">免费注册</router-link>
      </div>
    </el-card>  
    <lang-select class="loginLang"></lang-select>
	</div>
</template>

<script>
  import '@less/login.less'
  import { requestLogin } from '@/api/api';
  import LangSelect from './layout/LangSelect'
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        normalLogin:true,
        logining: false,
        ruleForm2: {
          account: 'super',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    components: {
      LangSelect
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2() {
        //var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass }
            
            requestLogin(loginParams).then(data => {
              this.logining = false;
              //console.log(data)
              let { msg, code, user } = data
              let self = this 
              // async function setUserKey (user) {
              //   await self.$store.dispatch('setToken', user.username)
              // }

              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                //sessionStorage.setItem('user', JSON.stringify(user));
                //this.$router.push({ path: '/index' });
                self.$store.dispatch('setToken', user).then(() => {
                  self.$router.push({path: '/index'})
                }).catch(res => {
                  self.$message({
                    showClose: true,
                    message: res,
                    type: 'error'
                  })
                })

                // setUserKey(user).then(() =>{
                //   //location.reload()
                //   this.$router.push({ path: '/index' })
                // }).catch(res => {
                //   this.$message({
                //     showClose: true,
                //     message: res,
                //     type: 'error'
                //   })
                // })

              }
            });
            //不模拟请求直接跳转
            //sessionStorage.setItem('user', JSON.stringify({"id":1,"username":"admin","avatar":"https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png","name":"张某某"}))
            //this.$router.push({ path: '/table' })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted () {
      //console.log(store.getters.token)
    }
  }

</script>

<style lang="less">

</style>
