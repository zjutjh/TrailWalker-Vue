<template>
  <div class="flex">
    <hello-card></hello-card>
    <my-card></my-card>
    <weather class="flex-item"></weather>
  </div>
</template>
<script lang="ts">
import { Component, Provide, Vue, Watch } from "vue-property-decorator";
import Weather from "@/components/Card/Weather.vue";
import MyCard from "@/components/Card/MyCard.vue";
import HelloCard from "@/components/Card/HelloCard.vue";
@Component({ components: { Weather, MyCard, HelloCard} })
export default class Home extends Vue {}
</script>
