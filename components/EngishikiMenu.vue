<template>
  <v-list>
    <v-list-item
      v-for="(item, key) in items"
      :key="key"
      @click="updateTarget(item.id, item.corresp)"
    >
      <v-list-item-content>
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class Content extends Vue {
  @Prop({})
  xml!: any

  items: any[] = []

  get target() {
    return this.$store.getters.getTarget
  }

  set target(value) {
    this.$store.commit('setTarget', value)
  }

  get targetFrom() {
    return this.$store.getters.getTargetFrom
  }

  set targetFrom(value) {
    this.$store.commit('setTargetFrom', value)
  }

  get zone() {
    return this.$store.getters.getZone
  }

  set zone(value) {
    this.$store.commit('setZone', value)
  }

  updateTarget(id: string, corresp: string) {
    const prefixes = ['o-', 'ja-', 'en-']

    // 自分自身を除く
    // let omitPrefix = ''
    for (const p of prefixes) {
      if (id.includes(p)) {
        id = id.replace(p, '')
        // omitPrefix = p
      }
    }

    /*
    // 自分自身を除く
    for (const p of prefixes) {
      if (p === omitPrefix) {
        continue
      }
      this.target = p + id
      break
    }
    */

    this.target = id
    this.targetFrom = ''

    if (corresp) {
      this.zone = corresp.replace('#', '')
    }
  }

  @Watch('xml')
  wachXml() {
    const xml = this.xml
    if (!xml) {
      return
    }

    const items: any[] = []

    const divs: any = xml
      .querySelector('[type="original"]')
      .querySelectorAll('[type="条"]')

    for (const div of divs) {
      const head = div.querySelector('head')

      const n = div.getAttribute('n')
      const ana = head.getAttribute('ana')

      items.push({
        label: n + ' ' + ana,
        id: div.getAttribute('xml:id'),
        corresp: div.getAttribute('corresp'),
      })
    }

    this.items = items
    console.log({ items })
  }
}
</script>
