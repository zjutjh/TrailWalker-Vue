export default interface IUser {
    id?: number;
    openid: string;
    campus: "朝晖"|"屏峰";
    identity: "教职工" | "学生" | "校友" | "其他";
    name: string;
    height: number;
    sid?: string;
    id_card?: string;
    phone?: string;
    email?: string;
    qq?: string;
    wx_id?: string;
    status: number;
    group_id?: number;
    logo?: string;
}
