<template>
  <!-- <v-container> -->
  <v-row
    class="home"
  >
    <v-col 
      lg="12"
      md="12"
      sm="12"
      xs="12" 
      class="text-center"
    >
      <v-pagination
        v-model="page"
        :length="totalPage"
      />
    </v-col>
    <div
      v-for="item in animeList"
      :key="item.mal_id"
      class="home-container"
    >
      <v-list-item
        :href="item.url"
        target="_blank"
        class="no_padding"
      >
        <v-card
          width="100%"
          height="500"
        >
          <v-img
            class="white--text align-end"
            max-height="300"
            :src="item.image_url"
          />
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>Start Date: {{ item.start_date }}</v-card-subtitle>
          <v-spacer />
          <v-card-actions>
            {{ item.episodes }} Episodes
          </v-card-actions>
        </v-card>
      </v-list-item>
    </div>
    <v-col 
      lg="12"
      md="12"
      sm="12"
      xs="12" 
      class="text-center"
    >
      <v-pagination
        v-model="page"
        :length="totalPage"
      />
    </v-col>
  </v-row>
  <!-- </v-container> -->
</template>

<script>
  import { mapGetters } from 'vuex'
  import { GET_TOP_ANIME } from '@/store/home'
  export default {
    name: 'Content',

    data() {
      return { 
        page: 1,
        limit: 11
      }
    },

    computed: {
      ...mapGetters(['animeList', 'total']),

      totalPage() {
        return this.total ? Math.ceil(this.total/this.limit) : 0
      }
    },

    watch: {
      'page': function(val) {
        this.getAnimeList();
      }
    },
    
    mounted() {
      this.getAnimeList();
    },

    methods: {
      getAnimeList() {
        let params = { 
          page: this.page,
          limit: this.limit
        }
        this.$store.dispatch(GET_TOP_ANIME, params);
      }
    }
  }
</script>
