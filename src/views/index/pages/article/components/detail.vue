/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-03-08 14:10:06
 */
<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
		<pin :pinTop="74" :zIndex="5" container="viewBox">
	      <el-col :span="24" class="toolbar">
	        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
	        </el-button>
	        <el-button v-loading="loading" type="warning">草稿</el-button>
	      </el-col>
		</pin>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <el-input v-model="postForm.title" :maxlength="100" name="name" placeholder="标题"></el-input>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="作者:" class="postInfo-container-item">
                    <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable remote placeholder="搜索用户">
                      <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item"/>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.display_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="60px" label="重要性:" class="postInfo-container-item">
                    <el-rate
                      v-model="postForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="margin-top:8px;"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
          <el-input :rows="1" v-model="postForm.content_short" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <tinymce ref="editor" :height="400" v-model="postForm.content" />
        </el-form-item>

<!--         <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="postForm.image_uri" />
        </el-form-item> -->
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@comp/editorTiny/'
import Pin from '@comp/pin/'
import { userSearch } from '@api/api'
const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
	name: 'Detail',
	data () {
		return {
	      postForm: defaultForm,
	      loading: false,
	      userListOptions: [],
	      rules: {
	        title: [
				{ required: true, message: '请输入标题', trigger: 'blur' }
			]
	      },
	      tempRoute: {}
	    }
	},
	props: {
		isEdit: {
		  type: Boolean,
		  default: false
		}
	},
	components: {
		Tinymce,
		Pin
	},
	computed: {
		contentShortLength() {
	      return this.postForm.content_short.length
	    }
	},
	methods: {
		fetchData(id) {
		  // fetchArticle(id).then(response => {
		  //   this.postForm = response.data
		  //   // Just for test
		  //   this.postForm.title += `   Article Id:${this.postForm.id}`
		  //   this.postForm.content_short += `   Article Id:${this.postForm.id}`

		  //   // Set tagsview title
		  //   this.setTagsViewTitle()
		  // }).catch(err => {
		  //   console.log(err)
		  // })
		},
		setTagsViewTitle() {
		  const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
		  const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
		  this.$store.dispatch('updateVisitedView', route)
		},
		submitForm() {
		  this.postForm.display_time = parseInt(this.display_time / 1000)
		  console.log(this.postForm)
		  this.$refs.postForm.validate(valid => {
		    if (valid) {
		      this.loading = true
		      this.$notify({
		        title: '成功',
		        message: '发布文章成功',
		        type: 'success',
		        duration: 2000
		      })
		      this.postForm.status = 'published'
		      this.loading = false
		    } else {
		      console.log('error submit!!')
		      return false
		    }
		  })
		},
		getRemoteUserList(query) {
	      userSearch({name:query}).then(res => {
	      	//console.log(res.data)
	        if (!res.data.users) return
	        this.userListOptions = res.data.users.map(v => v.name)
	      })
	    }
	},
	created() {
		if (this.isEdit) {
		  const id = this.$route.params && this.$route.params.id
		  this.fetchData(id)
		} else {
		  this.postForm = Object.assign({}, defaultForm)
		}
	}
}
</script>

<style lang="less">
	.toolbar{
		padding:5px;background: #fafafa;
		.el-form--inline{
			.el-form-item{
				margin-bottom:0;
			}			
		}

	}
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}	
</style>
