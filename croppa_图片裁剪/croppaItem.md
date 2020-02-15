# CroppaItem使用说明
### <a href="https://zhanziyang.github.io/vue-croppa">原作者文档地址</a>
### 使用方法
- 组建内部emit了一个uploadImg事件，在点击upload时触发事件，只需在父组件内监听，获取data即可
### 属性说明
```
<croppa
        v-model="croppa"
        :width="400"
        :height="200"
        :prevent-white-space="true"
        :zoom-speed="8"
        placeholder="点击或拖拽以上传图片"
        placeholder-color="#000"
        :placeholder-font-size="16"
        canvas-color="white"
        :show-remove-button="true"
        remove-button-color="grey"
        :remove-button-size="50"
        :show-loading="true"
        :loading-size="50"
        loading-color="grey">
</croppa>
```
- v-model 绑定的是对象
- width和height 是裁剪的比例
- prevent-white-space 是否留白
- zoom-speed 是鼠标中间放大缩小时的速度 0-10

### 对象的生成
- 有两种方式，base64和blob，
- 组件内有base64转file的函数，可以直接使用
```
// 生成base64对象
this.croppa.generateDataUrl('image/jpeg'); 

// 生成blob对象
this.croppa.generateBlob(blob => {
        },"image/jpeg",0.8);
```