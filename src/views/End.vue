<template>
    <div class="flex">
        <v-card class="flex-item mx-auto" style="max-width:25rem;">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

            <v-card-title>
                <div>报名已经结束</div>
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
        <my-group class="flex-item" is-end></my-group>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    import MyGroup from "@/components/Group/MyGroup.vue";

    @Component({components: {MyGroup}})
    export default class End extends Vue {
        private show?: boolean = false;
    }
</script>

<style scoped>

</style>
