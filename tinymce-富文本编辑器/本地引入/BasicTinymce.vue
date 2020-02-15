<template>
    <div>
        <textarea :id="id"></textarea>
    </div>
</template>

<script>
    // Import TinyMCE
    import axios from 'axios';
    import tinymce from 'tinymce/tinymce';

    // A theme is also required
    import 'tinymce/themes/silver/theme';

    import './zh_CN'

    // plugins
    import 'tinymce/plugins/advlist';
    import 'tinymce/plugins/wordcount';
    import 'tinymce/plugins/autolink';
    import 'tinymce/plugins/autosave';
    import 'tinymce/plugins/charmap';
    import 'tinymce/plugins/codesample';
    import 'tinymce/plugins/contextmenu';
    import 'tinymce/plugins/emoticons';
    import 'tinymce/plugins/fullscreen';
    import 'tinymce/plugins/hr';
    import 'tinymce/plugins/imagetools';
    import 'tinymce/plugins/insertdatetime';
    import 'tinymce/plugins/link';
    import 'tinymce/plugins/media';
    import 'tinymce/plugins/noneditable';
    import 'tinymce/plugins/paste';
    import 'tinymce/plugins/print';
    import 'tinymce/plugins/searchreplace';
    import 'tinymce/plugins/tabfocus';
    import 'tinymce/plugins/template';
    import 'tinymce/plugins/textpattern';
    import 'tinymce/plugins/visualblocks';
    import 'tinymce/plugins/anchor';
    import 'tinymce/plugins/autoresize';
    import 'tinymce/plugins/bbcode';
    import 'tinymce/plugins/code';
    import 'tinymce/plugins/colorpicker';
    import 'tinymce/plugins/directionality';
    import 'tinymce/plugins/fullpage';
    import 'tinymce/plugins/help';
    import 'tinymce/plugins/image';
    import 'tinymce/plugins/importcss';
    import 'tinymce/plugins/legacyoutput';
    import 'tinymce/plugins/lists';
    import 'tinymce/plugins/nonbreaking';
    import 'tinymce/plugins/pagebreak';
    import 'tinymce/plugins/preview';
    import 'tinymce/plugins/save';
    import 'tinymce/plugins/spellchecker';
    import 'tinymce/plugins/table';
    import 'tinymce/plugins/textcolor';
    import 'tinymce/plugins/toc';
    import 'tinymce/plugins/visualchars';

    // skins
    import 'tinymce/skins/ui/oxide/skin.min.css'
    export default {
        name: "BasicTinymce",
        props: {
            value: {
                default: '',
                type: String
            },
            url: String,
            config: Object,
            uploadConfig: Object,
            accept: {
                default: 'image/jpeg, image/png',
                type: String
            },
            maxSize: {
                default: 2097152,
                type: Number
            }
        },
        data() {
            const id = Date.now();
            return {
                id: id,
                content : '',
                loading: false,
                defaultConfig: {
                    language: 'zh_CN',
                    height: 500,
                    theme: 'silver',
                    // images_upload_url: 'https://xcx.cimer.com.cn/jlhy//usr/local/nginx/html/pic/',
                    menubar: false,
                    toolbar: `styleselect | fontselect | formatselect | fontsizeselect |
                              forecolor backcolor |
                              bold italic underline strikethrough |
                              image imagetools table |
                              alignleft aligncenter alignright alignjustify |
                              outdent indent |
                              numlist bullist |
                              removeformat  hr |
                              paste  link |
                              undo redo |
                              preview fullscreen `,
                    plugins: `
                        paste
                        importcss
                        image
                        imagetools
                        code
                        table
                        advlist
                        fullscreen
                        link
                        media
                        lists
                        hr
                        preview`,
                    // Image Upload Config
                    // images_upload_url: '',
                    // images_upload_base_path: '',
                    // automatic_uploads: '',
                    
                    // 图片上传绝对路径
                    relative_urls : false, 
                    remove_script_host : false,

                    // image-tools-config
                    imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",

                    // CONFIG
                    forced_root_block: 'p',
                    force_p_newlines: true,
                    importcss_append: true,

                    // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
                    content_style: `
                        *                         { padding:0; margin:0; }
                        html, body                { height:100%; }
                        img                       { max-width:100%; display:block;height:auto; }
                        a                         { text-decoration: none; }
                        iframe                    { width: 100%; }
                        p                         { line-height:1.6; margin: 0px; }
                        table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
                        .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
                        ul,ol                     { list-style-position:inside; }
                        `,

                    insert_button_items: 'image link | inserttable',

                    // CONFIG: Paste
                    paste_retain_style_properties: 'all',
                    paste_word_valid_elements: '*[*]',        // word需要它
                    paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
                    paste_convert_word_fake_lists: false,     // 插入word文档需要该属性
                    paste_webkit_styles: 'all',
                    paste_merge_formats: true,
                    nonbreaking_force_tab: false,
                    paste_auto_cleanup_on_paste: false,

                    // CONFIG: Font
                    fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',

                    // CONFIG: StyleSelect
                    style_formats: [
                        {
                            title: '首行缩进',
                            block: 'p',
                            styles: { 'text-indent': '2em' }
                        },
                        {
                            title: '行高',
                            items: [
                                {title: '1', styles: { 'line-height': '1' }, inline: 'span'},
                                {title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span'},
                                {title: '2', styles: { 'line-height': '2' }, inline: 'span'},
                                {title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span'},
                                {title: '3', styles: { 'line-height': '3' }, inline: 'span'}
                            ]
                        }
                    ],

                    // FontSelect
                    font_formats: `
                        微软雅黑=微软雅黑;
                        宋体=宋体;
                        黑体=黑体;
                        仿宋=仿宋;
                        楷体=楷体;
                        隶书=隶书;
                        幼圆=幼圆;
                        Andale Mono=andale mono,times;
                        Arial=arial, helvetica,
                        sans-serif;
                        Arial Black=arial black, avant garde;
                        Book Antiqua=book antiqua,palatino;
                        Comic Sans MS=comic sans ms,sans-serif;
                        Courier New=courier new,courier;
                        Georgia=georgia,palatino;
                        Helvetica=helvetica;
                        Impact=impact,chicago;
                        Symbol=symbol;
                        Tahoma=tahoma,arial,helvetica,sans-serif;
                        Terminal=terminal,monaco;
                        Times New Roman=times new roman,times;
                        Trebuchet MS=trebuchet ms,geneva;
                        Verdana=verdana,geneva;
                        Webdings=webdings;
                        Wingdings=wingdings,zapf dingbats`,

                    // Tab
                    tabfocus_elements: ':prev,:next',
                    object_resizing: true,

                    // Image
                    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions'
                }
            }
        },
        methods: {
            setContentTrigger(){
                this.$nextTick(() => {
                    tinymce.activeEditor.setContent(this.value);
                })
            },
            base64ToFile(dataurl, fileName){
                const arr = dataurl.split(',')
                const mime = arr[0].match(/:(.*?);/)[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], fileName, { type: mime });
            },
            init(){
                const that = this;
                tinymce.init({
                    ...this.config,
                    ...this.defaultConfig,
                    selector: '#' + this.id,
                    images_upload_handler: function (blobInfo, success, failure) {
                        console.log(blobInfo);
                        if(blobInfo.blob().size > that.maxSize) {
                            failure('文件体积过大')
                        }
                        if(that.accept.indexOf(blobInfo.blob().type) >= 0){
                            uploadPic();
                        }else{
                            failure('图片格式错误');
                        }

                        function uploadPic() {
                            const formData = new FormData();
                            console.log(blobInfo.blob());
                            console.log(blobInfo.base64());
                            // const picFile = that.base64ToFile(blobInfo.base64(), blobInfo.filename());
                            // console.log(picFile);
                            formData.append('pic', blobInfo.blob());
                            axios.post(that.url, formData, that.uploadConfig)
                                    .then( res =>{
                                        console.log(res.data);
                                        success(that.uploadConfig.picUrl + res.data);
                                    })
                                    .catch( error => {
                                        const code = error.response.status;
                                        that.$message({
                                            type: 'warning',
                                            message: '服务器出现问题，图片上传失败' + code
                                        })
                                    })
                        }

                    },
                    setup: (editor) => {
                        // 抛出 'on-ready' 事件钩子
                        editor.on(
                                'init', () => {
                                    that.loading = false;
                                    that.$emit('on-ready');
                                    editor.setContent(that.value);
                                    let dialog = document.getElementsByClassName('tox-tinymce-aux')[0];
                                    dialog.style.zIndex = 3000;
                                }
                        );
                        // 抛出 'input' 事件钩子，同步value数据
                        editor.on(
                                'input change undo redo', () => {
                                    that.$emit('input', editor.getContent());
                                }
                        );
                    }
                })
            },
        },
        mounted(){
            this.init();
        },
        beforeDestroy () {
            tinymce.remove(`#${this.id}`)
        },
        components: {}
    }
</script>

<style>
.tox-silver-sink{
    z-index: 9999;
}
</style>
