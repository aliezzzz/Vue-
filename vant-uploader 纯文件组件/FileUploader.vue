<template>
  <div class="file-uploader">
    <van-uploader
      class="uploader-item"
      accept=".doc,.docx,.xls"
      v-model="file"
      multiple
      :max-count="4"
      >
    </van-uploader>
  </div>
</template>

<script>
export default {
  props: ['fileList'],
  model: {
    prop: 'fileList',
    event: 'add'
  },
  data () {
    return {
      file: []
    }
  },
  watch: {
    // 如果不需要初始化fileList 可注释
    // fileList () {
    //   if (this.file.length === 0) {
    //     // file 长度为0 初始化时赋值
    //     this.file = this.fileList
    //   }
    // },
    file () {
      this.$emit('add', this.file)
    }
  }
}
</script>

<style lang="less">
.van-uploader{
  width: 100%;
  .van-uploader__preview{
    width: 100%;
    .van-uploader__file{
      flex-direction: row;
      height: 36px;
      width: 100%;
      padding: 0 6px;
      background-color: #f5f5f5;
      border-radius: 4px;
      .van-uploader__file-name{
        margin-left: 5px;
        margin-top: 0;
        text-align: left;
      }
    }
  }
  .van-uploader__upload{
    width: 100%;
    height: 36px;
    i{
      font-size: 14px;
    }
  }
}
</style>