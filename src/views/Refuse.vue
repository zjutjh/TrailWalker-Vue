<template>
  <div class="flex">
    <tip-card class="flex-item">请在微信中打开并先关注浙江省工业大学精弘网络公众号</tip-card>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({
  components: {
    TipCard: () => import("@/components/Card/TipCard.vue"),
  }
})
export default class Refuse extends Vue {
}
</script>
