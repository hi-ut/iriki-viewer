<template>
  <div>
    <section class="mb-5">
      <v-img :src="baseUrl + '/img/top.jpg'" height="300px">
        <v-row align="center" class="lightbox white--text pa-2 fill-height">
          <v-col class="text-center">
            <h1 class="display-1">
              <b>{{ title }}</b>
            </h1>
            <v-btn
              large
              class="mt-10"
              :to="
                localePath({
                  name: 'list',
                })
              "
              color="primary"
              >{{ $t('try_out') }}</v-btn
            >
          </v-col>
        </v-row>
      </v-img>
    </section>
    <v-container class="my-5">
      <div class="mt-5 mb-5 pb-5 text-center">
        <h2 v-if="fales">{{ title }}</h2>
        <p class="py-5">
          <!--  v-html="siteDesc" -->
          ここに簡単な説明を描きます。ここに簡単な説明を描きます。ここに簡単な説明を描きます。ここに簡単な説明を描きます。ここに簡単な説明を描きます。ここに簡単な説明を描きます。
        </p>
      </div>

      <div v-if="items.length > 0">
        <h3 class="mt-5 mb-10 text-center">{{ $t('menu') }}</h3>

        <v-row class="mb-10">
          <v-col
            v-for="(obj, key) in items"
            :key="key"
            cols="12"
            :lg="2"
            :md="3"
            :sm="6"
          >
            <v-card flat no-body class="mb-4">
              <template v-if="obj.href">
                <a :href="obj.href" target="_blank">
                  <div class="text-center grey lighten-2 pa-10">
                    <v-icon size="50">{{ obj.icon }}</v-icon>
                  </div>
                </a>
                <div class="pa-4">
                  <a :href="obj.href" target="_blank">
                    <h4>{{ obj.label }}</h4>
                  </a>

                  <p v-if="obj.description" class="mt-2 mb-0">
                    {{ obj.description }}
                  </p>
                </div>
              </template>
              <template v-else>
                <nuxt-link :to="localePath(obj.path)">
                  <div class="text-center grey lighten-2 pa-10">
                    <v-icon size="50">{{ obj.icon }}</v-icon>
                  </div>
                </nuxt-link>
                <div class="pa-4">
                  <nuxt-link :to="localePath(obj.path)">
                    <h4>{{ obj.label }}</h4>
                  </nuxt-link>

                  <p v-if="obj.description" class="mt-2 mb-0">
                    {{ obj.description }}
                  </p>
                </div>
              </template>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class Item extends Vue {
  baseUrl: any = process.env.BASE_URL

  get lang() {
    return this.$i18n.locale
  }

  title: any = (this as any).$t(process.env.siteName)

  // items: any = process.env.mainData

  head() {
    const title = this.title
    return {
      titleTemplate: null,
      title,
    }
  }

  get items(): any[] {
    return [
      {
        label: this.$t('list'),
        path: {
          name: 'list',
        },
        description: '',
        icon: 'mdi-view-list',
      },
      {
        label: this.$t('help'),
        path: {
          name: 'page-slug',
          params: {
            slug: 'help',
          },
        },
        description: '',
        icon: 'mdi-help-circle',
      },

      /*
      {
        label: '渋沢栄一日記リスト',
        href:
          'https://www.kanzaki.com/works/2016/pub/image-annotator?u=https://shibusawa-dlab.github.io/lab1/iiif/collection/top.json',
        description: '',
        icon: 'mdi-image',
      },
      */
      /*
      {
        label: 'TEI/XML',
        href: this.github + '/tree/master/tei',
        description: '',
        icon: 'mdi-file',
      },
      */
      /*
      {
        label: this.$t('snorql'),
        href: this.baseUrl + '/snorql',
        description: '',
        icon: 'mdi-database',
      },
      */
      /*
      {
        label: 'Search API',
        href:
          'https://la1l89esu7-dsn.algolia.net/1/indexes/dev_MAIN/?X-Algolia-API-Key=a8dc3bccca1af99f7a77ea55f7dd9f4d&X-Algolia-Application-Id=LA1L89ESU7',
        description: '',
        icon: 'mdi-api',
      },
      */
    ]
  }

  async asyncData2({ payload, app, $axios, env }: any) {
    if (payload) {
      return { item: payload }
    } else {
      // const id = app.context.params.id

      //

      const query = `
      prefix jps: <https://jpsearch.go.jp/term/property#>
      SELECT DISTINCT ?s ?label ?image WHERE {
        ?s schema:spatial ?o; schema:image ?image . 
        ?s rdfs:label ?label . 
        ?s jps:sourceInfo/schema:provider <http://example.org/data/W23>
      }
      `

      const url =
        env.endpoint + '?output=json&query=' + encodeURIComponent(query)

      const response = await $axios.$get(url)

      const items: any[] = []

      /*
      const item: any = {
        description: [],
      }

      for (const obj of response) {
        const p = obj.p
        const o = obj.o

        item['@id'] = obj.s

        if (p === 'http://www.w3.org/2000/01/rdf-schema#label') {
          item.label = o
        } else if (p === 'http://schema.org/url') {
          item.url = o
        } else if (p === 'http://schema.org/relatedLink') {
          item.relatedLink = o
        } else if (p === 'http://schema.org/description') {
          item.description.push(o)
        } else if (p === 'http://schema.org/geo') {
          item.geo = o
        } else if (p === 'https://jpsearch.go.jp/term/property#sourceData') {
          item.curation = o
        }
      }
      */

      for (const obj of response) {
        // const p = obj.p
        // const o = obj.o

        const s = obj.s
        const spl = s.split('/')
        const id = spl[spl.length - 1]

        items.push({
          id,
          label: obj.label,
          thumbnail: obj.image,
          curation: process.env.pages + '/curation/' + id + '.json',
        })
      }

      return { items }
    }
  }
}
</script>
