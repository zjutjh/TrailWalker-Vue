class Rx {

    public static idCard(val: string): boolean {
        /** 检查二代身份证是否合法 */
        const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

        if (!reg.test(val)) {
            return false;
        }
        return true;
    }

    public static mobilePhone(val: string): boolean {
        const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if (!reg.test(val)) {
            return false;
        }
        return true;
    }
    public static qq(val: string): boolean {
        const reg = /^[1-9][0-9]{4,14}$/;
        if (!reg.test(val)) {
            return false;
        }
        return true;
    }

    public static sid(val: string): boolean {
        const reg = /^[0-9a-zA-Z_]{1,}$/;
        if (!reg.test(val)) {
            return false;
        }
        return true;
    }

    public static mail(val: string): boolean {
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(val)) {
            return false;
        }
        return true;
    }
}

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
    (v: string) => (v && Rx.idCard(v)) || "身份证号格式不正确"
];
const sidRules = [
    (v: string) => !!v || "需要学号",
    (v: string) => (v && Rx.sid(v)) || "错误的学号"
];
const phoneRules = [
    (v: string) => !!v || "需要手机号",
    (v: string) => (v && Rx.mobilePhone(v)) || "手机号格式不正确"
];
const emailRules = [
    (v: string) => !!v || "需要邮箱",
    (v: string) => (v && Rx.mail(v)) || "邮箱格式不正确"
];
const qqRules = [
    (v: string) => (v && Rx.qq(v)) || "QQ不正确"
];
export {nameRules, idCardRules, phoneRules, sloganRules, sidRules, emailRules, qqRules};
