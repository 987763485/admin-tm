<template>
  <div v-loading="bannerloading" class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="fclearfix">
            <span>轮播图设置</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addBanner">添加</el-button>
          </div>
          <div>
            <el-table :data="bannerArr" border>
              <el-table-column label="序号" width="100px" align="center">
                <template slot-scope="scope">
                  {{ scope.$index }}
                </template>
              </el-table-column>
              <el-table-column label="图片地址" prop="url"/>
              <el-table-column label="标题" prop="title"/>
              <el-table-column label="预览" width="100px" align="center">
                <template slot-scope="scope">
                  <el-button icon="el-icon-view" circle @click="handleImgView(scope.$index,scope.row)"/>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200px" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click="editBanner(scope.$index)">编辑</el-button>
                  <el-button
                    type="danger"
                    @click="handleDelete(scope.$index,scope.row.Id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="编辑">
      <el-form :model="banner" label-width="92px">
        <el-form-item :rules="{required: true,}" label="图片地址">
          <el-input v-model="banner.url" placeholder=""/>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="banner.title" placeholder=""/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitBanner(banner)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogImgVisable" title="预览">
      <el-row>
        <el-col :span="24">
          <div>
            <img :src="viewImgUrl" style="width:100%;">
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, deleteBanner, postBanner, putBanner } from '@/api/banner'
export default {
  name: 'Banner',
  data() {
    return {
      bannerloading: true,
      dialogVisible: false,
      dialogImgVisable: false,
      viewImgUrl: '',
      banner: {
        url: '',
        title: ''
      },
      bannerArr: []
    }
  },
  created() {
    this.GetBanner()
  },
  methods: {
    GetBanner() {
      this.bannerloading = true
      getBanner().then(res => {
        if (res.data !== null) {
          this.bannerArr = res.data
        }
        this.bannerloading = false
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    handleDelete(index, id) {
      deleteBanner(id).then(res => {
        if (res.data === 1) {
          this.$message.success('删除成功')
          this.bannerArr.splice(index, 1)
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    addBanner() {
      this.banner = {
        url: '',
        title: ''
      }
      this.dialogVisible = true
    },
    editBanner(index) {
      Object.assign(this.banner, this.$data.bannerArr[index])
      this.dialogVisible = true
    },
    onSubmitBanner(banner) {
      if (banner.Id) {
        var data = {
          url: banner.url,
          title: banner.title
        }
        putBanner(banner.Id, data).then((res) => {
          this.dialogVisible = false
          this.$message.success('提交成功')
          this.GetBanner()
        }).catch(() => {
          this.dialogVisible = false
          this.$message.error('提交失败')
          this.GetBanner()
        })
      } else {
        postBanner(banner).then((res) => {
          this.$message.success('提交成功')
          this.dialogVisible = false
          this.GetBanner()
        }).catch(() => {
          this.dialogVisible = false
          this.$message.error('提交失败')
          this.GetBanner()
        })
      }
    },
    handleImgView(index, row) {
      this.viewImgUrl = this.bannerArr[index].url
      this.dialogImgVisable = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
