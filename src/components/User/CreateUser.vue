<template>
  <div class="flex-item mx-auto" style="max-width:30rem;">
    <h1>注册</h1>
    <v-card-title style="display:block;" @click="showAVE">
      <Avataaars v-if="user.logo" :src="user.logo"/>
    </v-card-title>

    <v-form ref="form" v-model="valid">

      <v-expansion-panels multiple popout v-model="ExpansionPanel">
        <v-expansion-panel raised rounded="xl">
          <v-expansion-panel-header>基本信息</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field :rules="nameRules" clearable label="姓名" prepend-icon="mdi-account" solo
                          v-model="user.name"></v-text-field>
            <v-select
                :items="idTypes"
                :rules="[v => !!v || '需要选择证件类型']"
                label="证件类型"
                prepend-icon="mdi-account-badge-horizontal"
                solo
                @change="identityChange"
                v-model="idType">
            </v-select>
            <v-text-field v-if="idType==='身份证'" :rules="idCardRules" @focus="idCard2=''" clearable
                          hint="出发前我们会根据身份证号核对个人信息"
                          label="身份证"
                          prepend-icon="mdi-account-badge" solo
                          v-model="user.id_card"></v-text-field>
            <v-text-field v-if="idType==='台湾'" :rules="taiwanRules" @focus="idCard2=''" clearable
                          hint="出发前我们会根据身份证号核对个人信息"
                          label="身份证"
                          prepend-icon="mdi-account-badge" solo
                          v-model="user.id_card"></v-text-field>
            <v-text-field v-if="idType==='港澳'" :rules="hangkongRules" @focus="idCard2=''" clearable
                          hint="出发前我们会根据身份证号核对个人信息"
                          label="身份证"
                          prepend-icon="mdi-account-badge" solo
                          v-model="user.id_card"></v-text-field>
            <v-text-field v-if="idType==='护照'" :rules="passportRules" @focus="idCard2=''" clearable
                          hint="出发前我们会根据护照号核对个人信息"
                          label="护照"
                          prepend-icon="mdi-account-badge" solo
                          v-model="user.id_card"></v-text-field>
            <v-text-field :rules="[v => !!v&&user.id_card===idCard2 || '证件不匹配']" clearable
                          label="重复证件号"
                          prepend-icon="mdi-account-badge" solo
                          v-model="idCard2"></v-text-field>
            <v-text-field :rules="phoneRules" clearable hint="请填写正确的手机号,方便我们和您的队友联系" label="手机号"
                          prepend-icon="mdi-contact-phone"
                          solo v-model="user.phone"></v-text-field>
            <v-text-field :rules="heightRules" clearable label="身高"
                          prepend-icon="mdi-human-male-height" solo
                          suffix="cm"
                          v-model="user.height"></v-text-field>
            <v-select
                :items="sex"
                :rules="[v => !!v || '需要选择性别']"
                label="性别"
                prepend-icon="mdi-gender-male-female"
                solo
                v-model="user.sex"
            ></v-select>
            <v-select
                :items="identity"
                :rules="[v => !!v || '需要选择身份']"
                label="身份"
                prepend-icon="mdi-account-badge-horizontal"
                solo
                @change="identityChange"
                v-model="user.identity"
            ></v-select>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>联系信息</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field :rules="QQRules" clearable label="  QQ  " prepend-icon="mdi-qqchat" solo
                          v-model="user.qq"></v-text-field>
            <v-text-field :rules="mailRules" clearable label="邮箱" prepend-icon="mdi-email" solo
                          v-model="user.email"></v-text-field>
            <v-text-field clearable prepend-icon="mdi-wechat" solo v-model="user.wx_id">
              <template v-slot:label>
                <div>
                  微信号<small>(可选)</small>
                </div>
              </template>
            </v-text-field>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel v-show="user.identity==='学生'">
          <v-expansion-panel-header>学生信息</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select
                :items="school"
                :rules="[v => !!v || '需要选择学院']"
                label="学院"
                prepend-icon="mdi-school"
                solo
                v-if="user.identity==='学生'"
                v-model="user.school"
            ></v-select>
            <v-text-field :rules="sidRules" clearable label="学号" solo prepend-icon="mdi-identifier"
                          v-if="user.identity==='学生'" v-model="user.sid"></v-text-field>
            <v-select
                :items="campus"
                :rules="[v => !!v || '需要选择校区']"
                label="校区"
                prepend-icon="mdi-home-city"
                solo
                v-if="user.identity==='学生'"
                v-model="user.campus"
            ></v-select>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel v-show="user.identity==='校友'" style="text-align: left;">
          <v-expansion-panel-header>疫情防控信息</v-expansion-panel-header>
          <v-expansion-panel-content>
            <h2>我确定不属于以下人员</h2>
            <p>1、各级疾控机构在流行病学史调查中判定的密切接触者，在解除隔离医学观察前或后未进行检测的人员。</p>
            <p>2、从国内中高风险区来浙返浙的未能提供到浙前7天内的核酸检测阴性证明的人。</p>
            <p>3、从国（境）外来浙返浙的未集中隔离医学观察14天且做过核酸及血清检测的。</p>
            <p>4、曾被诊断为确诊病例、疑似病例和无症状感染者而现已痊愈的人员。</p>
            <v-checkbox
                v-model="user.agree"
                :rules="[v => !!v || '需要同意上述关于疫情防控的要求']"
                label="我同意上述关于疫情防控的要求"
            ></v-checkbox>
            <v-select
                :items="healthycode"
                :rules="[v => !!v || '需要选择健康码颜色',(v) => (v==='绿码') || '']"
                label="杭州健康码"
                prepend-icon="mdi-account-badge"
                solo
                v-model="user.healthycode"
            ></v-select>
            <v-file-input
                solo
                v-model="user.healthycode_file"
                show-size
                :rules="[v => !!v || '需要上传杭州健康码', v=> v.size <512*1024 ||'图片请小于500KB']"
                accept="image/*"
                label="上传杭州健康码"
                @change="fileChange"
            ></v-file-input>

          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-form>

    <div class="text-center" style="margin-top: 1rem;">
      <v-btn :disabled="!valid" @click="sheet = true" color="primary" v-if="!isUpdate">注册
        <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
      <v-btn :disabled="!valid" @click="sheet = true" v-else>修改
        <v-icon dark>mdi-wrench</v-icon>
      </v-btn>
    </div>

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
  </div>
</template>
<script lang="ts">
import {
  idCardRules,
  phoneRules,
  nameRules,
  sidRules,
  emailRules,
  qqRules,
  heightRules,
  passportRules,
  taiwanRules,
  hangkongRules
} from "@/utils/rule/rules";
import {Component, Vue} from "vue-property-decorator";
import {API, apiMap} from "@/utils/api/api";
import {postData} from "@/utils/fetch";

@Component({
  components: {
    Disclaimer: () => import("@/components/Disclaimer.vue"),
    AvataaarsGenerator: () => import("@/components/AvataaarsGenerator.vue"),
    Avataaars: () => import("@/components/Avataaars.vue")
  }
})
export default class CreateUser extends Vue {

  private idType = "身份证";
  private healthycode = ["红码", "黄码", "橙色", "绿码"];
  private idTypes = ["身份证", "护照", "台湾", "港澳"];
  private isUpdate = false;

  private ExpansionPanel = [0, 1, 2];

  private school = ["化学工程学院",
    "药学院、协同创新中心",
    "海洋学院",
    "材料科学与工程学院",
    "理学院",
    "机械工程学院",
    "人文学院",
    "信息工程学院",
    "设计与建筑学院",
    "食品科学与工程学院",
    "计算机科学与技术学院、软件学院",
    "法学院",
    "经济学院",
    "土木工程学院",
    "马克思主义学院",
    "公共管理学院",
    "生物工程学院",
    "环境学院",
    "国际学院",
    "教育科学与技术学院",
    "健行学院",
    "外国语学院",
    "管理学院"
  ];
  private identity = ["学生", "教职工", "校友"];
  private campus = ["屏峰", "朝晖", "莫干山"];
  private sex = ["男", "女"];

  private sheet: boolean = false;
  private sheet2: boolean = false;

  private idCardRules = idCardRules;
  private phoneRules = phoneRules;
  private nameRules = nameRules;
  private sidRules = sidRules;
  private passportRules = passportRules;
  private taiwanRules = taiwanRules;
  private hangkongRules = hangkongRules;

  private mailRules = emailRules;
  private QQRules = qqRules;
  private heightRules = heightRules;
  private valid: boolean = false;

  private idCard2 = "";
  private user: any = {};

  private fileChange() {
    const reader = new FileReader();
    reader.readAsDataURL(this.user.healthycode_file);
    reader.onload = () => {
      this.user.healthycode_base64 = reader.result;
    };
  }

  private async createOrUpdate() {
    this.sheet = false;
    const api = this.isUpdate ? apiMap.updateUser : apiMap.createUser;
    try {
      this.$store.commit("setLoading", true);
      const res = await postData(API(api), this.user);

      if (res.code === 1) {
        await this.$router.replace("/Home");
        await this.$store.dispatch("getMyInfo");
        this.$store.commit("showSuccessbar", "创建用户成功");
      } else {
        this.$store.commit("showErrorbar", res.data);
      }
    } catch {
      this.$store.commit("showErrorbar", "网络错误");
    } finally {
      this.$store.commit("setLoading", false);
    }
  }

  private identityChange() {
    if (this.user.identity === "学生") {
      this.ExpansionPanel.push(2);
    }
  }

  private showAVE() {
    this.sheet2 = true;
  }


  private mounted() {
    this.isUpdate = this.$store.state.isLogin;
    if (this.isUpdate) {
      this.user = Object.assign({}, this.$store.state.currentUser);
    }
  }
}
</script>
