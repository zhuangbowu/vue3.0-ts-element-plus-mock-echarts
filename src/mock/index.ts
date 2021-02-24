/*
* mockjs模拟网络请求
*  */
const Mock = require("mockjs");
import {Info} from "@/mock/data/info"
import getAnalysis from "@/mock/getAnalysis";

Mock.setup({
    timeout: "1000-5000"
})
Mock.mock(RegExp("/api/info/getLogin" + ".*"), "post", (options: any) => {
    // 最佳实践，将请求和参数都打印出来，以便调试
    const data: any = getAnalysis(options.body);
    if (data.phone !== "admin") {
        Info.loginError.msg = "登录失败,账号错误";
        return Mock.mock(Info.loginError);
    }
    if (data.password !== "admin") {
        Info.loginError.msg = "登录失败,密码错误";
        return Mock.mock(Info.loginError);
    }
    return Mock.mock(Info.loginSuccess);
})

// Info.login
