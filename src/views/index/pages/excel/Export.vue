<template>
	<div>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="filename" placeholder="文件名"></el-input>
        </el-form-item>
        <el-form-item label="文件类型" >
          <el-select v-model="bookType" placeholder="请选择角色">
            <el-option label="xlsx" value="xlsx"></el-option>
            <el-option label="csv" value="csv"></el-option>
            <el-option label="txt" value="txt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-export" @click="handleDownload()">下载 Excel</el-button>
        </el-form-item>
      </el-form>
    </el-col>
		<!--列表-->
    <el-table :data="users" @selection-change="selsChange" highlight-current-row v-loading="listLoading" style="width: 100%;" ref="multipleTable">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" sortable>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="100" sortable>
      </el-table-column>
      <el-table-column label="生日" width="180" sortable>
        <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.birth }}</span>
            </template>
      </el-table-column>
      <el-table-column prop="addr" label="地址" min-width="180" sortable>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" :current-page.sync="page" style="float:right;">
      </el-pagination>
    </el-col>
	</div>
</template>

<script>
import { Util } from '@common/util'
import { getUserListPage } from '@api/api'

export default {
  name: 'ExcelExport',
  components: {
  	
  },
  data () {
    return {
    	users: [],
      total: 0,
      page: 1,
    	listLoading: false,
      sels: [],//列表选中列
    	downloadLoading: false,
    	filename: '',
		  autoWidth: true,
		  bookType: 'xlsx'
    }
  },
  methods: {
  	//获取角色列表
    getUsers () {
      let para = {
        page: this.page,
        name: ''
      }
      this.listLoading = true
      //console.log(para)
      getUserListPage(para).then((res) => {
        this.total = res.data.total
        this.users = res.data.users
        this.listLoading = false
        
      })
    },
    //翻页
    handleCurrentChange (val, clear) {
      if (clear) this.filters.name = ''
      this.page = val
      this.getUsers()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '性别', '年龄', '生日', '地址']
        const filterVal = ['name', 'sex', 'age', 'birth', 'addr']
        const list = this.users
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    //性别显示转换
    formatSex (row) {
      return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知'
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        switch (j) {
          case 'birth':
            return Util.parseDate(v[j])
          break;
          case 'sex':
            return v[j] == 1 ? '男' : v[j] == 0 ? '女' : '未知'
          break;
          default:
            return v[j]
          break;
        }
      }))
    },
    //批量删除
    selsChange (sels) {
      this.sels = sels
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>

<style>

</style>
