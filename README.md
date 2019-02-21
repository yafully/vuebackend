# vuebackend
Vue‘s Backend and Frontend Personal  
基于VueCli3的Vue全家桶 + Element UI + Echarts 多页面多路由前+后端脚手架  
数据由MockJS模拟  
各页面入口文件为app.js,模版文件为view下面各模块文件夹内的任意html文件
# Featrues
动态鉴权构建菜单  
标签级别权限控制
# Todo
权限管理
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
        |---mock动态数据模拟接口
          |---data 模拟数据
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
           |---role 角色状态
           |---router 路由状态
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
