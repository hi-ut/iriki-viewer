<template>
  <div>
    <v-container class="my-5">
      <h2>{{ $t('list') }}</h2>

      <ul class="mt-5">
        <li v-for="(item, key) in items" :key="key">
          <nuxt-link :to="localePath(item.path)">
            {{ item.label }}
          </nuxt-link>
        </li>
      </ul>
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

  get items(): any[] {
    return [
      {
        label: '17 内匠',
        path: {
          name: 'item-id',
          params: {
            id: 17,
          },
        },
      },
    ]
  }
}
</script>
