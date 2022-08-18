<template>
  <q-page class="flex justify-center items-center">
    <router-link to="/bot">
      <q-avatar size="6rem">
        <img src="../assets/bot.jpg" />
      </q-avatar>
    </router-link>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
});
</script>
