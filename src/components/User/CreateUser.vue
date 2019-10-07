<template>
    <div class="flex-item mx-auto" style="max-width:30rem;">
        <h1>报名</h1>
        <v-card class="radius-card text-center">

            <v-card-title style="display:block;">
                <v-avatar width="5rem" height="5rem" style="margin-bottom:2rem" @click="showAVE">
                    <img v-if="user.logo" :src="user.logo" alt=""/>
                </v-avatar>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field label="姓名" solo clearable v-model="user.name" :rules="nameRules"></v-text-field>
                    <v-text-field label="身份证" solo clearable v-model="user.id_card" :rules="idCardRules"></v-text-field>
                    <v-text-field label="重复身份证" solo clearable v-model="user.id_card"
                                  :rules="idCardRules"></v-text-field>
                    <v-text-field label="手机号" solo clearable v-model="user.phone" :rules="phoneRules"></v-text-field>
                    <v-select
                            :items="identity"
                            label="身份"
                            solo
                            v-model="user.identity"
                            :rules="[v => !!v || '需要选择身份']"
                    ></v-select>
                    <v-select
                            v-if="user.identity==='学生'"
                            :items="school"
                            label="学院"
                            solo
                            v-model="user.school"
                            :rules="[v => !!v || '需要选择学院']"
                    ></v-select>
                    <v-text-field v-if="user.identity==='学生'" label="学号" solo clearable
                                  v-model="user.sid" :rules="nameRules"></v-text-field>
                    <v-text-field label="  QQ  " solo clearable v-model="user.qq"></v-text-field>
                    <v-text-field label="身高" solo clearable v-model="user.height"></v-text-field>
                    <v-text-field label="邮箱" solo clearable v-model="user.email"></v-text-field>
                    <v-text-field label="微信号" solo clearable v-model="user.wx_id"></v-text-field>

                </v-form>
                <div class="text-center">
                    <v-btn v-if="!isUpdate" :disabled="!valid" @click="sheet = true">注册</v-btn>
                    <v-btn v-else :disabled="!valid" @click="sheet = true">修改</v-btn>
                </div>
            </v-card-text>
            <v-bottom-sheet v-model="sheet" scrollable>
                <v-sheet class="text-center bottom-sheet scroll">
                    <disclaimer class="text-center" @agree="createOrUpdate"></disclaimer>
                </v-sheet>
            </v-bottom-sheet>
            <v-bottom-sheet v-model="sheet2" scrollable>
                <v-sheet class="text-center bottom-sheet">
                    <AvataaarsGenerator v-model="user.logo"></AvataaarsGenerator>
                </v-sheet>
            </v-bottom-sheet>
            <AvataaarsGenerator v-if="!user.logo" v-model="user.logo"></AvataaarsGenerator>
        </v-card>
    </div>


</template>
<script lang="ts">
    import {idCardRules, phoneRules, nameRules} from "@/utils/rule/rules";
    import {Component, Vue, Inject} from "vue-property-decorator";
    import Disclaimer from "@/components/Disclimer.vue";
    import AvataaarsGenerator from "@/components/AvataaarsGenerator.vue";

    import {API, apiMap} from "@/utils/api/api";
    import {postData} from "@/utils/fetch";

    @Component({components: {Disclaimer, AvataaarsGenerator}})
    export default class CreateUser extends Vue {

        private isUpdate = false;

        private school = ["计算机学院"];
        private identity = ["学生", "校友", "校友", "其他"];

        @Inject()
        private showErr!: any;
        private sheet: boolean = false;
        private sheet2: boolean = false;
        private idCardRules = idCardRules;
        private phoneRules = phoneRules;
        private nameRules = nameRules;
        private user: any = this.$store.state.currentUser;

        private valid: boolean = false;

        private createOrUpdate() {
            if (this.isUpdate) {
                this.updateUser();
            } else {
                this.createUser();
            }
        }

        private createUser() {
            postData(API(apiMap.createUser), this.user)
                .then((res) => {
                    this.$router.push("/Home");

                });
        }

        private updateUser() {
            postData(API(apiMap.updateUser), this.user)
                .then((res) => {
                    if (res.code === 1) {
                        this.$router.replace("/Home");
                    }
                });
        }

        private showAVE() {
            this.sheet2 = true;
        }


        private mounted() {
            this.isUpdate = this.$store.state.isLogin;
        }
    }
</script>
