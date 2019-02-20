<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>产品标签</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleAdd">添加</el-button>
          </div>
          <div>
            <el-table :data="labelDataArr">
              <el-table-column label="ID" prop="Id" align="center"/>
              <el-table-column label="标签" prop="values" align="center"/>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleEdit(scope.$index)">编辑</el-button>
                  <el-button type="danger" @click="handleDelete(scope.row.Id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>价格区间</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="submitPriceRange">保存</el-button>
          </div>
          <div>
            <el-input v-model="priceRange.value" placeholder="-/1,1/-/2,2/-/3,3/-/5,5/-"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisable" title="产品标签">
      <el-form :model="labelDataItem">
        <el-form-item label="标签">
          <el-input v-model="labelDataItem.values" placeholder=""/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit(labelDataItem)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPriceRange, postPriceRange } from '@/api/options'
import { getLabel, postLabel, putLabel, deleteLabel } from '@/api/label'
export default {
  name: '',
  data() {
    return {
      activesTab: 'first',
      dialogVisable: false,
      priceRange: {
        value: ''
      },
      labelDataArr: [],
      labelDataItem: {},
      labelItemDefault: {
        values: ''
      }
    }
  },
  created() {
    this.GetLabel()
    this.GetPriceRange()
  },
  methods: {
    GetLabel() {
      getLabel().then(res => {
        this.labelDataArr = [].concat(res.data)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    GetPriceRange() {
      getPriceRange().then(res => {
        this.priceRange = Object.assign({}, res.data)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    submitPriceRange() {
      postPriceRange(this.priceRange).then(res => {
        if (res.code === 10000) {
          this.$message.success('提交成功')
          this.GetPriceRange()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleAdd() {
      this.labelDataItem = Object.assign({}, this.labelItemDefault)
      this.dialogVisable = true
    },
    handleCancel() {
      this.labelDataItem = Object.assign({}, this.labelItemDefault)
      this.dialogVisable = false
    },
    handleEdit(index) {
      this.labelDataItem = this.labelDataArr[index]
      this.dialogVisable = true
    },
    handleDelete(id) {
      deleteLabel(id).then(res => {
        if (res.data === 1) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
        this.GetLabel()
      }).catch(err => {
        this.$message.error(err)
        this.GetLabel()
      })
    },
    handleSubmit(label) {
      var data = {
        values: label.values
      }
      if (label.Id) {
        putLabel(label.Id, data).then((res) => {
          if (res.code === 10000) {
            this.$message.success('提交成功')
          } else {
            this.$message.error(res.msg)
          }
          this.dialogVisable = false
          this.GetLabel()
        }).catch(err => {
          this.$message.error(err)
          this.dialogVisable = false
          this.GetLabel()
        })
      } else {
        postLabel(data).then((res) => {
          if (res.code === 10000) {
            this.$message.success('提交成功')
          } else {
            this.$message.error(res.msg)
          }
          this.dialogVisable = false
          this.GetLabel()
        }).catch(err => {
          this.$message.error(err)
          this.dialogVisable = false
          this.GetLabel()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 28px;
  padding-bottom: 8px;
}
</style>
