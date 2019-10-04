export default interface IGroup {
    id: number;
    name: string;
    logo?: string;
    description: string;
    route: "屏峰小和山半程毅行"| "屏峰小和山全程毅行"|"朝晖京杭大运河毅行";
    capacity: 4|5|6;
}
