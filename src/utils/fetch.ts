import IResponse from "../interface/IResponse";

/**
 *
 * 用Post发送JSON请求
 * @param {string} url
 * @param {*} data
 * @returns {Promise<IResponse>}
 */
async function postData(url: string, data: any = null): Promise<IResponse> {
    // Default options are marked with *
    const response = await fetch(url, {
        body: JSON.stringify(data),
        cache: "no-cache",
        credentials: "include",
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
    });
    return await response.json(); // parses response to JSON
}

/**
 *
 * 用Get发送请求
 * @param {string} url
 * @param {*} [data=""]
 * @returns {Promise<IResponse>}
 */
async function getData(url: string, data: any = ""): Promise<IResponse> {
    // Default options are marked with *
    const response = await fetch(url, {
        cache: "no-cache",
        credentials: "include",
        method: "GET",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
    });
    return await response.json(); // parses response to JSON
}

export {postData, getData};
