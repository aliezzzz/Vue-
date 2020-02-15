<template>
	<div class="croppa-item">
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
				loading-color="grey"
		>
		</croppa>
		<div class="control-bar">
			<el-button type="primary" class="upload" @click="uploadCroppedImage">上传</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "croppaItem",
		data() {
			return {
				croppa: {},
				dataUrl: ''
			}
		},
		methods: {
			//图片裁剪
			uploadCroppedImage() {
				let fileName = this.croppa.chosenFile.name;
				let dataUrl = this.croppa.generateDataUrl('image/jpeg');
				const file = this.base64ToFile(dataUrl, fileName);
				this.$emit('uploadImg', file);
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
		},
	}
</script>

<style>
.control-bar{
	text-align: right;
	margin-top: 20px;
}
.croppa-container {
	background-color: lightblue;
	border: 2px solid grey;
	border-radius: 2px;
}
</style>