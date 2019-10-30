<template>
    <div class="flex">
        <tip-card class="flex-item">报名还没有开始</tip-card>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            MyGroup: () => import(/* webpackChunkName: "home" */"@/components/Group/MyGroup.vue"),
            TipCard: () => import(/* webpackChunkName: "home" */"@/components/Card/TipCard.vue"),
        }
    })
    export default class Start extends Vue {
        private show?: boolean = false;
    }
</script>
