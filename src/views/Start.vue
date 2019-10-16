<template>
    <div class="flex">
        <v-card class="flex-item mx-auto" style="max-width:25rem;">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
            <v-card-title>
                <div>报名还没有开始</div>
                <span class="grey--text subtitle-1">感谢您的关注</span>
            </v-card-title>
            <v-card-actions>
                <v-btn text color="purple">Explore</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="show = !show">
                    <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="show">
                    <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You
                        won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll
                        go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do
                        his laundry? I've got to find a way to escape.
                    </v-card-text>
                </div>
            </v-expand-transition>
        </v-card>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MyGroup from "@/components/Group/MyGroup.vue";

    @Component({components: {MyGroup}})
    export default class Start extends Vue {
        private show?: boolean = false;
    }
</script>

<style scoped>

</style>
