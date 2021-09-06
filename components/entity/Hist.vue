<template>
  <div>
    <h3>Trends</h3>

    <v-btn
      v-if="!display2"
      color="primary"
      class="mt-5"
      @click="display2 = true"
      >表示</v-btn
    >

    <BarChart
      v-if="display2 && display"
      :labels="labels"
      :datasets="datasets"
      x-label="Document segments"
      y-label="Frequency"
    ></BarChart>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'nuxt-property-decorator'
import TEI from '~/components/TEI.vue'
import BarChart from '~/components/BarChart.vue'

@Component({
  name: 'TEI',
  components: {
    TEI,
    BarChart,
  },
})
export default class TEIElements extends Vue {
  @Prop({})
  label!: any

  @Prop({})
  xml!: any

  @Prop({ default: false })
  display!: boolean

  display2: boolean = false

  labels: any[] = []
  datasets: any[] = []

  @Watch('label')
  watchLabel() {
    this.main()
  }

  created() {
    this.main()
  }

  main() {
    const xml = this.xml

    if (!xml) {
      return
    }

    const html = xml.outerHTML

    // 総文字数
    const len = html.length

    // 総文字数を10分割
    const unit = Math.ceil(len / 10)

    const labels: any[] = []
    const data: any[] = []

    for (let i = 0; i < 10; i++) {
      const unitHtml = html.substring(unit * i, unit * (i + 1))
      const size = unitHtml.split('#' + this.label + '"').length - 1

      labels.push(i + 1)
      data.push(size)
    }

    this.labels = labels
    this.datasets = [
      {
        data,
        label: 'Term',
      },
    ]
  }

  get anchorId() {
    return this.$store.getters.getAnchorId
  }

  get anchor() {
    return this.$store.getters.getAnchor
  }

  set anchorId(value) {
    this.$store.commit('setAnchorId', value)
  }

  lines(e: any) {
    const elements = e.elements

    const lines = []
    let es: any = {
      '1': [],
      '2': [],
    }
    let key = '2'
    for (const e of elements) {
      if (e.name === 'lb') {
        lines.push(es)
        lines.push(e)
        es = {
          '1': [],
          '2': [],
        }
        key = '2'
      } else if (e.name === 'milestone') {
        key = '1'
      } else if (e.name === 'space') {
        lines.push(e)
      } else {
        es[key].push(e)
      }
    }
    lines.push(es)

    return lines
  }

  getChoice(element: any) {
    let sic = ''
    let corr = ''
    for (const e of element.elements) {
      if (e.name === 'sic') {
        sic = e.elements[0].text
      } else if (e.name === 'corr') {
        corr = e.elements[0].text
      }
    }
    return { sic, corr }
  }

  get punc() {
    return this.$store.getters.getPunc
  }

  set punc(value) {
    this.$store.commit('setPunc', value)
  }

  get target() {
    return this.$store.getters.getTarget
  }

  set target(value) {
    this.$store.commit('setTarget', value)
  }

  get zone() {
    return this.$store.getters.getZone
  }

  set zone(value) {
    this.$store.commit('setZone', value)
  }

  setTarget(e: any) {
    if (e.attributes && e.attributes.target) {
      this.target = e.attributes.target
        .replace('#', '')
        .replace('o', '')
        .replace('t', '')
    } else if (e.attributes && e.attributes['xml:id']) {
      this.target = e.attributes['xml:id'].replace('o', '').replace('t', '')
    } else {
      this.target = ''
    }
  }

  checkTarget(e: any) {
    if (e && e.attributes && e.attributes.target === '' + this.target) {
      // #
      return true
    } else if (
      e &&
      e.attributes &&
      e.attributes['xml:id'] &&
      e.attributes['xml:id'].replace('o', '').replace('t', '') === this.target
    ) {
      return true
    } else {
      return false
    }
  }

  clickImg(value: string) {
    this.zone = value.replace('#', '')
  }

  getComponent(element: any) {
    if (element.name === 'lb') {
      return 'br'
    } else if (element.name === 'note') {
      return 'div'
    } else if (element.attributes && element.attributes.corresp) {
      return 'div'
    } else {
      return 'span'
    }
  }
}
</script>
<style scoped>
span {
  display: inline-block;
}
</style>
