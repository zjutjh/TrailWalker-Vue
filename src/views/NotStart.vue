<template>
    <div class="flex">
        <tip-card class="flex-item">报名还没有开始</tip-card>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            MyGroup: () => import("@/components/Group/MyGroup.vue"),
            TipCard: () => import("@/components/Card/TipCard.vue"),
        }
    })
    export default class NotStart extends Vue {
    }
</script>
