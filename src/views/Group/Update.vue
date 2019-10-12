<template>
    <div class="flex">
        <create-group class="flex-item" is-update></create-group>
    </div>
</template>
<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import CreateGroup from "@/components/Group/CreateGroup.vue";

    @Component({components: {CreateGroup}})
    export default class UpdateGroup extends Vue {
    }
</script>
