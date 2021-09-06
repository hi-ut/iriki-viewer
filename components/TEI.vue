<template>
  <component :is="getComponent(element)">
    <template v-if="element.attributes && element.attributes.corresp">
      <br />
      <v-btn icon @click="clickImg(element.attributes.corresp)"
        ><v-icon>mdi-image</v-icon></v-btn
      >
    </template>

    <!-- 独立 -->

    <template v-if="element.text">
      {{ element.text }}
    </template>
    <template v-else-if="element.name === 'choice'">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <span class="primary--text" v-bind="attrs" v-on="on">{{
            getChoice(element).corr
          }}</span>
        </template>
        <span>{{ getChoice(element).sic }}</span>
      </v-tooltip>
    </template>
    <template v-else-if="element.name === 'note'">
      <v-card
        flat
        outlined
        class="pa-2 ma-2"
        :class="
          element.attributes && element.attributes.target === anchorId
            ? 'yellow lighten-3'
            : ''
        "
      >
        <div>
          <template v-if="element.attributes && element.attributes.type">
            <b> {{ element.attributes.type }} </b>
          </template>

          <template v-if="element.attributes && element.attributes.subtype">
            <b> {{ element.attributes.subtype }} </b>
          </template>
        </div>

        <!--'#' + -->
        <TEI v-for="(e, key) in element.elements" :key="key" :element="e">
        </TEI>
      </v-card>
    </template>
    <template v-else-if="element.name === 'a'">
      <a target="_blank" :href="element.attributes.href">
        <TEI v-for="(e, key) in element.elements" :key="key" :element="e">
        </TEI>
      </a>
    </template>
    <template v-else-if="element.name === 'space'">
      <span v-for="i in Number(element.attributes.n)" :key="`space-${i}`"
        >&emsp;</span
      >
    </template>
    <!-- <template v-else-if="element.name === 'lb'"> <br /></template> -->
    <template v-else-if="element.name === 'seg'">
      <span
        :class="checkTarget(element) ? 'primary lighten-5' : ''"
        @mouseover="setTarget(element)"
      >
        <TEI v-for="(e, key) in element.elements" :key="key" :element="e">
        </TEI>
      </span>
    </template>
    <template v-else-if="element.name === 'add'">
      <span v-if="punc != 'no'" class="success--text">
        <TEI v-for="(e, key) in element.elements" :key="key" :element="e">
        </TEI>
      </span>
    </template>
    <template v-else-if="element.name === 'anchor' && anchor">
      <v-icon
        style="cursor: pointer"
        small
        class="my-1 error--text"
        @mouseover="anchorId = element.attributes['xml:id']"
        @mouseleave="
          anchorId == element.attributes['xml:id'] ? (anchorId = '') : pass
        "
        >mdi-anchor</v-icon
      >
    </template>

    <template v-else-if="element.name === 'wari'">
      <template v-for="(line, key2) in lines(element)">
        <!-- warichu, lb -->
        <template v-if="line.name === 'lb'">
          <br :key="`br-${key2}`" />
        </template>

        <!-- warichu, space -->
        <template v-else-if="line.name === 'space'">
          <span
            v-for="i in Number(line.attributes.n)"
            :key="`space-${key2}-${i}`"
            >&emsp;</span
          >
        </template>
        <template v-else>
          <span :key="`${key2}`" class="warichu">
            <template v-for="(e2, key3) in line">
              <span
                :key="`${key2}-${key3}`"
                :class="key3 === '1' ? 'warichu-right' : 'warichu-left'"
              >
                <TEI
                  v-for="(e3, key4) in e2"
                  :key="`${key2}-${key3}-${key4}`"
                  :element="e3"
                >
                </TEI>
              </span>
            </template>
          </span>
        </template>
      </template>
    </template>

    <template v-else>
      <template v-for="(e, key) in element.elements">
        <TEI :key="key" :element="e"></TEI>
      </template>
    </template>
  </component>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import TEI from '~/components/TEI.vue'

@Component({
  name: 'TEI',
  components: {
    TEI,
  },
})
export default class TEIElements extends Vue {
  @Prop({})
  element!: any

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
