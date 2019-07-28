export default interface IUser {
    id?: number;
    name: string;
    idCard?: string;
    phone?: string;
    teamStatus: "has" | "apply" | "no";
    teamID?: number;
    logo?: string;
}
