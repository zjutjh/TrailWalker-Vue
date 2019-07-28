<template>
  <div class="flex">
    <login class="flex-item" v-if="$store.state.currentUser.id==0"></login>
    <my-info class="flex-item" v-else></my-info>
  </div>
</template>
<script lang="ts">
import { Component, Provide, Vue, Watch } from "vue-property-decorator";
import Login from "@/components/Login/Login.vue";
import MyInfo from "@/components/User/MyInfo.vue";
@Component({ components: { Login, MyInfo } })
export default class Team extends Vue { }
</script>