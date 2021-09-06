<template>
  <div style="height: 100%; display: flex; flex-direction: column">
    <v-system-bar window>
      <span>{{ $t(label) }}</span>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template #activator="{ on }">
          <v-btn class="my-2" x-small depressed btn v-on="on">
            <v-icon style="margin: 0.1px" v-on="on">mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(value, key) in options"
            :key="key"
            @click="changePaneId(value)"
          >
            <v-list-item-title>{{ $t(value.label) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-system-bar>
    <component
      :is="pane.component"
      :index="`${row}-${col}`"
      :pane-width="pane.width"
      :pane-height="pane.height"
      v-bind="pane.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
// import ImageViewer from '~/components/ImageViewer.vue'
import HtmlViewer from '~/components/HtmlViewer.vue'
import Ace from '~/components/Ace.vue'

@Component({
  components: {
    // ImageViewer,
    HtmlViewer,
    Ace,
  },
})
export default class Content extends Vue {
  @Prop({})
  row!: number

  @Prop({})
  col!: number

  settingsDialog: boolean = false

  fontSize: string = '100'

  get options() {
    return this.$store.getters.getOptions
  }

  @Prop({})
  pane!: any

  get label() {
    return this.pane.label
  }

  get punc() {
    return this.$store.getters.getPunc
  }

  set punc(value) {
    this.$store.commit('setPunc', value)
  }

  get panes2() {
    return this.$store.getters.getPanes2
  }

  set panes2(value) {
    this.$store.commit('setPanes2', value)
  }

  get contents() {
    return this.$store.getters.getContents
  }

  set contents(value) {
    this.$store.commit('setContents', value)
  }

  changePaneId(value: any) {
    const panes2 = JSON.parse(JSON.stringify(this.panes2))
    const pane: any = panes2.matrix[this.row][this.col]

    pane.component = value.component
    pane.props = value.props
    pane.label = value.label

    this.panes2 = panes2
  }
}
</script>
