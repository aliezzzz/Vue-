<template>
  <div class="searcher">
    <div class="btn-group">
      <span class="btn cancel" @click="$emit('close')">取消</span>
      <span class="btn" @click="$emit('close')">确认</span>
    </div>
    <van-search
      v-model="searchCond"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @clear="onClear"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>

    <div class="teacher-list">
      <van-cell
        v-for="(item, index) in teacherList"
        :key="index"
        clickable
        @click="selectTeacher(item)"
      >
        <template slot="title">
          <span class="teacher-name">{{item.instructor}}</span>
          <span class="teacher-position" v-if="item.positionName">{{item.positionName}}</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import globalApi from '@/api/apis/global.js'
export default {
  data() {
    return {
      searchCond: '',
      teacherList: []
    }
  },
  methods: {
    onClear () {
      this.$emit('selected', this.selectList)
      this.onSearch()
    },
    onSearch () {
      globalApi.getTeacherList({
        name: this.searchCond
      }).then(res => {
        this.teacherList = res
      })
    },
    selectTeacher (item) {
      this.$emit('selected', item)
    }
  },
  created () {
    this.onSearch()
  }
}
</script>

<style lang="less">
.searcher {
  .van-cell::after {
    border: 1px solid #f5f5f5 !important;
  }
  .van-field__body {
    border: none;
    border-radius: 0;
    padding: 0;
  }
  .van-search__action {
    padding: 0 16px;
  }

  .btn-group {
    // padding: 6px 6px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.8px solid #f0f0f2;
    // border-bottom: 0.5px solid #dfdfdf;
    .btn {
      padding: 8px 16px;
      color: #1989fa;
      font-size: 14px;
    }
    /*.cancel{
            color: #666;
        }*/
  }
  .teacher-list {
    height: 264px;
    overflow: scroll;
    .teacher-name {
      margin-right: 10px;
    }
    .teacher-position {
      color: #969799;
      border: 1px solid #969799;
      font-size: 12px;
      border-radius: 4px;
      padding: 2px 4px;
    }
  }
}
</style>
