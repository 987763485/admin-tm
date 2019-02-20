<template>
  <div v-loading="Infoloading" class="app-container container">
    <el-row type="">
      <el-form :ref="info" :model="info" label-width="92px">
        <el-col :xs="24" :sm="18">
          <el-form-item label="网站名称" class="name">
            <el-input v-model="info.name"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item
            :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]"
            prop="email"
            label="站长邮箱"
            class="email">
            <el-input v-model="info.email"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="18">
          <el-form-item label="公司地址">
            <el-input v-model="info.address" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-form-item label="联系电话">
            <el-input v-model="info.phone" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="18">
          <el-form-item label="版权声名">
            <el-input v-model="info.copyright" placeholder="©2018 MiaoDu Information Technology Co. Ltd. All rights reserved."/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="20">
          <el-form-item label="网站logo">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :action="uploadUrl"
              class="avatar-uploader">
              <img v-if="info.imageUrl" :src="info.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-form-item label="统计代码" class="code">
            <el-input
              v-model="info.code"
              :autosize="{ minRows: 6, maxRows: 12}"
              type="textarea"
              placeholder="请输入内容"/>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item>
            <el-button type="primary" @click="onSubmitInfo">保存更改</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { getInfo, postInfo } from '@/api/options'
export default {
  name: 'Info',
  data() {
    return {
      uploadUrl: process.env.BASE_API + '/upload/image',
      Infoloading: true,
      info: {
        name: '',
        email: '',
        code: '',
        address: '',
        copyright: '',
        imageUrl: '',
        phone: ''
      }
    }
  },
  created() {
    this.GetInfo()
  },
  methods: {
    onSubmitInfo() {
      postInfo(this.$data.info).then(() => {
        this.$message.success('提交成功')
      }).catch(() => {
        this.$message.error('提交失败')
      })
    },
    GetInfo() {
      this.Infoloading = true
      getInfo().then((res) => {
        var result = res.data
        if (result !== null) {
          this.info = Object.assign({}, result)
        }
        this.Infoloading = false
      }).catch((err) => {
        this.Infoloading = false
        this.$message.error(err)
      })
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.info.imageUrl = res.data.url
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPNG) {
        this.$message.error('上传LOGO只能是 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPNG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.line{
  text-align: center;
}
.container{
    padding-top: 36px;
}
.avatar-uploader{
    width: 120px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .el-form-item{
    margin-bottom: 32px;
  }
</style>
