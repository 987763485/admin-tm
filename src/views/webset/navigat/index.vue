<template>
  <div v-loading="navloading" class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>导航栏设置</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addNavigat">添加</el-button>
          </div>
          <div>
            <el-table :data="navDataArr" border >
              <el-table-column label="序号" align="center">
                <template slot-scope="scope">
                  {{ scope.$index }}
                </template>
              </el-table-column>
              <el-table-column label="名称" prop="title" align="center"/>
              <el-table-column label="权重" prop="weight" align="center"/>
              <el-table-column label="是否显示" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.is_show === 1" size="mini" type="success" circle icon="el-icon-check"/>
                  <el-button v-else-if="scope.row.is_show === 0" size="mini" type="danger" circle icon="el-icon-close"/>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="editNavigat(scope.$index,scope.row.Id)">编辑</el-button>
                  <el-tooltip effect="dark" content="删除该项，将会不会显示该navber包含的页面" placement="top-end">
                    <el-button type="danger" @click="handleDelete(scope.$index,scope.row.Id)">删除</el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisable" title="编辑">
      <el-form>
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="navData.title" placeholder=""/>
        </el-form-item>
        <el-form-item label="权重" label-width="120px">
          <el-input v-model="navData.weight" placeholder=""/>
        </el-form-item>
        <el-form-item label="是否显示" label-width="120px">
          <el-switch v-model="navData.is_show" :active-value="1" inactive-value="0"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisable = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitNav(navData)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getNav, postNav, putNav, deleteNav } from '@/api/navigat'
export default {
  name: 'Navigat',
  data() {
    return {
      navloading: true,
      dialogVisable: false,
      navDataDefault: {
        weight: 10,
        title: '',
        is_show: 1
      },
      navData: {},
      navDataArr: []
    }
  },
  created() {
    this.GetNav()
  },
  methods: {
    GetNav() {
      this.navloading = true
      getNav().then((res) => {
        if (res.data !== null) {
          this.navDataArr = res.data
          this.navloading = false
        }
      }).catch((err) => {
        this.navloading = false
        this.$message.error(err)
      })
    },
    addNavigat() {
      this.dataInit().then(this.dialogVisable = true)
    },
    editNavigat(index) {
      this.dialogVisable = true
      this.navData = this.$data.navDataArr[index]
      console.log(this.navData)
    },
    onSubmitNav(navData) {
      if (navData.Id) {
        var data = {
          weight: navData.weight,
          title: navData.title,
          is_show: navData.is_show
        }
        putNav(navData.Id, data).then(() => {
          this.dialogVisable = false
          this.$message.success('提交成功')
          this.GetNav()
        }).catch(() => {
          this.dialogVisable = false
          this.$message.error('提交错误')
          this.GetNav()
        })
      } else {
        postNav(navData).then((res) => {
          this.dialogVisable = false
          this.$message.success('提交成功')
          this.GetNav()
        }).catch(() => {
          this.dialogVisable = false
          this.$message.success('提交错误')
          this.GetNav()
        })
      }
    },
    handleDelete(index, id) {
      deleteNav(id).then((res) => {
        if (res.data === 1) {
          this.$message.success('删除成功')
          this.navDataArr.splice(index, 1)
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    dataInit() {
      return new Promise((resolve, reject) => {
        this.navData = Object.assign({}, this.navDataDefault)
        resolve()
      })
    }
  }
}
</script>

<style lang="" scoped>

</style>
