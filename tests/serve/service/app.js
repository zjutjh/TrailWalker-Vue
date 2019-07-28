var express = require("express");
var app = express();
app.all('*', function (req, res, next) {
    console.log(req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
    next();
});
app.get("/route", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send({
        code: 200,
        data: [{
            id: 1,
            name: "屏风一日游",
            level: 1,
            levelLabel: "Hard",
            isFull: false
        }, {
            id: 2,
            name: "zh一日游",
            level: 1,
            levelLabel: "Easy",
            isFull: false
        }]
    });
});
app.post("/team/getMy", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send({
        code: 200,
        data: {
            name: "tcd", slogan: "tql", logo: "https://logos-download.com/wp-content/uploads/2016/02/BMW_logo_violet.png", teamMates: [{
                id: 1,
                name: "这是一"
            }, {
                id: 2,
                name: "这是二"
            }, {
                id: 2,
                name: "这是三"
            }, {
                id: 2,
                name: "这是四"
            }, {
                id: 2,
                name: "这是五"
            }, {
                id: 2,
                name: "这是l"
            }]
        }
    });
});
app.post("/team/list", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send({
        code: 200,
        data: {
            teams: [{
                name: "天才队",
                teamMates: [{
                    id: 1,
                    name: "zswws"
                }, {
                    id: 2,
                    name: "zssws"
                }, {
                    id: 2,
                    name: "zssws"
                }, {
                    id: 2,
                    name: "zssws"
                }, {
                    id: 2,
                    name: "zssws"
                }, {
                    id: 2,
                    name: "zssws"
                }],
                logo: "https://logos-download.com/wp-content/uploads/2016/02/BMW_logo_violet.png",
                slogan: "我是大天才",
                routeId: 1,
                capacity: 4,
            }, {
                name: "天才队",
                teamMates: [{
                    id: 1,
                    name: "zswws"
                }, {
                    id: 2,
                    name: "zssws"
                }],
                logo: "https://logos-download.com/wp-content/uploads/2016/02/BMW_logo_violet.png",
                slogan: "我是大天才",
                routeId: 1,
                capacity: 4,
            }, {
                name: "天才队",
                teamMates: [{
                    id: 1,
                    name: "zswws"
                }, {
                    id: 2,
                    name: "zssws"
                }],
                logo: "https://logos-download.com/wp-content/uploads/2016/02/BMW_logo_violet.png",
                slogan: "我是大天才",
                routeId: 1,
                capacity: 4,
            }, {
                name: "天才队",
                teamMates: [{
                    id: 1,
                    name: "zswws"
                }, {
                    id: 2,
                    name: "zssws"
                }],
                logo: "https://logos-download.com/wp-content/uploads/2016/02/BMW_logo_violet.png",
                slogan: "我是大天才",
                routeId: 1,
                capacity: 4,
            }, {
                name: "天才队",
                teamMates: [{
                    id: 1,
                    name: "zswws"
                }, {
                    id: 2,
                    name: "zssws"
                }],
                logo: "https://logos-download.com/wp-content/uploads/2016/02/BMW_logo_violet.png",
                slogan: "我是大天才",
                routeId: 1,
                capacity: 4,
            }, {
                name: "天才队",
                teamMates: [{
                    id: 1,
                    name: "zswws"
                }, {
                    id: 2,
                    name: "zssws"
                }],
                logo: "https://logos-download.com/wp-content/uploads/2016/02/BMW_logo_violet.png",
                slogan: "我是大天才",
                routeId: 1,
                capacity: 4,
            }],
            pageSize: 5,
            totalPage: 34,
            page: 1
        }
    });
});
app.post("/team/apply/list", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send({
        code: 200,
        data: {
            users: [{
                name: "天才1",
                id: 12,
                idCard: "3304575436678866888X",
                phone: "123456789",
                teamStatus: "no",
            }],
            pageSize: 5,
            totalPage: 2,
            page: 1
        }
    });
});
var server = app.listen(8000, function () {
    console.log("Server is Run");
});
module.exports = app;