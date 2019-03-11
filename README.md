# vuebackend
Vue‘s Backend and Frontend Personal  
基于VueCli3的Vue全家桶 + Element UI 多页面多路由前+后端脚手架  
# 相关组件
Echarts  
数据由MockJS模拟  
driver.js  
axios  
sortablejs  
vue-i18n  
vue-wechat-title  
js-cookie  
xlsx  
file-saver  
tinymce

各页面入口文件为app.js,模版文件为view下面各模块文件夹内的任意html文件  
# 兼容低版本的IE
需要引入babel-polyfill
# Featrues  
多语言国际化  
多级菜单
动态鉴权构建菜单  
多标签页工作区  
标签级别权限控制  
缓存机制  
数据导入、导出  
系统引导  
页面位置缓动  
常用工具函数  
自定义全局扩展封装  
el-pagination二次封装
# Todo  
富文本编辑器  

If you find it useful, please start this project ~
```
    webpack
      |---dist 
      |---public 公共文件
        |---mock 静态模拟数据
      |---src
        |---api 数据接口
        |---assets 资源
          |---css
          |---fonts
          |---images
          |---less
        |---common 公共模块目录
        |---components组件  
          |---charts 图表组件封装
          |---drawer 抽屉组件封装  
          |---global 全局组件封装区   
          |---scrollPanel 多标签滑动组件封装
          |---uploadExcel excel上传
        |---directive 指令扩展
          |---perission 局部权限扩展  
        |---lang多语言数据  
        |---mock动态数据模拟接口
          |---data 模拟数据
        |---vendor  Excel相关js包  
        |---views各个模块
          |---index    index模块
            |---pages 组件
              |---users 用户模块
            |---app.js
            |---IndexPage.vue
            |---index.html 页面模板
          |---about       about模块
            |---pages 组件
            |---app.js
            |---AboutPage.vue
            |---index.html 页面模板
          |---error       error404模块
            |---index.vue
         |---vuex    
           |---lang 国际化状态
           |---layout 布局状态
           |---role 角色状态
           |---router 路由状态
           |---tagview 标签页状态
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
### See demo at 
```
Backend  
http://localhost:8888/project/#/login  
[User:test 123456][User:super 123456]
Frontend  
http://localhost:8888/project/about.html
```
### Online (Temporary address) 
[Demo Link](http://yafully788.3vkj.net/project/)
