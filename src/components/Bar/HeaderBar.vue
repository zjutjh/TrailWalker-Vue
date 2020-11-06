<template>
  <v-app-bar app class="drop">
    <v-toolbar-title class="headline">
        <span><v-img height="2.5rem" width="3rem" src="/img/yx-logo.png"></v-img></span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text href="http://www.jh.zjut.edu.cn/" target="_blank">
      <v-img height="2rem" width="5rem" style="margin-right: 0.5rem" src="/img/jh-logo.png"></v-img>
      <v-img height="2rem" width="2rem" src="/img/beifeng.png"></v-img>
    </v-btn>
  </v-app-bar>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class HeaderBar extends Vue {
}
</script>
