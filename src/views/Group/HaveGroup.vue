<template>
  <div class="flex">
    <my-group class="flex-item"></my-group>
    <apply-list class="flex-item" v-if="isShowApplyList"></apply-list>
  </div>
</template>
<script lang="ts">

import {Component, Vue} from "vue-property-decorator";

@Component({
  components: {
    MyGroup: () => import("@/components/Group/MyGroup.vue"),
    ApplyList: () => import("@/components/Group/ApplyList.vue"),
  }
})
export default class HaveGroup extends Vue {
  get isShowApplyList(): boolean {
    return this.$store.state.currentUser && this.$store.state.currentUser.state === 3;
  }
}
</script>
