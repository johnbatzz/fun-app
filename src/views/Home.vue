<template>
  <v-row>
    <AppBar />
    <Content />
  </v-row>
</template>

<script>
  import AppBar from '@/components/home/AppBar.vue'
  import Content  from '@/components/home/Content.vue'
  export default {
    name: 'Home',

    components: {
      AppBar,
      Content
    },
  }
</script>
