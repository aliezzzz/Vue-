# tinymce editor 使用提示
```
<basicEditor
        :uploadConfig="uploadConfig"
        :url="interfaceUrl"
        :value="htmlConent"
        v-model="htmlConent">
</basicEditor>

// 编辑器 配置
htmlConent: '',
interfaceUrl: "/admin/importPic", //接口地址
uploadConfig: {
    baseURL: 'https://xcx.cimer.com.cn/jlhy',  //接口路径
    picUrl: 'https://xcx.cimer.com.cn/pic/',   //图片返回地址
    headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `bearer;${localStorage.getItem('accessToken')}`
    }
},
```
- https://cdn.bootcss.com/tinymce/5.0.2/tinymce.min.js  CDN引入
- tinymce中的setContent方法，在编辑器init的时候触发，也就是所在的页面mounted的时候创建，
- 如果需要主动改变编辑器中的文字，需要在父组建中通过refs调用其中的setContentTrigger方法
```
this.$refs.announcementEditor.setContentTrigger();
```


// 样式
和el-dialog z-index冲突
.tox-silver-sink{
    z-index: 9999;
}