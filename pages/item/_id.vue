<template>
  <div>
    <v-navigation-drawer v-model="drawer" app :temporary="true" width="300">
      <EngishikiMenu :xml="xml" />
    </v-navigation-drawer>

    <v-app-bar id="bar" dark flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <!--
        <nuxt-link
          :to="
            localePath({
              name: 'index',
            })
          "
          style="color: inherit; text-decoration: inherit"
        >
          
        </nuxt-link>
        -->
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        v-if="name"
        class="mx-1"
        color="success"
        @click="tagDialog = !tagDialog"
      >
        <v-icon class="mr-1">mdi-tag</v-icon> {{ name }}
      </v-btn>

      <v-tooltip v-if="loading || initHash" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            :loading="loading"
            class="mx-1"
            color="grey"
            v-on="on"
            @click="target = initHash"
          >
            <v-icon class="mr-1">mdi-refresh</v-icon> {{ $t('init') }}
          </v-btn>
        </template>
        <span>{{ $t('読み込み時の状態に戻す。') }}</span>
      </v-tooltip>

      <v-btn class="mx-1" color="grey" target="_blank" :href="u">
        <v-icon class="mr-1">mdi-download</v-icon> {{ $t('download') }}
      </v-btn>

      <v-btn
        class="mx-1"
        color="grey"
        @click="settingsDialog = !settingsDialog"
      >
        <v-icon class="mr-1">mdi-cog</v-icon> {{ $t('Settings') }}
      </v-btn>

      <v-btn
        class="mx-1"
        color="grey"
        target="_blank"
        :to="localePath({ name: 'page-slug', params: { slug: 'help' } })"
      >
        <v-icon class="mr-1">mdi-help-circle</v-icon> {{ $t('help') }}
      </v-btn>

      <v-menu offset-y>
        <template #activator="{ on }">
          <v-btn class="mx-1" depressed btn v-on="on">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :to="switchLocalePath('ja')">
            <v-list-item-title>日本語</v-list-item-title>
          </v-list-item>
          <v-list-item :to="switchLocalePath('en')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- main -->

    <splitpanes
      v-if="Object.keys(panes2).length > 0"
      class="default-theme"
      :style="`height: ${height - barHeight}px`"
      @resize="resizeVertical($event, -1)"
    >
      <template v-for="c in col">
        <pane
          v-if="panes2.matrix[0][c - 1]"
          :key="c"
          :size="panes2.matrix[0][c - 1].width"
        >
          <splitpanes
            horizontal
            class="default-theme"
            @resize="resizeHorizontal($event, c - 1)"
          >
            <pane
              v-for="r in row"
              :key="r"
              :size="panes2.matrix[r - 1][c - 1].height"
            >
              <Content
                :row="r - 1"
                :col="c - 1"
                :pane="panes2.matrix[r - 1][c - 1]"
              ></Content>
            </pane>
          </splitpanes>
        </pane>
      </template>
    </splitpanes>

    <!-- dialog -->
    <v-dialog v-model="settingsDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ $t('Settings') }}
        </v-card-title>

        <v-card-text class="mt-5">
          <v-radio-group v-model="ner">
            <template v-slot:label>
              <div>固有表現</div>
            </template>
            <v-radio :value="true">
              <template v-slot:label>
                <div>表示する</div>
              </template>
            </v-radio>
            <v-radio :value="false">
              <template v-slot:label>
                <div>表示しない</div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="settingsDialog = false">
            {{ $t('Close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialog -->
    <v-dialog v-model="tagDialog">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ name }}
        </v-card-title>

        <div class="pa-5">
          <LOD :label="name" class="mb-10"></LOD>
          <Hist
            :label="name"
            :display="tagDialog"
            :xml="xml ? xml.querySelector('div[type=\'original\']') : null"
          ></Hist>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="tagDialog = false">
            {{ $t('Close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'

import Content from '~/components/Content.vue'
import 'splitpanes/dist/splitpanes.css'
import EngishikiMenu from '~/components/EngishikiMenu.vue'

import LOD from '~/components/entity/LOD.vue'
import Hist from '~/components/entity/Hist.vue'

const { Splitpanes, Pane } = require('splitpanes')

const convert = require('xml-js')

@Component({
  components: {
    LOD,
    Hist,
    EngishikiMenu,
    Splitpanes,
    Pane,
    Content,
  },
  layout: 'empty',
})
export default class Item extends Vue {
  title: any = process.env.siteName

  drawer: boolean = false

  settingsDialog: boolean = false

  tagDialog: boolean = false

  // id: any = this.$route.params.id

  loading: boolean = false
  snackbar: boolean = false

  row: number = 2
  col: number = 2
  splitType: string = 'col' // 'col'

  savedPanes: any = {}

  vertical: boolean = true

  u: string = ''

  height: number = window.innerHeight
  // width: number = window.innerWidth

  barHeight: number = 0

  paramId: any = null

  initHash: any = null

  get xml() {
    return this.$store.getters.getXml
  }

  set xml(value) {
    this.$store.commit('setXml', value)
  }

  get target() {
    return this.$store.getters.getTarget
  }

  set target(value) {
    this.$store.commit('setTarget', value)
  }

  get ner() {
    return this.$store.getters.getNer
  }

  set ner(value) {
    this.$store.commit('setNer', value)
  }

  get name() {
    return this.$store.getters.getName
  }

  get contents() {
    return this.$store.getters.getContents
  }

  set contents(value) {
    this.$store.commit('setContents', value)
  }

  get manifest() {
    return this.$store.getters.getManifest
  }

  set manifest(value) {
    this.$store.commit('setManifest', value)
  }

  get canvas() {
    return this.$store.getters.getCanvas
  }

  set canvas(value) {
    this.$store.commit('setCanvas', value)
  }

  get zone() {
    return this.$store.getters.getZone
  }

  set zone(value) {
    this.$store.commit('setZone', value)
  }

  get zones() {
    return this.$store.getters.getZones
  }

  set zones(value) {
    this.$store.commit('setZones', value)
  }

  get panes2() {
    return this.$store.getters.getPanes2
  }

  set panes2(value) {
    this.$store.commit('setPanes2', value)
  }

  get options() {
    return this.$store.getters.getOptions
  }

  set options(value) {
    this.$store.commit('setOptions', value)
  }

  async created() {
    this.loading = true

    this.zone = ''
    // this.target = ''

    /// ///

    const query: any = this.$route.query

    const paramId = this.$route.params.id

    if (paramId === '1') {
      // paramId = '17'
    }

    this.paramId = paramId

    // 以下、データの取得

    query.u = process.env.BASE_URL + `/${paramId}.xml`
    this.u = query.u

    const res = await axios.get(query.u)

    const parser = new window.DOMParser()
    const xmlData = parser.parseFromString(res.data, 'text/xml')
    this.xml = xmlData

    const title: any = xmlData.querySelector('title')
    this.title = title.textContent

    const facsimile: any = xmlData.querySelector('facsimile')

    const source = facsimile.getAttribute('source')

    const surfaces: any = xmlData.querySelectorAll('surface')

    const zones2: any = {}

    for (const surface of surfaces) {
      const canvas = surface.getAttribute('source')
      const zones = surface.querySelectorAll('zone')
      for (const zone of zones) {
        const id = zone.getAttribute('xml:id')

        if (zone.getAttribute('ulx')) {
          const ulx = Number(zone.getAttribute('ulx'))
          const uly = Number(zone.getAttribute('uly'))
          const lrx = Number(zone.getAttribute('lrx'))
          const lry = Number(zone.getAttribute('lry'))

          const x = ulx
          const y = uly
          const w = lrx - x
          const h = lry - y
          zones2[id] = canvas + '#xywh=' + x + ',' + y + ',' + w + ',' + h
        } else {
          zones2[id] = canvas
        }
      }
    }

    this.zones = zones2

    let original: any = xmlData.querySelector('div[type="original"]')

    original = JSON.parse(
      convert.xml2json(original.outerHTML, {
        compact: false,
        spaces: 4,
      })
    )

    let japanese: any = xmlData.querySelector('div[type="japanese"]')

    if (japanese) {
      japanese = JSON.parse(
        convert.xml2json(japanese.outerHTML, {
          compact: false,
          spaces: 4,
        })
      )
    }

    let english: any = xmlData.querySelector('div[type="english"]')

    if (english) {
      english = JSON.parse(
        convert.xml2json(english.outerHTML, {
          compact: false,
          spaces: 4,
        })
      )
    }

    /// ///////////

    // 初期ペインの設定

    let panes2: any = {}

    if (query.type === 'full') {
      panes2 = {
        type: 'row',
        matrix: [
          [
            {
              width: 50,
              height: 50,
              label: 'image',
              component: 'MiradorViewer',
            },

            {
              width: 50,
              height: 50,
              label: 'original',
              component: 'EngishikiViewer',
              props: {
                element: original,
                type: 'o',
              },
            },
          ],
          [
            {
              width: 50,
              height: 50,
              label: 'english',
              component: 'EngishikiViewer',
              props: {
                element: english,
                type: 'en',
                vertical: false,
              },
            },
            {
              width: 50,
              height: 50,
              label: 'japanese',
              component: 'EngishikiViewer',
              props: {
                element: japanese,
                type: 'ja',
              },
            },
          ],
        ],
      }
    } else {
      panes2 = {
        type: 'row',
        matrix: [
          [
            {
              width: 40,
              height: 70,
              component: 'MiradorViewer',
              label: 'image',
            },

            {
              width: 60,
              height: 50,
              component: 'EngishikiViewer',
              label: 'original',
              props: {
                element: original,
                type: 'o',
              },
            },
          ],
          [
            {
              width: 40,
              height: 30,
              label: 'リスト',
              component: 'List',
              props: {
                element: original,
                type: 'o',
                vertical: false,
              },
            },
            {
              width: 60,
              height: 50,
              component: 'EngishikiViewer',
              label: 'english',
              props: {
                element: english,
                type: 'en',
                vertical: false,
              },
            },
          ],
        ],
      }
    }
    /*
    } else if (this.$i18n.locale === 'en') {
      panes2 = {
        type: 'row',
        matrix: [
          [
            {
              width: 40,
              height: 100,
              label: 'image',
              component: 'MiradorViewer',
            },

            {
              width: 60,
              height: 50,
              label: 'original',
              component: 'EngishikiViewer',
              props: {
                element: original,
                type: 'o',
              },
            },
          ],
          [
            { width: 40, height: 0 },

            {
              width: 60,
              height: 50,
              label: 'english',
              component: 'EngishikiViewer',
              props: {
                element: english,
                type: 'en',
                vertical: false,
              },
            },
          ],
        ],
      }
    } else {
      panes2 = {
        type: 'row',
        matrix: [
          [
            {
              width: 40,
              height: 100,
              component: 'MiradorViewer',
              label: 'image',
            },

            {
              width: 60,
              height: 50,
              component: 'EngishikiViewer',
              label: 'original',
              props: {
                element: original,
                type: 'o',
              },
            },
          ],
          [
            { width: 40, height: 0 },
            {
              width: 60,
              height: 50,
              component: 'EngishikiViewer',
              label: 'japanese',
              props: {
                element: japanese,
                type: 'ja',
              },
            },
          ],
        ],
      }
    }
    */

    this.options = [
      {
        label: 'original',
        component: 'EngishikiViewer',
        props: {
          element: original,
          type: 'o',
        },
      },
      {
        label: 'japanese',
        component: 'EngishikiViewer',
        props: {
          element: japanese,
          type: 'ja',
        },
      },
      {
        label: 'english',
        component: 'EngishikiViewer',
        props: {
          element: english,
          type: 'en',
          vertical: false,
        },
      },
      {
        label: 'image',
        component: 'MiradorViewer',
      },
      {
        label: 'リスト',
        component: 'List',
      },
      /*
      {
        label: 'ICV',
        component: 'ICViewer',
      },
      */
    ]

    this.panes2 = panes2

    // 要検討！！！
    this.manifest = source

    // ページ内遷移
    const self = this
    window.setTimeout(function () {
      // self.target = null
      self.loading = false
      const hash = self.$route.hash.replace('#', '')
      self.initHash = hash
      self.target = hash

      const div: any = xmlData.querySelector(
        `div[n="${hash.replace('_', '.')}"]`
      )

      if (div && div.getAttribute('corresp')) {
        self.zone = div.getAttribute('corresp').replace('#', '')
      }
    }, 2000)
  }

  mounted() {
    const bar: any = document.getElementById('bar')
    if (bar) {
      this.barHeight = bar.clientHeight
    }

    window.addEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.height = window.innerHeight
    // this.width = window.innerWidth

    const panes2 = JSON.parse(JSON.stringify(this.panes2))

    const width = window.innerHeight
    const height = window.innerWidth

    panes2.width = width
    panes2.height = height

    this.panes2 = panes2
  }

  updatePanes() {
    const panes2 = JSON.parse(JSON.stringify(this.panes2))

    const panes3: any[] = []

    for (let i = 0; i < this.row; i++) {
      panes3[i] = []
      for (let j = 0; j < this.col; j++) {
        panes3[i][j] =
          panes2.length > i && panes2[i].length > j ? panes2[i][j] : {}
      }
    }

    this.panes2 = panes3
  }

  @Watch('target')
  watchTarget() {
    this.$router.push(
      this.localePath({
        name: 'item-id',
        query: this.$route.query,
        params: {
          id: this.paramId,
        },
        hash: '#' + this.target,
      }),
      () => {},
      () => {}
    )
  }

  resizeVertical(e: any, index: number) {
    const panes2 = JSON.parse(JSON.stringify(this.panes2))

    if (index === -1) {
      for (let i = 0; i < this.row; i++) {
        for (let j = 0; j < this.col; j++) {
          panes2.matrix[i][j].width = e[j].size
        }
      }
    } else {
      const target = panes2.matrix[index]
      for (let j = 0; j < this.col; j++) {
        target[j].width = e[j].size
      }
    }

    this.panes2 = panes2
  }

  resizeHorizontal(e: any, index: number) {
    const panes2 = JSON.parse(JSON.stringify(this.panes2))

    if (index === -1) {
      for (let i = 0; i < this.row; i++) {
        for (let j = 0; j < this.col; j++) {
          panes2.matrix[i][j].height = e[i].size
        }
      }
    } else {
      for (let i = 0; i < this.row; i++) {
        panes2.matrix[i][index].height = e[i].size
      }
    }

    this.panes2 = panes2
  }

  //
}
</script>
