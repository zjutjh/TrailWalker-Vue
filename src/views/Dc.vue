<template>
    <disclaimer :agreeable="false"/>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            Disclaimer: () => import("@/components/Disclaimer.vue"),
        }
    })
    export default class Dc extends Vue {
    }
</script>
