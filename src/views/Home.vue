<template>
    <div class="flex">
        <my-card></my-card>
        <!--    <weather class="flex-item"></weather>-->
        <tip-card></tip-card>
        <hello-card></hello-card>


    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Weather from "@/components/Card/Weather.vue";
    import MyCard from "@/components/Card/MyCard.vue";
    import HelloCard from "@/components/Card/HelloCard.vue";
    import TipCard from "@/components/Card/TipCard.vue";

    @Component({components: {Weather, MyCard, HelloCard, TipCard}})
    export default class Home extends Vue {
    }
</script>
