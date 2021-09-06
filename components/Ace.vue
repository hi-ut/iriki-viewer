<template>
  <div ref="ace" class="ace"></div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from 'nuxt-property-decorator'
import ace from 'ace-builds'
import 'ace-builds/webpack-resolver'

// 使いたい言語モードのインポート
import 'ace-builds/src-noconflict/mode-javascript'

// 使いたいテーマのインポート
import 'ace-builds/src-noconflict/theme-github'

@Component({
  components: {},
})
export default class Ace extends Vue {
  editor: Object = {}
  content: string = ''

  @Prop({ default: '' })
  value!: string

  @Prop({ default: '' })
  label!: string

  get contents(): any {
    return this.$store.getters.getContents
  }

  get text(): string {
    return this.contents[this.label]
  }

  set text(value) {
    const contents = JSON.parse(JSON.stringify(this.contents))
    contents[this.label] = value
    this.$store.commit('setContents', contents)
  }

  @Watch('panes2')
  onPaneChanged() {
    ;(this as any).editor.resize()
  }

  tmp: string = ''

  mounted() {
    const editor: any = ace.edit((this as any).$refs.ace)
    editor.session.setMode('ace/mode/xml')
    editor.getSession().setUseWrapMode(true)
    editor.session.setValue(this.value)

    const self = this
    editor.getSession().on('change', function () {
      self.text = editor.getSession().getValue()
    })

    this.editor = editor
  }

  get panes2() {
    return this.$store.getters.getPanes2
  }
}
</script>
<style scoped>
.ace {
  height: 90%;
  width: 100%;
}
</style>
