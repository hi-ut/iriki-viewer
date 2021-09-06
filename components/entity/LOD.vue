<template>
  <div v-if="label2">
    <v-row>
      <v-col cols="12" sm="3">
        <!-- query, -->
        <v-img
          contain
          max-height="150"
          style="height: 150px"
          width="100%"
          class="grey lighten-2"
          :src="'https://www.rekihaku.ac.jp/outline/img/symbolmark.jpg'"
        />
      </v-col>
      <v-col cols="12" sm="9">
        <!--
        <h3>
          <nuxt-link
            :to="
              localePath({
                name: 'item-id',
              })
            "
            >{{ label2 }}</nuxt-link
          >
        </h3>
        -->

        <div class="my-2">
          {{ desc.length > 500 ? desc.substring(0, 500) + '...' : desc }}
          <template v-if="desc">
            <br />（<a target="_blank" :href="url">コトバンク</a>より）
          </template>
        </div>
        <div class="text-left">
          <v-btn
            icon
            class="ma-1"
            target="_blank"
            :href="baseUrl + '/entity/' + label + '.json'"
            ><img :src="baseUrl + '/img/icons/rdf-logo.svg'" width="32px"
          /></v-btn>
          <!--
          <ResultOption
            :item="{
              label: item.label,
              url: localePath({
                name: 'item-id',
                params: { id: item.objectID },
              }),
            }"
          />
          -->
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'nuxt-property-decorator'
import axios from 'axios'
import TEI from '~/components/TEI.vue'

@Component({
  name: 'TEI',
  components: {
    TEI,
  },
})
export default class TEIElements extends Vue {
  @Prop({})
  label!: string

  label2: string = ''

  desc: string = ''

  url: string = ''

  @Watch('label')
  watchLabel() {
    this.main()
  }

  baseUrl: any = process.env.BASE_URL

  mounted() {
    this.main()
  }

  async main() {
    this.label2 = ''
    this.desc = ''

    let data = null
    try {
      const df = await axios.get(
        this.baseUrl + '/entity/' + this.label + '.json'
      )
      data = df.data
    } catch (error) {}

    if (data && data.length > 0) {
      const item = data[0]

      const label =
        item['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value']

      this.label2 = label

      let desc = ''
      const e: any = item['http://schema.org/description']
      if (e) {
        desc = e[0]['@value']
      }

      this.desc = desc

      const url = item['http://schema.org/url'][0]['@id']

      this.url = url
    }
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
