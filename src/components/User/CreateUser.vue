<template>
    <div class="flex-item mx-auto" style="max-width:30rem;">
        <h1>报名</h1>
        <v-card class="text-center">

            <v-card-title style="display:block;">
                <v-avatar width="5rem" height="5rem" style="margin-bottom:2rem" @click="showAVE">
                    <img v-if="user.logo" :src="user.logo" alt=""/>
                </v-avatar>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field label="姓名" solo clearable v-model="user.name" :rules="nameRules"></v-text-field>
                    <v-text-field label="身份证" solo clearable v-model="user.id_card" :rules="idCardRules"></v-text-field>
                    <v-text-field label="重复身份证" solo clearable v-model="idCard2"
                                  :rules="[v => !!v&&user.id_card===idCard2 || '身份证不匹配']"></v-text-field>
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
                    <v-text-field label="学号" solo clearable v-if="user.identity==='学生'"
                                  v-model="user.sid" :rules="sidRules"></v-text-field>
                    <v-select
                            v-if="user.identity==='学生'"
                            :items="campus"
                            label="校区"
                            solo
                            v-model="user.campus"
                            :rules="[v => !!v || '需要选择校区']"
                    ></v-select>
                    <v-text-field label="  QQ  " solo clearable v-model="user.qq"></v-text-field>
                    <v-text-field label="身高" solo clearable v-model="user.height"
                                  :rules="[v => !!v&&v<300&&v>50 || '请输入正确的身高']"></v-text-field>
                    <v-text-field label="邮箱" solo clearable v-model="user.email" :rules="mailRules"></v-text-field>
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
    import {idCardRules, phoneRules, nameRules, sidRules, emailRules} from "@/utils/rule/rules";
    import {Component, Vue} from "vue-property-decorator";
    import Disclaimer from "@/components/Disclaimer.vue";
    import AvataaarsGenerator from "@/components/AvataaarsGenerator.vue";

    import {API, apiMap} from "@/utils/api/api";
    import {postData} from "@/utils/fetch";

    @Component({components: {Disclaimer, AvataaarsGenerator}})
    export default class CreateUser extends Vue {

        private isUpdate = false;

        private school = ["化学工程学院",
            "药学院、协同创新中心",
            "海洋学院",
            "材料科学与工程学院",
            "理学院",
            "机械工程学院",
            "人文学院",
            "信息工程学院",
            "设计艺术学院",
            "计算机科学与技术学院",
            "法学院",
            "经济学院",
            "马克思主义学院",
            "建筑工程学院",
            "政治与公共管理学院",
            "生物工程学院",
            "环境学院",
            "国际学院",
            "教育科学与技术学院",
            "健行学院",
            "外国语学院",
            "管理学院"
        ];
        private identity = ["学生", "教职工", "校友", "其他"];
        private campus = ["屏峰", "朝晖"];

        private sheet: boolean = false;
        private sheet2: boolean = false;

        private idCardRules = idCardRules;
        private phoneRules = phoneRules;
        private nameRules = nameRules;
        private sidRules = sidRules;
        private mailRules = emailRules;

        private user: any = {};
        private valid: boolean = false;

        private idCard2 = "";

        private async createOrUpdate() {

            const api = this.isUpdate ? apiMap.updateUser : apiMap.createUser;
            this.$store.commit("setLoading", true);
            const res = await postData(API(api), this.user);
            this.$store.commit("setLoading", false);
            if (res.code === 1) {
                await this.$router.push("/Home");
                await this.$store.dispatch("getMyInfo");
                this.$store.commit("showSuccessbar", "报名成功");
            } else {
                this.$store.commit("showErrorbar", res.data);
            }
        }

        private showAVE() {
            this.sheet2 = true;
        }


        private mounted() {
            this.isUpdate = this.$store.state.isLogin;
            if (this.isUpdate) {
                this.user = this.$store.state.currentUser;
            }
        }
    }
</script>
