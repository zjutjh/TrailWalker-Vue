<template>
    <div class="flex">
        <my-group class="flex-item"></my-group>
        <apply-list class="flex-item" v-if="$store.state.currentUser.state === 3"></apply-list>
    </div>
</template>
<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import ApplyList from "@/components/Group/ApplyList.vue";
    import MyGroup from "@/components/Group/MyGroup.vue";

    @Component({components: {MyGroup, ApplyList}})
    export default class HaveGroup extends Vue {
    }
</script>
