<template>
  <div class="flex">
    <create-team class="flex-item" v-if="$store.state.currentUser.teamStatus=='no'" ></create-team>
    <team-list class="flex-item" v-if="$store.state.currentUser.teamStatus=='no'"></team-list>
    <my-team class="flex-item" v-if="$store.state.currentUser.teamStatus=='has'"></my-team> 
    <apply-list class="flex-item" v-if="$store.state.currentUser.teamStatus=='has'"></apply-list>
  </div>
</template>
<script lang="ts">
import CreateTeam from "@/components/Team/CreateTeam.vue";
import { Component, Provide, Vue, Watch } from "vue-property-decorator";
import TeamList from "@/components/Team/TeamList.vue";
import ApplyList from "@/components/Team/ApplyList/ApplyList.vue";
import MyTeam from "@/components/Team/MyTeam.vue";
@Component({ components: { TeamList, MyTeam, CreateTeam, ApplyList} })
export default class Team extends Vue {}
</script>
