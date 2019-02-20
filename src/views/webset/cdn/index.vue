<template>
  <div v-loading="cdnloading" class="app-container">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="18">
        <el-card>
          <div slot="header" class="clearfix"><span>CDN设置</span></div>
          <div>
            <el-form :model="cdn" :ref="cdn" label-width="92px">
              <el-form-item label="CDN设置" >
                <el-input v-model="cdn.value" placeholder="请输入静态资源地址"/>
                <div>当前CDN地址:<span style="padding-left:28px;color:red">{{ cdn.value }}</span></div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmitCDN">保存更改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCDN, postCDN } from '@/api/options'
export default {
  name: 'Cdn',
  data() {
    return {
      cdnloading: true,
      cdn: {}
    }
  },
  created() {
    this.GetCDN()
  },
  methods: {
    GetCDN() {
      this.cdnloading = true
      getCDN().then((res) => {
        if (res.data !== null) {
          this.cdn = Object.assign({}, res.data)
        }
        this.cdnloading = false
      }).catch((err) => {
        this.cdnloading = false
        this.$message.error(err)
      })
    },
    onSubmitCDN() {
      postCDN(this.$data.cdn).then(() => {
        this.$message.success('提交成功')
      }).catch(() => {
        this.$message.error('提交失败')
      })
    }
  }
}
</script>

<style lang="" scoped>

</style>
