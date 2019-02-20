<template>
  <div v-loading="propertyloading" class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>产品属性</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleAdd">添加</el-button>
          </div>
          <div>
            <el-table :data="propertyDataArr" border >
              <el-table-column label="序号" align="center">
                <template slot-scope="scope">
                  {{ scope.$index }}
                </template>
              </el-table-column>
              <el-table-column label="属性组名称" prop="name" align="center"/>
              <el-table-column label="属性项" align="center">
                <template slot-scope="scope">
                  <ul>
                    <li v-for="item in scope.row.values" :key="item.index">{{ item }}</li>
                  </ul>
                </template>
              </el-table-column>
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
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="编辑属性">
      <el-row>
        <el-col :span="24">
          <el-form :model="propertyDataItem" label-width="120px">
            <el-form-item label="属性组名称">
              <el-row>
                <el-col :span="16">
                  <el-input v-model="propertyDataItem.name" placeholder=""/>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="属性项">
              <el-row v-for="(item,index) in propertyDataItem.values" :key="index">
                <el-col :span="10" >
                  <el-input v-model="propertyDataItem.values[index]" placeholder=""/>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-button type="success" icon="el-icon-plus" size="small" @click="addProperyItemChild"/>
                  <el-button type="danger" icon="el-icon-minus" size="small" @click="removeProperyItemChild"/>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitProperty(propertyDataItem)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getProperty, postProperty, putProperty, deleteProperty } from '@/api/property'
export default {
  name: '',
  data() {
    return {
      propertyloading: true,
      dialogVisible: false,
      propertyDataDefaultItem: {
        name: '',
        values: []
      },
      propertyDataItem: {},
      propertyDataArr: []
    }
  },
  created() {
    this.GetProperty()
  },
  methods: {
    GetProperty() {
      this.propertyloading = true
      getProperty().then(res => {
        if (res.data.length !== 0) {
          this.propertyDataArr = res.data
        } else {
          this.propertyDataArr = []
        }
        this.propertyDataArr.forEach(item => {
          var str = JSON.parse(item.values)
          item.values = str
        })
        this.propertyloading = false
      }).catch(err => {
        this.propertyloading = false
        this.$message.error(err)
      })
    },
    addProperyItemChild() {
      this.propertyDataItem.values.push('')
    },
    removeProperyItemChild() {
      this.propertyDataItem.values.pop()
    },
    handleDelete(index) {
      deleteProperty(index).then(res => {
        if (res.data === 1) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
        this.GetProperty()
      }).catch(err => {
        this.$message.error(err)
        this.GetProperty()
      })
    },
    handleEdit(index) {
      this.propertyDataItem = Object.assign({}, this.propertyDataArr[index])
      this.dialogVisible = true
    },
    handleAdd() {
      this.dialogVisible = true
      this.propertyDataItem = Object.assign({}, this.propertyDataDefaultItem)
      this.propertyDataItem.values = []
    },
    onSubmitProperty(propertyDataItem) {
      if (propertyDataItem.Id) {
        var data = {
          name: propertyDataItem.name,
          values: propertyDataItem.values
        }
        putProperty(propertyDataItem.Id, data).then(res => {
          this.dialogVisible = false
          if (res.code === 10000) {
            this.$message.success('提交成功')
          } else {
            this.$message.error(res.msg)
          }
          this.GetProperty()
        }).catch(err => {
          this.dialogVisible = false
          this.$message.error(err)
          this.GetProperty()
        })
      } else {
        postProperty(propertyDataItem).then(res => {
          this.dialogVisible = false
          if (res.code === 10000) {
            this.$message.success('提交成功')
          } else {
            this.$message.error(res.msg)
          }
          this.GetProperty()
        }).catch(err => {
          this.dialogVisible = false
          this.$message.error(err)
          this.GetProperty()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul{
  // list-style: none;
  padding-inline-start:0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  li{
    padding: 2px;
  }
}
.el-col{
  margin-bottom: 20px;
}
</style>
