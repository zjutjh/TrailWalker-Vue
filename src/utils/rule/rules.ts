const nameRules = [
    (v: string) => !!v || "需要名称",
    (v: string) => (v && v.length <= 10) || "名称必须小于10个字符",
];
const sloganRules = [
    (v: string) => !!v || "需要口号",
    (v: string) => (v && v.length <= 50) || "口号必须小于50个字符"
  ];
const idCardRules = [
    (v: string) => !!v || "需要身份证号",
    (v: string) => (v && v.length === 18) || "身份证号必须为18位"
];
const phoneRules = [
    (v: string) => !!v || "需要手机号",
    (v: string) => (v && v.length === 11) || "手机号必须为11位"
];
export { nameRules, idCardRules, phoneRules, sloganRules };
