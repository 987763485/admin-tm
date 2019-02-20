<template>
  <div v-loading="seoloading" class="app-container">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="18">
        <el-card>
          <div slot="header" class="clearfix">
            <span>seo设置</span>
          </div>
          <div>
            <el-col :span="24">
              <el-form :model="seo" label-width="92px">
                <el-form-item label="seo标题">
                  <el-input v-model="seo.title" placeholder=""/>
                </el-form-item>
                <el-form-item label="seo关键词">
                  <el-input
                    v-model="seo.keywords"
                    :rows="4"
                    type="textarea"
                    placeholder="请输入关键词" />
                </el-form-item>
                <el-form-item label="seo描述">
                  <el-input
                    v-model="seo.desc"
                    :rows="8"
                    type="textarea"
                    placeholder="请输入相关描述"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmitSeo">保存更改</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSeo, postSeo } from '@/api/options'
export default {
  name: '',
  data() {
    return {
      seoloading: true,
      seo: {
        title: '',
        keywords: '',
        desc: ''
      }
    }
  },
  created() {
    this.GetSeo()
  },
  methods: {
    GetSeo() {
      this.seoloading = true
      getSeo().then((res) => {
        if (res.data !== null) {
          this.seo = Object.assign({}, res.data)
        }
        this.seoloading = false
      }).catch((err) => {
        this.Infoloading = false
        this.$message.error(err)
      })
    },
    onSubmitSeo() {
      postSeo(this.$data.seo).then((res) => {
        this.$message.success('提交成功')
      })
    }
  }
}
</script>

<style lang="" scoped>

</style>
