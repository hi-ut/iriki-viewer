<template>
  <iframe
    width="100%"
    height="100%"
    frameBorder="0"
    :src="
      baseUrl +
      `/curation/?manifest=${manifest}&canvas=${encodeURIComponent(canvas)}`
    "
  />
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class Content extends Vue {
  baseUrl: any = process.env.BASE_URL

  @Watch('zone')
  onChangeZone() {
    this.canvas = this.zones[this.zone]
  }

  get manifest() {
    return this.$store.getters.getManifest
  }

  // manifest: string = this.baseUrl + '/manifest.json'

  get canvas() {
    return this.$store.getters.getCanvas
  }

  set canvas(value) {
    this.$store.commit('setCanvas', value)
  }

  get zone() {
    return this.$store.getters.getZone
  }

  get zones() {
    return this.$store.getters.getZones
  }
}
</script>
