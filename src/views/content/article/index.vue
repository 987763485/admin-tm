<template>
  <div v-loading="articleloading" class="app-container">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="文章列表" name="first">
            <el-table :data="articleDataArr">
              <el-table-column label="文章ID" prop="Id" align="center"/>
              <el-table-column label="标题" prop="title" align="center"/>
              <el-table-column label="是否显示" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.status === 1" size="mini" type="success" circle icon="el-icon-check"/>
                  <el-button v-else-if="scope.row.status === 0" size="mini" type="danger" circle icon="el-icon-close"/>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleEdit(scope.$index)">编辑</el-button>
                  <el-button type="danger" @click="handleDelete(scope.row.Id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row v-show="isLoad" type="flex" justify="center">
              <el-col :span="2">
                <el-button type="text" size="mini" @click="addArticles">加载更多···</el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="tabTitle" name="second">
            <el-row style="margin-top:28px;">
              <el-col :span="24" >
                <el-form :model="articleDataItem" label-width="120px">
                  <el-form-item label="标题">
                    <el-col :span="22">
                      <el-input v-model="articleDataItem.title" placeholder=""/>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="是否显示">
                    <el-col :span="2">
                      <el-switch v-model="articleDataItem.status" :active-value="1" :inactive-value="0" />
                    </el-col>
                  </el-form-item>
                  <el-form-item label="关键词">
                    <el-col :span="14">
                      <el-input v-model="articleDataItem.keywords" placeholder=""/>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-col :span="22">
                      <el-input v-model="articleDataItem.desc" placeholder=""/>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="详细内容">
                    <el-row>
                      <el-col :span="22">
                        <tinymce id="editer" v-model="articleDataItem.content" style="line-height:1.15;"/>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-col :span="20">
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit(articleDataItem)">保存</el-button>
                      <el-button type="" @click="handelCancel">取消</el-button>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getArticles, deleteArticle, postArticle, putArticle } from '@/api/article'
export default {
  name: '',
  components: {
    Tinymce
  },
  data() {
    return {
      isLoad: true,
      articleloading: true,
      activeTab: 'first',
      tabTitle: '添加文章',
      total: 0,
      currentPage: 1,
      articleDefultItem: {
        'title': '',
        'status': 1,
        'keywords': '',
        'desc': '',
        'content': ''
      },
      articleDataItem: {},
      articleDataArr: []

    }
  },
  created() {
    this.GetArticles()
  },
  methods: {
    GetArticles() {
      this.articleloading = true
      this.isLoad = true
      this.currentPage = 1
      getArticles().then(res => {
        this.articleloading = false
        this.articleDataArr = res.data.data
        var total = Math.ceil(res.data.total / 10)
        if (total <= this.currentPage) {
          this.isLoad = false
        }
      }).catch(err => {
        this.articleloading = false
        this.$message.error(err)
      })
    },
    addArticles() {
      this.currentPage += 1
      getArticles(this.currentPage).then(res => {
        this.articleloading = false
        this.articleDataArr = this.articleDataArr.concat(res.data.data)
        var total = Math.ceil(res.data.total / 10)
        if (total <= this.currentPage) {
          this.isLoad = false
        }
      }).catch(err => {
        this.articleloading = false
        this.$message.error(err)
      })
    },
    onSubmit(article) {
      var data = {
        title: article.title,
        status: article.status,
        keywords: article.keywords,
        desc: article.desc,
        content: article.content
      }
      if (article.Id) {
        putArticle(article.Id, data).then(res => {
          if (res.code === 10000) {
            this.$message.success('修改成功')
            this.handelCancel()
            this.GetArticles()
          } else {
            this.$message.error('修改失败')
            this.handelCancel()
            this.GetArticles()
          }
        }).catch(err => {
          this.$message.error(err)
        })
      } else {
        postArticle(data).then(res => {
          if (res.code === 10000) {
            this.$message.success('提交成功')
            this.handelCancel()
            this.GetArticles()
          } else {
            this.$message.error(res.mag)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }
    },
    handleEdit(index) {
      this.articleDataItem = Object.assign({}, this.articleDataArr[index])
      window.tinymce.get('editer').setContent(this.articleDataItem.content)
      this.activeTab = 'second'
      this.handleActive()
    },
    handleDelete(id) {
      deleteArticle(id).then(res => {
        if (res.data === 1) {
          this.$message.success('删除成功')
          this.GetArticles()
        } else {
          this.$message.error('删除失败')
          this.GetArticles()
        }
      }).catch(err => {
        this.$message.error(err)
        this.GetArticles()
      })
    },
    handelCancel() {
      this.articleDataItem = Object.assign({}, this.articleDefultItem)
      window.tinymce.get('editer').setContent('')
      this.activeTab = 'first'
      this.handleActive()
    },
    handleActive() {
      if (this.articleDataItem.Id) {
        this.tabTitle = '编辑文章'
      } else {
        this.tabTitle = '添加文章'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
    margin-bottom: 32px;
}
.el-input{
  box-sizing: border-box;
}
</style>
