<template>
  <div class="date-range-wrapper">
    <div class="btn-group">
      <span class="btn cancel" @click="$emit('close')">取消</span>
      <span class="btn" @click="confirmHandler">确认</span>
    </div>
    <div class="date-range">
      <div class="date" :class="{'active': activeDate === 0}" @click="changeDate(0)">
        <span v-if="beginDate">{{beginDate}}</span>
        <span v-else class="placeholder">开始日期</span>
      </div>
      <div class="tips">至</div>
      <div class="date" :class="{'active': activeDate === 1}" @click="changeDate(1)">
        <span v-if="endDate">{{endDate}}</span>
        <span v-else class="placeholder">结束日期</span>
      </div>
    </div>
    <div class="picker-wrapper">
      <van-datetime-picker
        @change="dateHandler"
        :item-height="50"
        :visible-item-count="3"
        :show-toolbar=" false"
        v-model="date"
        type="date"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['dateRange'],
  model: {
    prop: 'dateRange',
    event: 'select'
  },
  data() {
    return {
      beginDate: '',
      endDate: '',
      activeDate: 0,
      date: new Date()
    }
  },
  methods: {
    changeDate(type) {
      if (type) {
        let endDate = this.endDate.split('-').join('/')
        this.date = endDate ? new Date(endDate) : new Date()
      } else {
        let beginDate = this.beginDate.split('-').join('/')
        this.date = beginDate ? new Date(beginDate) : new Date()
      }
      this.activeDate = type
    },
    dateHandler() {
      let newYear = this.date.getFullYear()
      let newMonth = this.date.getMonth() >= 9 ? this.date.getMonth() + 1 : '0' + (this.date.getMonth() + 1)
      let newDate = this.date.getDate() >= 10 ? this.date.getDate() : '0' + this.date.getDate()
      let date = `${newYear}-${newMonth}-${newDate}`
      if (this.activeDate) {
        this.endDate = date
      } else {
        this.beginDate = date
      }
      this.$emit('select', [this.beginDate, this.endDate])
    },
    confirmHandler() {
      let beginDate = this.beginDate.split('-').join('/')
      let endDate = this.endDate.split('-').join('/')
      if (new Date(beginDate) >= new Date(endDate)) {
        this.$toast('开始时间不得大于结束时间')
        return
      }
      this.$emit('confirm', [this.beginDate, this.endDate])
    }
  }
}
</script>

<style lang="less" scoped>
.date-range-wrapper{
  .btn-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.8px solid #f0f0f2;
    background-color: #fff;
    .btn {
      padding: 8px 16px;
      color: #1989fa;
      font-size: 14px;
    }
  }
  .date-range{
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    .tips{
      color: #666;
      flex: 0 0 30px;
      line-height: 40px;
      text-align: center;
    }
    .date{
      flex: 1;
      text-align: center;
      line-height: 40px;
      border-bottom: 1.5px solid #dfdfdf;
      .placeholder{
        color: #999;
      }
    }
    .active{
      color: #3497fa;
      border-color: #1989fa;
    }
  }
  .picker-wrapper{
    padding: 10px 30px;
  }
}
</style>