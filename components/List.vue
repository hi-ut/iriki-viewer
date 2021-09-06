<template>
  <div id="list" class="pa-2" style="overflow: auto">
    <div v-for="(item, key) in items" :key="key" class="mb-5">
      <h3 class="mb-4">{{ $t(key) }}</h3>
      <v-card
        v-for="(item2, key2) in item"
        :id="item2.id"
        :key="key2"
        class="pa-2 mb-2"
        outlined
      >
        <v-row dense>
          <v-col cols="12" :sm="item2.image ? 3 : 0">
            <v-img
              :src="item2.image"
              max-width="90px"
              max-height="90px"
              contain
            />
          </v-col>
          <v-col cols="12" :sm="item2.image ? 9 : 12">
            <v-row dense>
              <v-col>
                <b>{{ item2.label }}</b>
                <small v-if="item2.name"><br />{{ item2.name }}</small>
              </v-col>
              <v-col class="text-right">
                <v-icon>mdi-share-variant</v-icon>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <div v-if="item2.lat">
          <small
            >Location:
            <a
              @mouseover="setHoverTarget(item2)"
              @mouseleave="removeHoverTarget()"
              >{{ item2.lat }} {{ item2.lon }}</a
            ></small
          >
        </div>
        <div class="mt-2">{{ item2.note }}</div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

const { scroller } = require('vue-scrollto/src/scrollTo')

@Component({
  name: 'TEI',
  components: {},
})
export default class TEIElements extends Vue {
  get xml() {
    return this.$store.getters.getXml
  }

  get personId() {
    return this.$store.getters.getPersonId
  }

  set personId(value) {
    this.$store.commit('setPersonId', value)
  }

  @Watch('personId')
  setPersonId() {
    if (this.personId) {
      const options = {
        container: '#list',
        y: true,
      }

      const scrollTo = scroller()
      scrollTo('#' + this.personId, 5, options)
    }
  }

  items: any = {
    person: [],
    place: [],
  }

  mounted() {
    // console.log(this.xml)

    const xml = this.xml

    const confs: any[] = [
      {
        id: 'person',
        list: 'listPerson',
        name: 'persName',
      },
      {
        id: 'place',
        list: 'listPlace',
        name: 'placeName',
      },
    ]

    for (const conf of confs) {
      const confId = conf.id
      const listPlace: any = xml.querySelector(conf.list)
      if (!listPlace) {
        continue
      }
      const places: any[] = listPlace.querySelectorAll(confId)

      const nodes: any = []

      for (const place of places) {
        const id = place.getAttribute('xml:id')
        // console.log({ id })

        const item: any = {
          label: place.querySelector(conf.name).textContent,
          id,
        }

        const notes: any[] = place.querySelectorAll('note')
        if (notes.length > 0) {
          const values: any[] = []
          for (const note of notes) {
            const value: string = note.textContent
            if (value && note.getAttribute('type') === 'schema:description') {
              values.push(value)
            } else if (value && note.getAttribute('type') === 'schema:image') {
              item.image = value
            } else if (
              value &&
              note.getAttribute('type') &&
              note.getAttribute('type').includes('schema:name')
            ) {
              item.name = value
            }
          }
          item.note = values.join(', ')
        }

        const geo: any = place.querySelector('geo')
        if (geo) {
          const spl = geo.textContent.split(' ')
          item.lat = Number(spl[0])
          item.lon = Number(spl[1])
        }

        nodes.push(item)
      }

      this.items[confId] = nodes
    }
  }

  get placeId() {
    return this.$store.getters.getPlaceId
  }

  set placeId(value) {
    this.$store.commit('setPlaceId', value)
  }

  setHoverTarget(item: any) {
    this.placeId = item.id
  }

  removeHoverTarget() {
    this.placeId = ''
  }
}
</script>
