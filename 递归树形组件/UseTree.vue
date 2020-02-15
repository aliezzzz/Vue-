<template>
  <div>
    <button @click="show = true">打开递归组件</button>
    <van-popup class="tree-popup" v-model="show" position="bottom">
      <!-- 树形结构 -->
      <div class="btn-group">
        <span class="btn cancel" @click="show = false">取消</span>
        <span class="btn" @click="show = false">确认</span>
      </div>
      <div class="tree-wrapper">
        <ul class="tree-item" v-for="(item, index) in list" :key="index">
          <tree-select :item="item" @choose="selectHandler"></tree-select>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import TreeSelect from './TreeComponent'
export default {
  components: {
    TreeSelect
  },
  data() {
    let list = [{
      name: '列表1',
      sonList: [
        {
          name: '列表1-1',
          sonList: [
            {
              name: '列表1-1-1',
            },
            {
              name: '列表1-1-2',
            }
          ]
        },
        {
          name: '列表1-2',
        }
      ]
    },
    {
      name: '列表2'
    }]
    return {
      show: false,
      list: list
    }
  },
  methods: {
    selectHandler(selectName) {
      // console.log(selectName)
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.tree-popup{
  height: 80%;
  .btn-group {
    margin-top: -1px;
    position: fixed;
    z-index: 100;
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
  .tree-wrapper{
    padding: 6px 10px;
    margin-top: 36px;
    .tree-item:first-child{
      margin-left: 0;
    }
  }
}
</style>