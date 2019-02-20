<template>
  <div @click="imgChoise()">
    <div class="img-box" @mouseover="imgMaskShow" @mouseout="imgMaskisHidden">
      <img :src="url">
      <span class="img-name">{{ imgname }}</span>
      <div :class="{show:imgMask}" class="img-mask"/>
      <i :class="{iconActive:imgMask,iconSelect:imgSelect}" class="el-icon-success"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgSelect',
  props: {
    url: {
      type: String,
      required: true
    },
    imgname: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imgMask: false,
      imgSelect: false
    }
  },
  methods: {
    imgChoise() {
      this.imgSelect = !this._data.imgSelect
      if (this.imgSelect) {
        this.imgMask = true
      } else {
        this.imgMask = false
      }
    },
    imgMaskShow() {
      if (!this.imgSelect) {
        this.imgMask = true
      }
    },
    imgMaskisHidden() {
      if (!this.imgSelect) {
        this.imgMask = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 750px){
  .img-box {
    height: 140px;
  }
}
@media screen  and ( max-width: 750px){
  .img-box {
    height: 100px;
  }
}
.img-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  margin: 8px;
  background-color: #fff;
  border-radius: 6px;
  padding: 16px;
  padding-bottom: 32px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  .img-name{
    position: absolute;
    bottom: 6px;
    left: 0px;
    width: 98%;
    padding: 0 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 20px;
    text-align: center;
  }
  .img-mask{
    display: none;
    background-color: rgba(0,0,0,0.3);
    position: absolute;
    border-radius: 6px;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .show{display: block}
  .el-icon-success{
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 20;
    color: rgba(0, 0, 0, 0.3);
    border: 1px solid #ffffff;
    background-color: #fff;
    border-radius: 50%;
  }
  .iconActive{
    display: block;
  }
  .iconSelect{
    color: #409EFF;
  }
}

</style>
