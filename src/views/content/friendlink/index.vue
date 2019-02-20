<template>
  <div v-loading="linkloading" class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>友情连接</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleAdd">添加</el-button>
          </div>
          <div>
            <el-table :data="linkDataArr">
              <el-table-column label="序号">
                <template slot-scope="scope">{{ scope.$index }}</template>
              </el-table-column>
              <el-table-column label="权重" prop="weight"/>
              <el-table-column label="标题" prop="title"/>
              <el-table-column label="连接地址" prop="url"/>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click="handleEdit(scope.$index)">编辑</el-button>
                  <el-button
                    type="danger"
                    @click="handleDel(scope.row.Id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="友情连接">
      <el-row>
        <el-col :xs="24" :sm="18">
          <el-form :model="linkDataItem" label-width="120px">
            <el-form-item label="权重">
              <el-input v-model="linkDataItem.weight" placeholder=""/>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="linkDataItem.title" placeholder=""/>
            </el-form-item>
            <el-form-item label="连接地址">
              <el-input v-model="linkDataItem.url" placeholder=""/>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitLink(linkDataItem)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLink, postLink, putLink, deleteLink } from '@/api/link'
export default {
  name: '',
  data() {
    return {
      linkloading: true,
      dialogVisible: false,
      linkDataIndex: null,
      linkDateDefaultItem: {
        weight: 10,
        title: '',
        url: ''
      },
      linkDataItem: {},
      linkDataArr: []
    }
  },
  created() {
    this.GetLinkData()
  },
  methods: {
    GetLinkData() {
      getLink().then(res => {
        if (res.data) {
          this.linkDataArr = res.data
        }
        this.linkloading = false
      }).catch(err => {
        this.linkloading = false
        this.$message.error(err)
      })
    },
    onSubmitLink(link) {
      if (link.Id) {
        var data = {
          title: link.title,
          weight: link.weight,
          url: link.url
        }
        putLink(link.Id, data).then(res => {
          this.dialogVisible = false
          if (res.code === 10000) {
            this.$message.success('提交成功')
          } else {
            this.$message.success('提交失败')
          }
          this.GetLinkData()
        }).catch(err => {
          this.dialogVisible = false
          this.$message.error(err)
          this.GetLinkData()
        })
      } else {
        postLink(link).then((res) => {
          this.dialogVisible = false
          if (res.code === 10000) {
            this.$message.success('提交成功')
          } else {
            this.$message.success('提交失败')
          }
          this.GetLinkData()
        }).catch(err => {
          this.dialogVisible = false
          this.$message.error(err)
          this.GetLinkData()
        })
      }
    },
    handleAdd() {
      this.dialogVisible = true
      this.linkDataItem = this.linkDateDefaultItem
    },
    handleEdit(index) {
      this.dialogVisible = true
      this.linkDataItem = this.linkDataArr[index]
    },
    handleDel(id) {
      deleteLink(id).then(res => {
        if (res.code === 10000) {
          this.$message.success('删除成功')
        } else {
          this.$message.error(res.msg)
        }
        this.GetLinkData()
      }).catch(err => {
        this.$message.error(err)
        this.GetLinkData()
      })
    }
  }
}
</script>

<style lang="" scoped>

</style>
