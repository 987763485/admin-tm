<template>
  <div v-loading="pageloading" class="app-container">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeTab" @tab-click="tabClick">
          <el-tab-pane label="页面列表" name="first">
            <el-table :data="pageDataArr">
              <el-table-column label="序号">
                <template slot-scope="scope">{{ scope.$index }}</template>
              </el-table-column>
              <el-table-column label="所属导航">
                <template slot-scope="scope">
                  {{ scope.row.nav.title }}
                </template>
              </el-table-column>
              <el-table-column label="标题" prop="title" align="center"/>
              <el-table-column label="是否显示" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.status === 1" size="mini" type="success" circle icon="el-icon-check"/>
                  <el-button v-else-if="scope.row.status === 0" size="mini" type="danger" circle icon="el-icon-close"/>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleEdit(scope.$index)">编辑</el-button>
                  <el-button type="danger" @click="handleDelete(scope.row.Id)" >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane :label="tabTitle" name="second">
            <el-row style="margin-top:28px;">
              <el-col :span="24" >
                <el-form :model="pageDataItem" label-width="120px">
                  <el-form-item label="标题">
                    <el-col :span="22">
                      <el-input v-model="pageDataItem.title" placeholder=""/>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="所属导航">
                    <el-select v-model="pageDataItem.nav.Id">
                      <el-option v-for="item in navDataArr" :key="item.index" :value="item.Id" :label="item.title">
                        <span style="float: left">{{ item.title }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="权重">
                    <el-col :span="2">
                      <el-input v-model="pageDataItem.weight" placeholder=""/>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="是否显示">
                    <el-switch v-model="pageDataItem.status" :active-value="1" :inactive-value="0" />
                  </el-form-item>
                  <el-form-item label="关键词">
                    <el-col :span="14">
                      <el-input v-model="pageDataItem.keywords" placeholder=""/>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-col :span="22">
                      <el-input v-model="pageDataItem.desc" placeholder=""/>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="详细内容">
                    <el-row>
                      <el-col :span="22">
                        <tinymce id="editer" v-model="pageDataItem.content" style="line-height:1.15;"/>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-col :span="20">
                    <el-form-item>
                      <el-button type="primary" @click="onSubmitPage(pageDataItem)">保存</el-button>
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
import { getPage, putPage, postPage, deletePage } from '@/api/page'
import { getNav } from '@/api/navigat'
export default {
  name: '',
  components: {
    Tinymce
  },
  data() {
    return {
      tabTitle: '添加页面',
      pageloading: true,
      activeTab: 'first',
      pageDefaultData: {
        status: 1,
        weight: 0,
        keywords: '',
        desc: '',
        title: '',
        content: '',
        nav: {
          Id: 1
        }
      },
      pageDataItem: {},
      pageDataArr: [],
      navDataArr: []
    }
  },
  created() {
    this.GetPageLsit()
    this.pageDataItem = Object.assign({}, this.pageDefaultData)
  },
  methods: {
    GetPageLsit() {
      this.pageloading = true
      getPage().then(res => {
        this.pageloading = false
        this.pageDataArr = res.data
        this.GetNav()
      }).catch(err => {
        this.pageloading = false
        this.$message.error(err)
      })
    },
    GetNav() {
      this.pageloading = true
      getNav().then((res) => {
        if (res.data !== null) {
          this.navDataArr = res.data
        }
        this.pageloading = false
      }).catch((err) => {
        this.$message.error(err)
        this.pageloading = false
      })
    },
    handelCancel() {
      this.pageDataItem = Object.assign({}, this.pageDefaultData)
      window.tinymce.get('editer').setContent('')
      this.activeTab = 'first'
      this.tabClick()
    },
    handleEdit(index) {
      this.pageDataItem = Object.assign({}, this.pageDataArr[index])
      window.tinymce.get('editer').setContent(this.pageDataItem.content)
      this.activeTab = 'second'
      this.tabClick()
    },
    handleDelete(id) {
      deletePage(id).then(res => {
        if (res.data === 1) {
          this.$message.success('删除成功')
          this.GetPageLsit()
        } else {
          this.$message.error('删除失败')
          this.GetPageLsit()
        }
      }).catch(err => {
        this.$message.error(err)
        this.GetPageLsit()
      })
    },
    onSubmitPage(pageData) {
      var data = {
        title: pageData.title,
        weight: pageData.weight,
        keywords: pageData.keywords,
        desc: pageData.desc,
        nav_id: pageData.nav.Id,
        content: pageData.content,
        status: pageData.status
      }
      if (pageData.Id) {
        putPage(pageData.Id, data).then((res) => {
          if (res.code === 10000) {
            this.$message.success('修改成功')
            this.handelCancel()
            this.GetPageLsit()
          } else {
            this.$message.error('修改失败')
            this.handelCancel()
            this.GetPageLsit()
          }
        }).catch((err) => {
          this.$message.error(err)
        })
      } else {
        postPage(data).then(res => {
          if (res.code === 10000) {
            this.$message.success('提交成功')
            this.handelCancel()
            this.GetPageLsit()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }
    },
    tabClick() {
      if (this.pageDataItem.Id) {
        this.tabTitle = '编辑页面'
      } else {
        this.tabTitle = '添加页面'
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
