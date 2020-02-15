# 通用审核组件

```
<audit-component :config="auditConfig" @submit="auditHandler"></audit-component>

<script>
export default {
  data() {
    return {
      auditConfig: {
        btnText: '审核',
        radioList: [
          {
            value: 2,
            text: '通过'
          },
          {
            value: 0,
            text: '拒绝'
          }
        ],
        cancelRadio: 0,
        textAreaTips: '请输入拒绝原因'
      }
    }
  },
  methods: {
    auditHandler() {
      // todo
    }
  }
}
</script>
```