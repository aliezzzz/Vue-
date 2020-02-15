<template>
  <div class="audit-wrapper">
    <div class="input-wrapper">
      <van-radio-group class="radio-group" v-model="radioStatus">
        <van-radio v-for="(radio, raidoIndex) in config.radioList" :key="raidoIndex" :name="radio.value">{{radio.text}}</van-radio>
      </van-radio-group>
      <van-field
        v-if="radioStatus === config.cancelRadio"
        class="textarea"
        type="textarea"
        :placeholder="config.textAreaTips"
        v-model="textarea">
      </van-field>
    </div>
    <van-button class="submit-btn" @click="submit" :disabled="btnDisabled">{{config.btnText}}</van-button>
  </div>
</template>

<script>
export default {
  props: {
    'config': {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      btnDisabled: false,
      radioStatus: null,
      textarea: ''
    }
  },
  methods: {
    submit() {
      if (this.radioStatus === this.config.cancelRadio && !this.textarea) {
        this.$toast(this.config.textAreaTips)
        return
      }
      this.btnDisabled = true
      let obj = {
        status: this.radioStatus,
        content: this.textarea
      }
      this.$emit('submit', obj)
    }
  },
  created() {
    this.radioStatus = this.config.radioList[0].value
  }
}
</script>

<style lang="less" scoped>
.audit-wrapper{
  margin-top: 10px;
  .input-wrapper{
    padding: 6px 10px 16px 10px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #f0f0f2;
    .radio-group{
      margin-top: 10px;
      .van-radio{
        display: inline-flex;
        margin-right: 10px;
      }
    }
    .textarea{
      border: 1px solid #dfdfdf;
      margin: 8px 0 4px 0;
      padding: 8px 12px;
      border-radius: 4px;
    }
  }
  .submit-btn{
    width: 100%;
    margin: 10px 0;
    background: #067661;
    color: #fff;
    border: none;
    font-size: 15px;
    border-radius: 4px;
  }
}
</style>