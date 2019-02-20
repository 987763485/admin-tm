<template>
  <div class="app-container">
    <el-row>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="图片列表" name="first">
          <el-row>
            <img-upload/>
            <el-button type="" size="small">全选</el-button>
            <el-button type="" size="small" icon="el-icon-rank">移动</el-button>
            <el-button type="" size="small" icon="el-icon-delete" @click="handleDel">删除</el-button>
          </el-row>
          <el-row v-loading="imageloading" type="flex" class="imgList">
            <el-col :span="24">
              <el-row>
                <el-col v-for="(n,index) in imgDataArr" :key="index" :xs="8" :sm="6" :md="4" :lg="3" :xl="2">
                  <img-select :url="n.url" :imgname="getName(n.url)"/>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="图片分类" name="second">
          <el-row>
            <el-button type="primary" size="small" class="el-icon-plus" @click="editImgCategory()">添加</el-button>
          </el-row>
          <el-row>
            <el-table :data="imgCateGory" border >
              <el-table-column label="分类名称" prop="title" align="center"/>
              <el-table-column label="操作" align="center">
                <template slot-scope="scop">
                  <el-button @click="editImgCategory(scop.$index)">编辑</el-button>
                  <el-button type="danger" >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <el-dialog :visible.sync="dialogIsShow" title="图片分类">
      <el-row>
        <el-col :span="24">
          <el-form :model="imgCateGoryItem">
            <el-form-item label="分类名称">
              <el-input v-model="imgCateGoryItem.title" placeholder=""/>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from '../components/imgUpload/index'
import ImgSelect from '@/components/ImageSelect'
import { getImgList } from '@/api/image'
export default {
  name: '',
  components: {
    ImgUpload,
    ImgSelect
  },
  data() {
    return {
      imageloading: true,
      dialogIsShow: false,
      activeTab: 'first',
      imgDataArr: [],
      delImgArr: [],
      imgCateGoryItem: {
        title: ''
      },
      imgCateGory: [
        {
          title: '轮播'
        },
        {
          title: '广告'
        },
        {
          title: '产品'
        }
      ]
    }
  },
  created() {
    this.GetImgList()
  },
  methods: {
    GetImgList() {
      this.imageloading = true
      getImgList().then(res => {
        this.imgDataArr = res.data
      }).catch(err => {
        this.$message.error(err)
      })
      this.imageloading = false
    },
    getName(url) {
      var arr = url.split('/')
      return arr[arr.length - 1]
    },
    handleDel() {

    },
    editImgCategory(index) {
      this.dialogIsShow = true
      if (index !== undefined) {
        this.imgCateGoryItem = this.$data.imgCateGory[index]
      } else {
        this.imgCateGoryItem = {
          title: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row{
  margin-bottom: 16px ;
}
.imgList {
 background-color: #f5f5f5;
 border: 1px solid transparent;
 min-height: 100vh;
 padding: 10px;
}
.imgbox {
  margin: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  text-align: center;
  padding: 6px;
  img {
    width: 100%;
  }
}
</style>
