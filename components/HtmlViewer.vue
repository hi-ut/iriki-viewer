<template>
  <div style="height: 100%; display: flex; flex-direction: column">
    <v-system-bar window>
      <span>{{ $t(title) }}</span>
    </v-system-bar>
    <div
      :id="'container_' + title"
      style="width: 100%; height: 100%"
      :style="`font-size: ${fontSize}%`"
      :class="vertical ? 'scroll vertical' : ''"
      class="pa-2 mb-2"
    >
      <TEI v-if="element.elements" :element="element"></TEI>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import TEI from '~/components/TEI.vue'

@Component({
  components: {
    TEI,
  },
})
export default class Content extends Vue {
  @Prop({ default: 'no' })
  punc!: string

  @Prop({ default: '100' })
  fontSize!: string

  @Prop({})
  element!: any

  @Prop({ default: true })
  vertical!: boolean

  @Prop({ default: '' })
  title!: string

  mounted() {
    const container: any = document.getElementById('container_' + this.title)
    container.addEventListener('wheel', (e: any) => {
      e.preventDefault()
      container.scrollLeft += e.deltaY
    })
  }
}
</script>
