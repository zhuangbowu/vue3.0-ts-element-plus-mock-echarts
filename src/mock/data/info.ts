const Mock = require("mockjs");
const Random = Mock.Random;

const Info = {
    "loginSuccess": {
        "code": 200,
        "msg": "登录成功！",
        "data": {
            "userName": "@CNAME",
            "id": /\d{5,10}/,
            "userDate": Random.date('yyyy-MM-dd'),
            "userAge|10-80": 100
        }
    },
    "loginError": {
        "code": 401,
        "msg": "",
        "data": {}
    },
}
export {
    Info
};
