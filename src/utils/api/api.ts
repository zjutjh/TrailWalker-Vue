const env = process.env ? process.env.NODE_ENV : "production";
const devUrl = `http://test.jh.zjutjh.com`;
const serverUrl = `https://walk.jh.zjutjh.com`;

enum apiMap {
    systemInfo = "/index/info",

    wxLogin = "/oauth",
    login = "/wx/login",
    getUserInfo = "/user/info",
    createUser = "/user/register",
    updateUser = "/user/update",

    listGroup = "/group/list",
    createGroup = "/group/create",
    breakGroup = "/group/break",
    getMyGroupInfo = "/group/info",
    updateGroup = "/group/update",
    leaveGroup = "/group/leave",
    searchGroup = "/group/search",
    submitGroup = "/group/submit",
    unsubmitGroup = "/group/unsubmit",
    listGroupMembers = "/group/members/list",
    deleteGroupMember = "/group/members/delete",
    listApply = "/apply/list",
    doApply = "/apply/do",
    deleteApply = "/apply/delete",
    countApply = "/apply/count",
    agreeApply = "/apply/agree",
    refuseApply = "/apply/refuse",
    doMatchingApply = "/apply/matching",

    listRoutes = "/route/list"

}

/**
 * get API url by API name
 * @return {string}
 */
function API(name: apiMap): string {
    const prefix = env === "development" ? `${devUrl}` : serverUrl;
    return `${prefix}${name}`;
}

export {API, apiMap};
