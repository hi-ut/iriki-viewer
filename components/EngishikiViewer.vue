<template>
  <div
    :id="'container_' + index"
    style="height: 100%"
    :style="`font-size: ${fontSize}%; width: ${width}px;`"
    :class="vertical ? 'vertical' : ''"
    class="pa-2 scroll"
  >
    <TEI
      v-if="element && element.elements"
      :element="element"
      :options="options"
    ></TEI>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'nuxt-property-decorator'
import TEI from '~/components/TEI4Engishiki.vue'
const { scroller } = require('vue-scrollto/src/scrollTo')

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

  @Prop({})
  paneWidth!: number

  @Prop({})
  paneHeight!: number

  @Prop({ default: '' })
  type!: string

  @Prop({ default: '' })
  index!: string

  get target() {
    return this.$store.getters.getTarget
  }

  get targetFrom() {
    return this.$store.getters.getTargetFrom
  }

  get panes2() {
    return this.$store.getters.getPanes2
  }

  get options() {
    return {
      type: this.type,
    }
  }

  width: number = 0
  // height: number = 0

  @Watch('paneWidth', { deep: true })
  watchWidth() {
    const width = (window.innerWidth * 0.99 * this.paneWidth) / 100
    this.width = width
  }

  /*
  @Watch('paneHeight', { deep: true })
  watchHeight() {
    const height = (window.innerHeight * 1 * this.paneHeight) / 100
    this.height = height
  }
  */

  // @Watch('vertical')
  watchVertical() {
    const container: any = document.getElementById('container_' + this.index)
    container.addEventListener('wheel', (e: any) => {
      // e.preventDefault()
      container.scrollLeft -= e.deltaY
    })
    /*
    if (this.vertical) {
      container.addEventListener('wheel', (e: any) => {
        // e.preventDefault()
        container.scrollLeft -= e.deltaY
      })
    } else {
      container.addEventListener('wheel', (e: any) => {
        // e.preventDefault()
      })
    }
    */
  }

  mounted() {
    this.watchVertical()

    this.watchWidth()
    // this.watchHeight()
  }

  @Watch('target')
  wachTarget() {
    this.scroll()
  }

  scroll() {
    const target = this.target

    const targetFrom = this.targetFrom

    /*
    const prefixes = ['o-', 'ja-', 'en-']
    let targetWithoutPrefix = target
    for (const prefix of prefixes) {
      targetWithoutPrefix = targetWithoutPrefix.replace(prefix, '')
    }
    */

    // const title = this.title

    const title = this.type

    // 起点の場合
    if (title === targetFrom) {
      return
    }

    const index = this.index

    const prefix = title + '-' // ''

    /*
    switch (title) {
      case '校訂文':
        prefix = 'o-'
        break
      case '現代語訳':
        prefix = 'ja-'
        break
      case '英訳':
        prefix = 'en-'
        break
    }

    if (target.includes(prefix)) {
      // return
    }
    */

    const targetWithPrefix = prefix + target // targetWithoutPrefix

    const containerDiv: any = document.querySelector('#container_' + index)

    const idDiv: any = document.querySelector('#' + targetWithPrefix)

    /// /

    let options: any = null

    if (this.vertical) {
      const containerDivWidth = containerDiv.getBoundingClientRect().width

      const idDivWidth = idDiv ? idDiv.getBoundingClientRect().width : 0

      options = {
        container: '#container_' + index,
        offset: -1 * containerDivWidth + idDivWidth,
        x: true,
      }
    } else {
      options = {
        container: '#container_' + index,
        y: true,
      }
    }

    const scrollTo = scroller()
    scrollTo('#' + targetWithPrefix, 500, options)
  }
}
</script>
<style>
.scroll {
  overflow-y: auto;

  /* overflow-x: auto; */
}

.vertical {
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
  font-size: 18px;
}

.warichu {
  display: inline-table;
  -webkit-writing-mode: vertical-lr;
  vertical-align: top;
}
.warichu-left,
.warichu-right {
  font-size: 50%;
  display: table-row;
}
</style>
