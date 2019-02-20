<template>
  <div v-loading="cateloading" class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>分类列表</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleAdd">添加</el-button>
          </div>
          <div>
            <el-table :data="cateDataArr" border>
              <el-table-column label="ID" prop="Id" align="center"/>
              <el-table-column label="分类名称" prop="name" align="center"/>
              <el-table-column label="父类" align="center">
                <template slot-scope="scope">{{ parentCate(scope.row.parent_id) }}</template>
              </el-table-column>
              <el-table-column label="权重" prop="weight" align="center"/>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleEdit(scope.$index)">编辑</el-button>
                  <el-tooltip effect="dark" content="删除该项将会导致所包含的产品不会正常显示，请注意。" placement="top-end">
                    <el-button type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisable" title="编辑分类">
      <el-form :model="cateDataItem" label-width="96px">
        <!-- <el-form-item label="ID">
          <el-input v-model="categoryDataItem.id" placeholder="" disabled/>
        </el-form-item> -->
        <el-form-item label="分类名称">
          <el-input v-model="cateDataItem.name" placeholder=""/>
        </el-form-item>
        <el-form-item label="父分类ID">
          <el-select v-model="cateDataItem.parent_id">
            <el-option :value="0" label="一级分类"><span>一级分类</span></el-option>
            <el-option v-for="item in cateDataArr" :key="item.index" :value="item.Id" :label="item.name">
              <span>{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权重">
          <el-col :span="8">
            <el-input v-model="cateDataItem.weight" placeholder=""/>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="onSubmitCate(cateDataItem)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCate, deleteCate, putCate, postCate } from '@/api/category'
export default {
  name: '',
  data() {
    return {
      cateloading: true,
      dialogVisable: false,
      cateDatadefaultItem: {
        id: 1,
        name: '',
        weight: 10,
        parent_id: 0
      },
      cateDataItem: {},
      cateDataArr: []
    }
  },
  created() {
    this.GetCateData()
  },
  methods: {
    parentCate(pid) {
      if (pid === 0) {
        return '一级分类'
      } else {
        var wcat = '未知分类'
        this.cateDataArr.forEach(item => {
          if (pid === item.Id) {
            wcat = item.name
          }
        })
        return wcat
      }
    },
    handleAdd() {
      this.dialogVisable = true
      this.cateDataItem = this.cateDatadefaultItem
    },
    handleEdit(index) {
      this.cateDataItem = this.cateDataArr[index]
      this.dialogVisable = true
    },
    handleDelete(index) {
      deleteCate(this.cateDataArr[index].Id).then(res => {
        if (res.data === 1) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
        this.GetCateData()
      }).catch(err => {
        this.$message.error(err)
        this.GetCateData()
      })
    },
    GetCateData() {
      getCate().then(res => {
        if (res.data !== null) {
          this.cateDataArr = res.data
        }
        this.cateloading = false
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleCancel() {
      this.dialogVisable = false
      this.cateDataItem = this.cateDatadefaultItem
    },
    onSubmitCate(cateDataItem) {
      if (cateDataItem.Id) {
        var data = {
          parent_id: cateDataItem.parent_id,
          name: cateDataItem.name,
          weight: cateDataItem.weight
        }
        putCate(cateDataItem.Id, data).then(res => {
          if (res.code === 10000) {
            this.dialogVisable = false
            this.$message.success('提交成功')
            this.GetCateData()
          } else {
            this.dialogVisable = false
            this.$message.error(res.msg)
            this.GetCateData()
          }
        }).catch(err => {
          this.dialogVisable = false
          this.$message.error(err)
          this.GetCateData()
        })
      } else {
        postCate(cateDataItem).then(res => {
          if (res.code === 10000) {
            this.dialogVisable = false
            this.$message.success('提交成功')
            this.GetCateData()
          } else {
            this.dialogVisable = false
            this.$message.error(res.msg)
            this.GetCateData()
          }
        }).catch(err => {
          this.dialogVisable = false
          this.$message.error(err)
          this.GetCateData()
        })
      }
    }
  }
}
</script>

<style lang="" scoped>

</style>
