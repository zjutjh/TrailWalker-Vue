import apiMap from "./map";
const env = process.env ? process.env.NODE_ENV : "production";
const host = process.env.DEV_HOST || "localhost";
const devPort = process.env.DEV_PORT || "8000";
const devUrl = `http://${host}:${devPort}`;
const serverUrl = "http://walk.zjutjh.com";

/**
 * get API url by API name
 * @return {string}
 */
export default function API(name: apiMap): string {
    const apiPath = name;
    if (apiPath === undefined) {
        throw new Error("Cannot find a mock API path.");
    }
    const prefix = env === "development" ? `${devUrl}` : serverUrl;

    const url = `${prefix}${apiPath}`;

    return url;
}
