<template>
  <div v-loading="productloading" class="app-container">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activesTab" @tab-click="handleClick">
          <el-tab-pane label="产品列表" name="first">
            <el-row>
              <el-col :span="24">
                <el-table :data="productDataArr" border>
                  <el-table-column label="序号" align="center">
                    <template slot-scope="scope">
                      {{ scope.$index }}
                    </template>
                  </el-table-column>
                  <el-table-column label="编号" prop="number" align="center"/>
                  <el-table-column label="分类" prop="cat.name" align="center">
                    <template slot-scope="scope">
                      <el-button type="">{{ scope.row.cat.name }}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="产品名称" prop="name" align="center"/>
                  <el-table-column label="上架" align="center" width="100px">
                    <template slot-scope="scope">
                      <el-button v-if="scope.row.status === 1" size="mini" type="success" circle icon="el-icon-check"/>
                      <el-button v-else-if="scope.row.status === 0" size="mini" type="danger" circle icon="el-icon-close"/>
                    </template>
                  </el-table-column>
                  <el-table-column label="缩略图" prop="diagramImg" align="center" width="160px">
                    <template slot-scope="scope">
                      <div class="ImgBox">
                        <img :src="scope.row.head_img">
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="200px;">
                    <template slot-scope="scope">
                      <el-button @click="handelEdit(scope.$index)">编辑</el-button>
                      <!-- <el-button type="danger">删除</el-button> -->
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row v-show="isLoad" type="flex" justify="center">
              <el-col :span="2">
                <el-button type="text" size="mini" @click="addProductList">加载更多···</el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="tabTitle" name="second">
            <el-row :gutter="16">
              <el-col :span="24">
                <el-card>
                  <div slot="header" class="clearfix">产品相册</div>
                  <div>
                    <el-upload
                      :file-list="fileList"
                      :on-error="handleError"
                      :on-remove="handleRemove"
                      :on-success="handlrSuccessCBK"
                      :on-preview="handlePictureCardPreview"
                      :action="uploadUrl"
                      :data="formData"
                      :before-upload="beforeUpload"
                      list-type="picture-card">
                      <i class="el-icon-plus"/>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,图片建议大小500x500像素，建议不超过5张</div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img :src="dialogImageUrl" width="100%" alt="">
                    </el-dialog>
                  </div>
                </el-card>
              </el-col>
              <el-form :model="productDataItem" label-width="80px">
                <el-col :span="16">
                  <el-row>
                    <el-col :span="24">
                      <el-card>
                        <div slot="header" class="clearfix">基本信息</div>
                        <div>
                          <el-form-item label="产品名称">
                            <el-input v-model="productDataItem.name" placeholder=""/>
                          </el-form-item>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="基础价格">
                                <el-input v-model="productDataItem.price" placeholder=""/>
                              </el-form-item>
                            </el-col>
                            <el-col :span="18">
                              <el-form-item label="价格列表">
                                <el-input v-model="productDataItem.pricelist" placeholder=""/>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-form-item label="分类">
                            <el-select v-model="productDataItem.cat.Id" placeholder="">
                              <el-option v-for="(item,index) in catDataArr" :key="index" :label="item.name" :value="item.Id">
                                <span>{{ item.name }}</span>
                              </el-option>
                            </el-select>
                          </el-form-item>
                          <el-row>
                            <el-col :span="18">
                              <el-form-item label="产品编号">
                                <el-input v-model="productDataItem.number" placeholder=""/>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="24">
                              <el-form-item label="标签">
                                <el-input v-model="productDataItem.label" placeholder=""/>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row :gutter="20">
                            <el-col :span="4">
                              <el-form-item label="是否上架">
                                <el-switch v-model="productDataItem.status" :active-value="1" :inactive-value="0"/>
                              </el-form-item>
                            </el-col>
                            <el-col :span="4">
                              <el-form-item label="是否推荐">
                                <el-switch v-model="productDataItem.is_refer" :active-value="1" :inactive-value="0"/>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="24">
                      <el-card>
                        <div slot="header" class="clearfix">产品SEO</div>
                        <div>
                          <el-form-item label="标题">
                            <el-input v-model="productDataItem.title"/>
                          </el-form-item>
                          <el-form-item label="关键词">
                            <el-input v-model="productDataItem.keywords"/>
                          </el-form-item>
                          <el-form-item label="描述">
                            <el-input :rows="8" v-model="productDataItem.desc" type="textarea"/>
                          </el-form-item>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="24">
                      <el-card>
                        <div slot="header" class="clearfix">详细介绍</div>
                        <div>
                          <tinymce id="editer" v-model="productDataItem.detail" style="line-height:1.15;"/>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="8">
                  <el-row>
                    <el-col :span="24">
                      <el-card>
                        <div slot="header" class="clearfix">产品属性</div>
                        <div>
                          <el-form-item label="属性组">
                            <el-select v-model="propertyDataIndex" @change="handlePropertyChange(propertyDataIndex)">
                              <el-option v-for="(item,index) in propertyDataArr" :key="index" :label="item.name" :value="index"/>
                            </el-select>
                          </el-form-item>
                          <el-form-item v-for="(name,index) in propertys" :key="index" :label="name">
                            <el-col :span="20">
                              <el-input v-model="productDataItem.property[name]"/>
                            </el-col>
                          </el-form-item>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="20">
                  <el-form-item style="text-align:center">
                    <el-button type="primary" @click="onSubmit(productDataItem)">保存</el-button>
                    <el-button @click="handelCancel">取消</el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getAll, postProduct, putProduct } from '@/api/product'
import { getCate } from '@/api/category'
import { getProperty } from '@/api/property'
import { getToken } from '@/api/upload'
export default {
  name: 'Prlist',
  components: {
    Tinymce
  },
  data() {
    return {
      formData: {
        token: ''
      },
      isLoad: true,
      currentPage: 1,
      uploadUrl: '',
      tabTitle: '添加产品',
      productloading: true,
      dialogVisible: false,
      dialogImageUrl: '',
      activesTab: 'first',
      propertyDataIndex: '',
      fileList: [],
      catDataArr: [],
      propertys: [],
      // property: {},
      propertyDataArr: [],
      productDefultDataItem: {
        name: '',
        cat_id: 1,
        head_img: '',
        number: '',
        title: '',
        price: 0,
        pricelist: '',
        keywords: '',
        label: '',
        dasc: '',
        status: 1,
        is_refer: 0,
        detail: '',
        album: [],
        cat: { Id: 1 },
        property: {}
      },
      productDataItem: {},
      productDataArr: []
    }
  },
  created: function() {
    this.GetProductList()
    this.productDataItem = Object.assign({}, this.productDefultDataItem)
    this.GetCate()
    this.GetProperty()
  },
  methods: {
    GetProperty() {
      getProperty().then(res => {
        this.propertyDataArr = res.data
        this.propertyDataArr.forEach(item => {
          item.values = JSON.parse(item.values)
        })
        // this.propertys = this.propertyDataArr[0].values
      }).catch(err => {
        this.$message.error(err)
      })
    },
    GetProductList() {
      this.isLoad = true
      this.currentPage = 1
      getAll().then(res => {
        this.productloading = false
        res.data.data.forEach(element => {
          if (element.album !== null) {
            element.album = JSON.parse(element.album)
          } else {
            element.album = []
          }
          if (element.property) {
            element.property = JSON.parse(element.property)
          } else {
            element.property = {}
          }
        })
        this.productDataArr = res.data.data
        var total = Math.ceil(res.data.total / 10)
        if (total <= this.currentPage) {
          this.isLoad = false
        }
      }).catch(err => {
        this.productloading = false
        this.$message.error(err)
      })
    },
    addProductList() {
      this.currentPage += 1
      getAll(this.currentPage).then(res => {
        this.productloading = false
        res.data.data.forEach(element => {
          if (element.album !== null) {
            element.album = JSON.parse(element.album)
          } else {
            element.album = []
          }
          if (element.property) {
            element.property = JSON.parse(element.property)
          } else {
            element.property = {}
          }
        })
        this.productDataArr = this.productDataArr.concat(res.data.data)
        var total = Math.ceil(res.data.total / 10)
        if (total <= this.currentPage) {
          this.isLoad = false
        }
      }).catch(err => {
        this.productloading = false
        this.$message.error(err)
      })
    },
    GetCate() {
      getCate().then(res => {
        if (res.code === 10000) {
          this.productloading = false
          this.catDataArr = res.data
        } else {
          this.productloading = false
          this.$message.error('获取分类失败')
        }
      }).catch(err => {
        this.$message.error(err)
        this.productloading = false
      })
    },
    onSubmit(product) {
      this.handelFileList().then(() => {
        var data = {
          name: product.name,
          cat_id: product.cat.Id,
          head_img: product.album[0].url,
          number: product.number,
          title: product.title,
          price: product.price,
          pricelist: product.pricelist,
          keywords: product.keywords,
          label: product.label,
          desc: product.desc,
          status: product.status,
          is_refer: product.is_refer,
          detail: product.detail,
          album: product.album,
          property: product.property
        }
        if (product.Id) {
          putProduct(product.Id, data).then(res => {
            if (res.code === 10000) {
              this.$message.success('修改成功')
              this.GetProductList()
              this.handelCancel()
            } else {
              this.$message.error('修改失败')
              this.GetProductList()
              this.handelCancel()
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          postProduct(data).then(res => {
            if (res.code === 10000) {
              this.$message.success('提交成功')
              this.GetProductList()
              this.handelCancel()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handlePropertyChange(index) {
      this.productDataItem.property = {}
      this.propertys = [].concat(this.propertyDataArr[index].values)
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlrSuccessCBK(res, file, fileList) {
      file.url = 'http://cdn.weihelec.com/' + res.hash
      console.log(fileList)
      this.fileList = fileList
    },
    handleError(err, file, fileList) {
      this.$message.error(err)
    },
    handleClick() {
      if (this.productDataItem.Id) {
        this.tabTitle = '编辑产品'
      } else {
        this.tabTitle = '添加产品'
      }
    },
    handelEdit(index) {
      this.propertys = []
      this.productDataItem = Object.assign({}, this.productDataArr[index])
      this.fileList = [].concat(this.productDataItem.album)
      for (var key in this.productDataItem.property) {
        this.propertys.push(key)
      }
      this.activesTab = 'second'
      this.handleClick()
      window.tinymce.get('editer').setContent(this.productDataItem.detail)
      // console.log(this.productDataItem.detail)
    },
    handelCancel() {
      window.tinymce.get('editer').setContent('')
      this.productDataItem = Object.assign({}, this.productDefultDataItem)
      this.productDataItem.property = {}
      this.fileList = []
      this.propertyDataIndex = ''
      this.propertys = []
      this.activesTab = 'first'
      this.handleClick()
    },
    handelFileList() {
      return new Promise((resolve, reject) => {
        if (this.fileList.length === 0) {
          reject('最少需要一个图片!')
        }
        this.productDataItem.album = []
        this.fileList.forEach(item => {
          this.productDataItem.album.push({ 'url': item.url })
        })
        this.fileList = [].concat(this.productDataItem.album)
        resolve()
      })
    },
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        getToken().then(res => {
          this.uploadUrl = res.data.upload_url
          this.formData.token = res.data.upload_token
          console.log(res.data.upload_token)
          resolve()
        }).catch(err => {
          this.$message.error(err)
          reject()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ImgBox{
  // width: 100px;
  // height: 76px;
  text-align: center;
  img{
    border-radius: 4px;
    width: 100px;
    max-height: 60px;
  }
}
.col-bottom{
  margin-bottom: 20px;
}
.el-card {
  margin-bottom: 28px;
  padding-bottom: 8px;
}
</style>
