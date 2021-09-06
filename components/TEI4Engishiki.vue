<template>
  <component :is="getComponent(element)">
    <template
      v-if="
        element.name === 'pb' &&
        element.attributes &&
        element.attributes.corresp
      "
    >
      <div class="ml-2">
        <v-btn icon @click="clickImg(element.attributes.corresp)"
          ><v-icon>mdi-image</v-icon></v-btn
        >

        <span style="color: #9e9e9e">[{{ element.attributes.corresp }}]</span>
      </div>
    </template>

    <!--
    <template v-if="element.attributes && element.attributes.corresp">
      <br />
      <v-btn icon @click="clickImg(element.attributes.corresp)"
        ><v-icon>mdi-image</v-icon></v-btn
      >
    </template>
    -->

    <!-- 独立 -->

    <template v-if="element.text">
      {{ element.text }}
    </template>
    <template
      v-if="
        element.name === 'seg' &&
        element.attributes &&
        element.attributes['xml:id']
      "
    >
      <span style="cursor: pointer" class="primary--text">
        <!--
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <template v-for="(e, key) in element.elements">
                <TEI :key="key" :element="e" :options="options"> </TEI>
              </template>
            </span>
          </template>
          <span>aaaaa</span>
        </v-tooltip>
        -->
        <v-menu v-model="menu2" offset-x offset-y :max-width="400">
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <template v-for="(e, key) in element.elements">
                <TEI :key="key" :element="e" :options="options"> </TEI>
              </template>
            </span>
          </template>

          <v-card>
            <div class="pa-5">{{ getNote(element.attributes['xml:id']) }}</div>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text color="primary" @click="menu2 = false">
                {{ $t('close') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </span>
    </template>
    <template v-else-if="element.name === 'app'">
      <span
        style="cursor: pointer"
        :style="
          element.attributes && element.attributes.type === '標注'
            ? 'color: #9C27B0'
            : 'color: #f44336'
        "
      >
        <template
          v-if="element.attributes && element.attributes.type === '標注'"
        >
          「
        </template>
        <v-menu v-model="menu" offset-x :max-width="400">
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <template v-for="(e, key) in element.elements">
                <TEI
                  v-if="e.name === 'lem'"
                  :key="key"
                  :element="e"
                  :options="options"
                >
                </TEI>
              </template>
            </span>
          </template>

          <v-card>
            <div class="pa-5">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>element</th>
                      <th>wit</th>
                      <th>value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(e, key) in element.elements" :key="key">
                      <td class="pa-2">{{ e.name }}</td>
                      <td class="pa-2">
                        {{
                          e.attributes && e.attributes.wit
                            ? e.attributes.wit
                            : ''
                        }}
                      </td>
                      <td class="pa-2">
                        <TEI :element="e" :options="options"> </TEI>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text color="primary" @click="menu = false">
                {{ $t('close') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <template
          v-if="element.attributes && element.attributes.type === '標注'"
        >
          」
        </template>
      </span>
    </template>
    <template v-else-if="element.name === 'head'">
      <template v-if="element.attributes && element.attributes.ana">
        <h3 :id="parent.attributes['xml:id']" class="pr-5 pt-5 pl-2 pb-2">
          <!--
          <v-btn
            v-if="parent.attributes.corresp"
            icon
            @click="clickImg(parent.attributes.corresp)"
            ><v-icon small style="color: #9c27b0">mdi-image</v-icon></v-btn
          >
          -->
          <span
            style="cursor: pointer"
            @click="
              setTarget(parent)
              parent.attributes.corresp
                ? clickImg(parent.attributes.corresp)
                : ''
            "
          >
            <template v-if="options.type === 'ja'">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    【
                    <template v-if="parent && parent.attributes">
                      {{ parent.attributes.n }}
                    </template>
                    {{ element.attributes.ana }}
                    】
                  </span>
                </template>
                <span>{{ parent.elements[1].elements[0].text }}</span>
              </v-tooltip>
            </template>
            <template v-else>
              【
              <template v-if="parent && parent.attributes">
                {{ parent.attributes.n }}
              </template>
              <template v-if="options.type !== 'en'">
                {{ element.attributes.ana }}</template
              >
              】
              <template v-if="options.type === 'en'">
                {{ parent.elements[1].elements[0].text }}
              </template>
            </template>
          </span>
        </h3>
      </template>
      <template v-else>
        <h2>
          <template v-if="parent && parent.attributes">
            {{ parent.attributes.n }}
          </template>

          <TEI
            v-for="(e, key) in element.elements"
            :key="key"
            :element="e"
            :parent="element"
            :options="options"
          >
          </TEI>
        </h2>
      </template>
    </template>

    <template
      v-else-if="element.attributes && element.attributes.type === 'summary'"
    >
      <div
        v-if="options.type !== 'ja' && false"
        style="color: #4caf50"
        class="pb-2 pr-2"
      >
        <TEI
          v-for="(e, key) in element.elements"
          :key="key"
          :element="e"
          :parent="element"
          :options="options"
        >
        </TEI>
      </div>
    </template>

    <template
      v-else-if="
        element.name === 'emph' &&
        element.attributes &&
        element.attributes.rend === 'italic'
      "
    >
      <i>
        <TEI
          v-for="(e, key) in element.elements"
          :key="key"
          :element="e"
          :parent="element"
          :options="options"
        >
        </TEI>
      </i>
    </template>

    <template v-else-if="element.name === 'persName'">
      <span
        style="cursor: pointer"
        class="error--text"
        @mouseover="setPersonId(element)"
        @mouseleave="removePersonId()"
      >
        <TEI
          v-for="(e, key) in element.elements"
          :key="key"
          :element="e"
          :parent="element"
        >
        </TEI>
      </span>
    </template>

    <template v-else-if="element.name === 'date'">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <span
            style="cursor: pointer; color: #9c27b0"
            v-bind="attrs"
            v-on="on"
          >
            <TEI
              v-for="(e, key) in element.elements"
              :key="key"
              :element="e"
              :parent="element"
            >
            </TEI>
          </span>
        </template>
        <span>{{ element.attributes ? element.attributes.when : '' }}</span>
      </v-tooltip>
    </template>

    <template v-else-if="element.name === 'name' && ner">
      <span style="color: #4caf50" @click="setName(element)">
        <TEI
          v-for="(e, key) in element.elements"
          :key="key"
          :element="e"
          :parent="element"
          :options="options"
        >
        </TEI>
      </span>
    </template>

    <template v-else-if="element.attributes && element.attributes.ana === '項'">
      <div
        :id="element.attributes['xml:id']"
        style="cursor: pointer"
        :class="
          /*checkTarget(element) || */ checkHoverTarget(element)
            ? 'primary lighten-5'
            : ''
        "
        @click="setTarget(element)"
        @mouseover="setHoverTarget(element)"
        @mouseleave="removeHoverTarget()"
      >
        <TEI
          v-for="(e, key) in element.elements"
          :key="key"
          :element="e"
          :parent="element"
          :options="options"
        >
        </TEI>
      </div>
    </template>

    <!--
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

        <template v-if="line.name === 'lb'">
          <br :key="`br-${key2}`" />
        </template>


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
    -->

    <template v-else-if="element.name === 'note' && options.type === 'en'">
      <!-- skip -->
    </template>

    <template v-else>
      <template v-for="(e, key) in element.elements">
        <TEI :key="key" :element="e" :parent="element" :options="options"></TEI>
      </template>
    </template>
  </component>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import TEI from '~/components/TEI4Engishiki.vue'

@Component({
  name: 'TEI',
  components: {
    TEI,
  },
})
export default class TEIElements extends Vue {
  @Prop({})
  element!: any

  @Prop({})
  parent!: any

  @Prop({})
  options!: any

  menu: boolean = false
  menu2: boolean = false

  get anchorId() {
    return this.$store.getters.getAnchorId
  }

  get anchor() {
    return this.$store.getters.getAnchor
  }

  set anchorId(value) {
    this.$store.commit('setAnchorId', value)
  }

  get ner() {
    return this.$store.getters.getNer
  }

  set ner(value) {
    this.$store.commit('setNer', value)
  }

  get xml() {
    return this.$store.getters.getXml
  }

  get personId() {
    return this.$store.getters.getPersonId
  }

  set personId(value) {
    this.$store.commit('setPersonId', value)
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

  get targetFrom() {
    return this.$store.getters.getTargetFrom
  }

  set targetFrom(value) {
    this.$store.commit('setTargetFrom', value)
  }

  get hoverTarget() {
    return this.$store.getters.getHoverTarget
  }

  set hoverTarget(value) {
    this.$store.commit('setHoverTarget', value)
  }

  get zone() {
    return this.$store.getters.getZone
  }

  set zone(value) {
    this.$store.commit('setZone', value)
  }

  get name() {
    return this.$store.getters.getName
  }

  set name(value) {
    this.$store.commit('setName', value)
  }

  setTarget(e: any) {
    const prefixes = ['o-', 'ja-', 'en-']
    if (e.attributes && e.attributes['xml:id']) {
      let id = e.attributes['xml:id']

      let targetFrom = ''

      for (const prefix of prefixes) {
        if (id.includes(prefix)) {
          id = id.replace(prefix, '')
          targetFrom = prefix.replace('-', '')
        }
      }

      this.target = id
      this.targetFrom = targetFrom
    } else {
      this.target = ''
      this.targetFrom = ''
    }
  }

  checkTarget(e: any) {
    const prefixes = ['o-', 'ja-', 'en-']

    let target = this.target
    for (const prefix of prefixes) {
      target = target.replace(prefix, '')
    }

    if (e && e.attributes && e.attributes['xml:id']) {
      let id = e.attributes['xml:id']

      for (const prefix of prefixes) {
        id = id.replace(prefix, '')
      }

      if (id === target) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  setHoverTarget(e: any) {
    const prefixes = ['o-', 'ja-', 'en-']
    if (e.attributes && e.attributes['xml:id']) {
      let id = e.attributes['xml:id']

      for (const prefix of prefixes) {
        id = id.replace(prefix, '')
      }

      this.hoverTarget = id
    } else {
      this.hoverTarget = ''
    }
  }

  removeHoverTarget() {
    this.hoverTarget = ''
  }

  checkHoverTarget(e: any) {
    const hoverTarget = this.hoverTarget
    if (!hoverTarget) {
      return false
    }
    if (e.attributes && e.attributes['xml:id']) {
      const id = e.attributes['xml:id']
      if (id.includes(hoverTarget)) {
        return true
      }
    }
    return false
  }

  setName(e: any) {
    if (e.attributes && e.attributes.ref) {
      const name = e.attributes.ref.replace('#', '')
      this.name = name
    } else {
      this.name = ''
    }
  }

  clickImg(value: string) {
    this.zone = value.replace('#', '')
  }

  getComponent(element: any) {
    if (element.name === 'lb') {
      return 'br'
    } /* else if (element.name === 'note') {
      return 'div'
    } else if (element.attributes && element.attributes.corresp) {
      return 'div'
    } */ else {
      return 'span'
    }
  }

  getNote(id: any) {
    const note = this.xml.querySelector("note[target='#" + id + "']")
    if (note) {
      return note.textContent
    } else {
      return ''
    }
  }

  setPersonId(e: any) {
    if (e.attributes && e.attributes.corresp) {
      this.personId = e.attributes.corresp.replace('#', '')
    }
  }

  removePersonId() {
    this.personId = ''
  }
}
</script>
<style>
/*
span {
  display: inline-block;
}
*/
</style>
