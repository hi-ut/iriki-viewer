<template>
  <!--
  <iframe
    width="100%"
    height="100%"
    frameBorder="0"
    :src="
      baseUrl +
      `/curation/?manifest=${manifest}&canvas=${encodeURIComponent(canvas)}`
    "
  />
  -->
  <div id="mirador"></div>
</template>

<script>
import Mirador from 'mirador/dist/es/src/index'
import { miradorImageToolsPlugin } from 'mirador-image-tools'

let miradorInstance

export default {
  data() {
    return {
      canvas: '',
    }
  },
  computed: {
    // 算出 getter 関数
    manifest() {
      // `this` は vm インスタンスを指します
      return this.$store.getters.getManifest
    },
    zone() {
      // `this` は vm インスタンスを指します
      return this.$store.getters.getZone
    },
    zones() {
      // `this` は vm インスタンスを指します
      return this.$store.getters.getZones
    },
  },
  watch: {
    zone() {
      this.updateZone()
    },
  },
  mounted() {
    const config = {
      id: 'mirador',
      language: this.$i18n.locale,
      windows: [
        {
          id: 'known-window-id',
          manifestId: this.manifest,
          canvasId: this.canvas,
        },
      ],
      window: {
        allowClose: false,
        allowMaximize: false,
        allowFullscreen: true,
        hideWindowTitle: true,
      },
      workspaceControlPanel: {
        enabled: false,
      },
    }
    miradorInstance = Mirador.viewer(config, [...miradorImageToolsPlugin])

    // this.updateZone()
  },
  methods: {
    updateZone() {
      this.canvas = this.zones[this.zone]

      // We create the action first. Note we are using a specified `windowId` here. This could be accessed from the store instead of specifying upfront.
      const action = Mirador.actions.setCanvas('known-window-id', this.canvas)
      // Now we can dispatch it.
      miradorInstance.store.dispatch(action)
    },
  },
}
</script>
<style>
#mirador {
  height: 100%;
  position: relative;
  width: 100%;
}
</style>
