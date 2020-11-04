<template>
    <v-app-bar app class="drop">
      <v-toolbar-title class="headline">
        <span>精弘毅行</span>
        <span class="font-weight-light">@2020</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text href="http://www.jh.zjut.edu.cn/" target="_blank">
        <v-img height="2rem" width="2rem" style="margin-right: 0.5rem" src="/img/jh-logo.png"></v-img>
        <v-img height="2rem" width="2rem" src="/img/beifeng.png"></v-img>
      </v-btn>
    </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
@Component
export default class HeaderBar extends Vue {}
</script>
