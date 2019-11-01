<template>
    <div class="flex">
        <tip-card class="flex-item">请先关注精弘网络公众号</tip-card>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            TipCard: () => import(/* webpackChunkName: "home" */"@/components/Card/TipCard.vue"),
        }
    })
    export default class End extends Vue {
        private show?: boolean = false;
    }
</script>
