<template>
  <div class="scroll-wrapper" ref="scrollWrap">
    <div class="scroll" ref="scrollContent">
      <p v-for="(item, index) in pList" :key="index">
        Index: {{index +1}} -- content in the scroll
      </p>
      <div class="scroll-bar" ref="scrollBar" :style="{'top': scrollBarTop}" @mousedown="dragHandler"></div>
    </div>
    <div class="top-btn" @click="toTop">></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pList: [],
      scrollBarMinTop: 0,
      scrollBarMaxTop: 320,
      scrollBarTop: '5px',
      dragFlag: false
    }
  },
  watch: {
    scrollBarTop() {
      let barTop = parseInt(this.scrollBarTop)
      let contentRate = barTop / this.scrollBarMaxTop
      this.$refs.scrollContent.scrollTop = (this.$refs.scrollContent.scrollHeight - this.$refs.scrollContent.clientHeight) * contentRate
    }
  },
  methods: {
    toTop() {
      this.$refs.scrollContent.scrollTop = 0
      this.scrollBarTop = this.scrollBarMinTop + 'px'
    },
    dragHandler(barEvent) {
      let scrollBar = barEvent.target
      let disY = barEvent.clientY - scrollBar.offsetTop
      this.dragFlag = true
      document.onmousemove = (e) =>{
        if (!this.dragFlag) {
          return
        }
        let moveDis = e.clientY - disY
        if (moveDis >= this.scrollBarMinTop && moveDis <= this.scrollBarMaxTop) {
          this.scrollBarTop = moveDis + 'px'
        }
      };
      document.onmouseup = () => {
        if (this.dragFlag) {
          this.dragFlag = false
        }
      };
    },
    wheelHandler(e) {
      let curTop = parseInt(this.scrollBarTop)
      if (e.deltaY < 0) {
        // 向上滚动
        if (curTop > this.scrollBarMinTop) {
          if (curTop - 20 < this.scrollBarMinTop) {
            this.scrollBarTop = this.scrollBarMinTop + 'px'
          } else {
            this.scrollBarTop = curTop - 20 + 'px'
          }
        }
      } else {
        // 向下滚动
        if (curTop < this.scrollBarMaxTop) {
          if (curTop + 20 > this.scrollBarMaxTop) {
            this.scrollBarTop = this.scrollBarMaxTop + 'px'
          } else {
            this.scrollBarTop = curTop + 20 + 'px'
          }
        }
      }
    }
  },
  created() {
    this.pList.length = 50
  },
  mounted() {
    window.addEventListener('mousewheel', this.wheelHandler, true); 
  },
}
</script>
<style>
html {
  background-color: #ccc;
}
.scroll-wrapper{
  position: relative;
  padding: 20px;
  /* overflow-y: scroll; */
  background-color: #fff;
}
.scroll{
  height: 400px;
  overflow-y: hidden;
}
.scroll-bar{
  margin-right: 4px;
  position: absolute;
  right: 4px;
  height: 120px;
  width: 20px;
  cursor: pointer;
  border-radius: 10px;
  background-color: rgba(144,147,153,.3);
}
.top-btn{
  height: 40px;
  width: 40px;
  position: absolute;
  top: 380px;
  right: 80px;
  border-radius: 40px;
  background-color: #4791ff;
  color: #fff;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  transform: rotate(270deg);
  cursor: pointer;
}
/* .add-btn {

} */
</style>
