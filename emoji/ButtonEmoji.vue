<template>
    <div :class='customClass' class="component-wrapper">
        <button class="btn-emoji" @click='toggleVisible'>
            <slot></slot>
        </button>
        <div :class='[{active:actived}, position]' class="emoji-box" @mouseleave="deactive">
            <div @click='clickEmoji($event)' class="inner-box">
                <span class='emoji-item'>😀</span>
                <span class='emoji-item'>😁</span>
                <span class='emoji-item'>😂</span>
                <span class='emoji-item'>🤣</span>
                <span class='emoji-item'>😃</span>
                <span class='emoji-item'>😄</span>
                <span class='emoji-item'>😅</span>
                <span class='emoji-item'>😆</span>
                <span class='emoji-item'>😉</span>
                <span class='emoji-item'>😊</span>
                <span class='emoji-item'>😋</span>
                <span class='emoji-item'>😎</span>
                <span class='emoji-item'>😍</span>
                <span class='emoji-item'>😘</span>
                <span class='emoji-item'>😗</span>
                <span class='emoji-item'>😙</span>
                <span class='emoji-item'>😚</span>
                <span class='emoji-item'>🙂</span>
                <span class='emoji-item'>🤗</span>
                <span class='emoji-item'>🤩</span>
                <span class='emoji-item'>🤔</span>
                <span class='emoji-item'>🤨</span>
                <span class='emoji-item'>😐</span>
                <span class='emoji-item'>😑</span>
                <span class='emoji-item'>😶</span>
                <span class='emoji-item'>🙄</span>
                <span class='emoji-item'>😏</span>
                <span class='emoji-item'>😣</span>
                <span class='emoji-item'>😥</span>
                <span class='emoji-item'>😮</span>
                <span class='emoji-item'>🤐</span>
                <span class='emoji-item'>😯</span>
                <span class='emoji-item'>😪</span>
                <span class='emoji-item'>😫</span>
                <span class='emoji-item'>😴</span>
                <span class='emoji-item'>😌</span>
                <span class='emoji-item'>😛</span>
                <span class='emoji-item'>😜</span>
                <span class='emoji-item'>😝</span>
                <span class='emoji-item'>🤤</span>
                <span class='emoji-item'>😒</span>
                <span class='emoji-item'>😓</span>
                <span class='emoji-item'>😔</span>
                <span class='emoji-item'>😕</span>
                <span class='emoji-item'>🙃</span>
                <span class='emoji-item'>🤑</span>
                <span class='emoji-item'>😲</span>
                <span class='emoji-item'>☹️</span>
                <span class='emoji-item'>🙁</span>
                <span class='emoji-item'>😖</span>
                <span class='emoji-item'>😞</span>
                <span class='emoji-item'>😟</span>
                <span class='emoji-item'>😤</span>
                <span class='emoji-item'>😢</span>
                <span class='emoji-item'>😭</span>
                <span class='emoji-item'>😦</span>
                <span class='emoji-item'>😧</span>
                <span class='emoji-item'>😨</span>
                <span class='emoji-item'>😩</span>
                <span class='emoji-item'>🤯</span>
                <span class='emoji-item'>😬</span>
                <span class='emoji-item'>😰</span>
                <span class='emoji-item'>😱</span>
                <span class='emoji-item'>😳</span>
                <span class='emoji-item'>🤪</span>
                <span class='emoji-item'>😵</span>
                <span class='emoji-item'>😡</span>
                <span class='emoji-item'>😠</span>
                <span class='emoji-item'>🤬</span>
                <span class='emoji-item'>😷</span>
                <span class='emoji-item'>🤒</span>
                <span class='emoji-item'>🤕</span>
                <span class='emoji-item'>🤢</span>
                <span class='emoji-item'>🤮</span>
                <span class='emoji-item'>🤧</span>
                <span class='emoji-item'>😇</span>
                <span class='emoji-item'>🤠</span>
                <span class='emoji-item'>🤡</span>
                <span class='emoji-item'>🤥</span>
                <span class='emoji-item'>🤫</span>
                <span class='emoji-item'>🤭</span>
                <span class='emoji-item'>🧐</span>
                <span class='emoji-item'>🤓</span>
                <span class='emoji-item'>😈</span>
                <span class='emoji-item'>👿</span>
                <span class='emoji-item'>👹</span>
                <span class='emoji-item'>👺</span>
                <span class='emoji-item'>💀</span>
                <span class='emoji-item'>👻</span>
                <span class='emoji-item'>👽</span>
                <span class='emoji-item'>🤖</span>
                <span class='emoji-item'>💩</span>
                <span class='emoji-item'>😺</span>
                <span class='emoji-item'>😸</span>
                <span class='emoji-item'>😹</span>
                <span class='emoji-item'>😻</span>
                <span class='emoji-item'>😼</span>
                <span class='emoji-item'>😽</span>
                <span class='emoji-item'>🙀</span>
                <span class='emoji-item'>😿</span>
                <span class='emoji-item'>😾</span>
            </div>
        </div>
    </div>
</template>
<script>
/*
event: clickEmoji;
 */
export default {
    name: 'ButtonEmoji',
    props: {
        customClass: {
            default: ''
        },
        position: {
            type: String,
            default: 'top'
        }
    },
    data() {
        return {
            actived: false
        }
    },
    methods: {
        deactive(){
            this.actived = false;
        },
        toggleVisible() {
            this.actived = !this.actived
        },
        clickEmoji({ target: { innerText: mark = '', className } }) {
            this.actived = false;
            className.includes('emoji-item') && this.$emit('clickEmoji', mark)
        }
    }
}
</script>
<style lang="scss" scoped>
.component-wrapper {
    position: relative;
    display: inline-block;
}

.btn-emoji {
    height: 100%;
    background-color: inherit;
    border: none;

    &:active {
        color: red;
    }
}

.emoji-item {
    display: inline-block;
    padding: 3px;
    transition: transform 0.1s ease-out;

    &:hover {
        transform: scale(1.5, 1.5)
    }
}

.emoji-box {
    position: absolute;
    width: 0px;
    height: 0px;
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #fff;
    opacity: 0;
    transform: rotateY(30deg);
    transition: opacity 1s ease-out, transform 1s cubic-bezier(0.36, 1.51, 0.74, 1.0);
    user-select: none;

    &.bottom {
        top: 40px;
    }

    &.top {
        top: -210px;
        right: -10px;
    }

    .inner-box {
        white-space: pre-wrap;
        font-size: 20px;
        padding: 10px;
        width: 220px;
        height: 100%;
        overflow-y: auto;
        cursor: pointer;
    }

    &.active {
        height: 200px;
        width: 200px;
        opacity: 1;
        transform: rotate(0);
    }
}
</style>
