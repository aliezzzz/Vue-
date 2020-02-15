<template>
  <li>
    <div class="content">
      <div @click="toggle(item.sonList.length)">
        {{item.name}}
        <van-icon v-if="item.sonList.length && !show" name="arrow-down"></van-icon>
        <van-icon v-else-if="item.sonList.length && show" name="arrow"></van-icon>
      </div>
      <van-button size="small" @click="choose">选择</van-button>
    </div>
    <ul class="son-tree" v-if="item.sonList.length" v-show="show">
      <tree-menu v-for="(son, sonIndex) in item.sonList" :key="sonIndex" :item="son" @choose="chooseHandler"></tree-menu>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'treeMenu',
  props: ['item'],
  data() {
    return {
      show: false
    }
  },
  methods: {
    toggle(flag) {
      if (flag) {
        this.show = !this.show
      }
    },
    choose() {
      this.$emit('choose', this.item.name)
    },
    chooseHandler(name) {
      this.$emit('choose', name)
    }
  }
}
</script>

<style lang="less">
.content{
  margin-left: 20px;
  .son-item{
    line-height: 36px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    align-items: center;
    i{
      margin-top: 4px;
      line-height: 20px;
      font-size: 14px;
      vertical-align: text-bottom;
    }
  }
}
</style>