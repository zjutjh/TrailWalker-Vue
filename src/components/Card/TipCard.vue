<template>
    <v-card max-width="25rem" elevation="4">


        <v-carousel height="14rem" cycle hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="(img, i) in images" :key="img">
                <v-img :src="img" height="14rem"></v-img>
            </v-carousel-item>
        </v-carousel>

        <v-card-title>
            <div>
                <slot>欢迎报名精弘毅行</slot>
            </div>
            <span class="grey--text subtitle-1">小贴士</span>
        </v-card-title>
        <v-card-actions>
            <v-btn text color="purple" @click="$router.push('/dis')">报名须知</v-btn>
            <v-btn text color="red" @click="goQQ"> 官方QQ群</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-card-text>
                    1.行程较长，请自行携带足够的水及一定的食物<br/>
                    2.请穿着适当的衣服，避免山间行径时树枝划破皮肤，也可准备保暖衣物以防山上气温较低感冒着凉<br/>
                    3.不宜携带重物，自带水和高热量食物，山上只设置补水点<br/>
                    4.出发前请查看天气预报，自备雨伞或雨衣，提前准备防晒工作<br/>
                    5.建议随身携带充电宝，保证手机有电，通讯畅通<br/>
                    6.屏峰毅行路线大部分为崎岖山路，参与者应选择合适的着装和鞋履，可自行准备登山杖<br/>
                    7.今年的毅行相较去年取消了在屏峰不能报名朝晖毅行的限制，两校区毅行自由选择<br/>
                    8.毅行是一个团队协作的活动，请和队员以及其他团队之间互帮互助，团结合作<br/>
                    9.在某些狭小或者较危险的路段注意谦让，不要争抢<br/>
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class TipCard extends Vue {
        private show = false;
        private images = ["/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/4.jpg", "/img/7.jpg", "/img/6.jpg", "/img/8.jpg"];

        private goQQ() {
            window.location.replace("https://qm.qq.com/cgi-bin/qm/qr?k=xpNtRLoNyfqfK6YEGpR8Aa0iFfsrODQ5&authKey=JMzGTNaUe5rHM112%2FWkvPEECEF4zzfbWOxQzh7KsBu5brex%2Fh7cSmg%3D%3D");
        }
    }
</script>
