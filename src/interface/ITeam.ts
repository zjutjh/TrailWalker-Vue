import IUser from "./IUser";
import IWalkRoute from "./IWalkRoute";
export default interface ITeam {
    id: number;
    name: string;
    teamMates?: IUser[];
    logo?: string;
    slogan: string;
    routeId?: number;
    route?: IWalkRoute;
    capacity: number;
}
