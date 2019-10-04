<template>
    <div class="flex">
        <create-group class="flex-item" is-update ></create-group>
    </div>
</template>
<script lang="ts">

    import { Component, Vue} from "vue-property-decorator";
    import GroupList from "@/components/Group/GroupList.vue";
    import ApplyList from "@/components/Group/ApplyList.vue";
    import MyGroup from "@/components/Group/MyGroup.vue";
    import CreateGroup from "@/components/Group/CreateGroup.vue";
    @Component({ components: { GroupList, MyGroup, CreateGroup, ApplyList} })
    export default class UpdateGroup extends Vue {}
</script>
