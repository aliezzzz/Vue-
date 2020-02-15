# 仿支付宝日期段选择组件

```
<van-popup v-model="dateShow" position="bottom">
  <date-range-select @confirm="dateHandler" @close="dateShow = false"></date-range-select>
</van-popup>
```
- 返回的数据是一个数组 第一项是开始时间 第二项是结束时间