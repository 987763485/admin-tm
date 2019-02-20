<template>
  <div class="app-container">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="18">
        <el-card>
          <div slot="header" class="clearfix">
            <span>系统设置</span>
          </div>
          <el-row>
            <el-col :span="24"><h5>快捷开关</h5></el-col>
            <el-col :xs="24" :sm="6" offset="4">
              <el-switch v-model="setData.shieldCNIP" active-text="屏蔽国内"/>
            </el-col>
            <el-col :xs="24" :sm="6" offset="4">
              <el-switch v-model="setData.shieldCNBrwser" active-text="屏蔽浏览器"/>
            </el-col>
            <el-col :xs="24" :sm="6" offset="4">
              <el-switch v-model="setData.avoidCpoy" active-text="防止复制"/>
            </el-col>
            <el-col :xs="24" :sm="6" offset="4">
              <el-switch v-model="setData.wpaIsShow" active-text="手机版网站"/>
            </el-col>
            <el-col :xs="24" :sm="6" offset="4">
              <el-switch v-model="setData.googleTraslation" active-text="谷歌翻译"/>
            </el-col>
            <el-col :xs="24" :sm="6" offset="4">
              <el-switch v-model="setData.message" active-text="底部留言"/>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" class="hidden-sm-and-down">
              <h5>语言设置</h5>
              <el-row>
                <el-col :xs="24" :sm="5" offset="4">
                  <el-checkbox v-model="checked3" label="简体中文" border/>
                </el-col>
                <el-col :xs="24" :sm="5">
                  <el-checkbox v-model="checked4" label="English" border/>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24"><h5>水印设置</h5></el-col>
            <el-col :xs="24" :sm="8" offset="4">
              <el-switch v-model="setData.watemark" active-text="开启图片水印"/>
            </el-col>
            <el-col :xs="24" :sm="20" offset="4">
              <el-row class="hidden-sm-and-down" type="flex" align="middle">
                <span class="demonstration">水印透明度</span>
                <el-col :xs="24" :sm="13">
                  <el-slider v-model="value2"/>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="20" offset="4">
              <div style="display:block;padding-top:36px;">
                <el-row type="flex" align="middle">
                  <span class="demonstration">水印图片</span>
                  <el-col :span="14">
                    <el-upload
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :action="uploadUrl"
                      class="avatar-uploader">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"/>
                    </el-upload>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      uploadUrl: process.env.BASE_API + '/upload/image',
      setData: {
        shieldCNIP: true,
        shieCNBrowser: false,
        avoidCpoy: true,
        googleTraslation: true,
        message: false,
        wpaIsShow: true,
        watemark: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-switch{
  height: 88px;
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
    width: 178px;
    height: 178px;
    display: block;
  }
  .demonstration{
    width: 120px;
  }
</style>
