<template>
    <div class="flex">
        <create-group class="flex-item" is-update></create-group>
    </div>
</template>
<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            CreateGroup: () => import(/* webpackChunkName: "group" */"@/components/Group/CreateGroup.vue")
        }
    })
    export default class UpdateGroup extends Vue {
    }
</script>
