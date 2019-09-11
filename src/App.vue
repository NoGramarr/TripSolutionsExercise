<template>
  <v-app>
    <ul class="cb-slideshow">
      <li>
        <span>Image 01</span>
      </li>
      <li>
        <span>Image 02</span>
      </li>
      <li>
        <span>Image 03</span>
      </li>
      <li>
        <span>Image 04</span>
      </li>
      <li>
        <span>Image 05</span>
      </li>
      <li>
        <span>Image 06</span>
      </li>
    </ul>
    <v-app-bar fixed>
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline text-uppercase">
        <span style="color: #077d01;">Trip</span><span class="grey--text">Advisor</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <SelectForm/>
    </v-content>
  </v-app>
</template>

<script>
import SelectForm from './components/SelectForm.vue';

export default {
  name: 'App',
  components: {
    SelectForm,
  },
  data: () => ({
    //
  }),
};
</script>
