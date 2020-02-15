<template>
    <div class="comment-input">
        <div class="avatar">
            <img :src="baseInfo.avatar" alt="">
        </div>
        <div class="input-wrapper">
            <div class="input-left">
                <p contenteditable="plaintext-only" ref="inputP" class="input-p">{{inputValue}}</p>
            </div>
            <div class="input-right">
                <button-emoji class="emoji" @clickEmoji='appendEmoji'>
                    <icon use="smile"></icon>
                </button-emoji>
                <div class="input-btn" @click="comment">{{$t('publishComment')}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import ButtonEmoji from '@/components/ButtonEmoji.vue'
export default {
    name: 'CommentInput',
    data(){
        return{
            inputValue: '',
        }
    },
    computed:{
        ...mapGetters(['baseInfo', 'userType']),
    },
    components:{
        ButtonEmoji
    },
    methods:{
        appendEmoji(emoji){
            this.inputValue += emoji;
        },
        comment(){
            const text = this.$refs.inputP.textContent;
            console.log(text);
            this.$emit('comment', text);
            this.$refs.inputP.textContent = '';
            this.inputValue = '';
        }
    }

}
</script>
<style lang="scss" scoped>
.comment-input{
    margin-left: 10px;
    display: flex;
    align-items: center;
    .avatar{
        margin-right: 10px;
        img{
            border-radius: 50%;
            width: 35px;
            height: 35px;
        }
    }
    .input-wrapper{
        // width: 100%;
        flex: 1;
        display: flex;
        // overflow: hidden;
        min-height: 35px;
        border-radius: 20px;
        border: 1px solid #e6e6e6;
        .input-left{
            flex: 1;
            max-height: 105px;
            overflow-y: hidden;
            .input-p{
                color: #333333;
                font-size: 14px;
                margin: 5px;
                padding: 5px;
                outline:none;
            }
        }
        .input-right{
            width: 100px;
            display: flex;
            align-items: center;
            z-index: 2;
            margin-left: -20px;
            .emoji{
                height: 100%;
                background-color: #fff;
                text-align: center;
                cursor: pointer;
                width: 35px;
            }
            .input-btn{
                cursor: pointer;
                padding: 5px 15px;
                border: 1.5px solid #009FEB;
                font-size: 14px;
                color: #009FEB;
                font-weight: bold;
                border-radius: 20px;
            }
        }
    }
}
</style>
