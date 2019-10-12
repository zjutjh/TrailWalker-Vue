<template>
    <v-app-bar app class="drop">
      <v-toolbar-title class="headline text-uppercase">
        <span>精弘毅行</span>
        <span class="font-weight-light">@2019</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">广告位招租</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
@Component
export default class HeaderBar extends Vue {}
</script>
