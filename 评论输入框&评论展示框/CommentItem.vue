<template>
    <div class="comment-item-wrapper">
        <div class="comment-item">
            <div class="avatar">
                <img :src="commentObj.avatar" alt="">
            </div>
            <div class="comment-item-wrapper">
                <div class="comment-header">
                    <span class="username" @click="pretoFriendCenter(commentObj.suserId)">{{commentObj.userName}}</span>
                    <span v-if="commentObj.coverUserName" class="comment-reply">回复</span>
                    <span 
                        v-if="commentObj.coverUserName" 
                        @click="pretoFriendCenter(commentObj.scoverUserId)" 
                        class="username">
                        {{commentObj.coverUserName}}
                    </span>
                    <button @click="replyVisibleHandler" class="reply-btn"><icon use='comment' size='18px'></icon></button>
                </div>
                <div class="comment-content">
                    {{commentObj.content}}
                </div>
            </div>
        </div>
        <div class="reply-input" v-if="replyVisible">
            <comment-input @comment="reply"></comment-input>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import CommentInput from '@/components/CommentInput.vue'
export default {
    name: 'CommentItem',
    props:{
        commentObj: Object
    },
    data(){
        return{
            replyVisible: false
        }
    },
    computed:{
        ...mapGetters(['suserId']),
    },
    methods:{
        ...mapActions(['toFriendCenter']),
        pretoFriendCenter(suserId) {
            if (this.suserId === suserId) {
                return
            }
            this.toFriendCenter(suserId)
        },
        replyVisibleHandler(){
            this.replyVisible = ! this.replyVisible;
        },
        reply(text){
            const body = {
                'text': text,
                'id': this.commentObj.userId
            }
            this.$emit('reply', body);
            this.replyVisible = false;
        }
    },
    components:{
        CommentInput
    }

}
</script>
<style lang="scss" scoped>
.comment-item-wrapper{
    .comment-item{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .avatar{
            margin-right: 10px;
            img{
                border-radius: 50%;
                width: 35px;
                height: 35px;
            }
        }
        .comment-item-wrapper{
            width: 100%;
            min-height: 60px;
            background-color: #F5F7FA;
            .comment-header{
                padding: 7px 12px 4px 12px;
                .username{
                    cursor: pointer;
                    font-weight: bold;
                    color: #009FEB;
                }
                .reply-btn{
                    border: none;
                    background-color: inherit;
                    margin-right: 5px;
                    float: right;
                }
            }
            .comment-content{
                margin: 0 12px 10px;
            }
        }
    }
    .reply-input{
        margin: 10px 0 10px 20px;
    }
}

</style>
