/*
* axios异步封装
* 1. 设置请求超时时间
* 2. 添加请求拦截器，在每个请求的头部添加token
* 3. 添加响应拦截器，根据服务器返回状态进行相应的结果返回
* */
import Axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import store from "@/store";
import router from "@/router";
import {ElMessage} from "element-plus"

const blackKey = ["createTime", "updateTime", "structure", "options"];
const defaultConfig = {
    /* 请求超时时间30秒 */
    timeout: 30 * 1000,
    /*
    * 设置默认请求头，当需要特殊请求头时，将其作为参数传入，即可覆盖此处的默认参数(第三个参数即config)
    * 例如：
    * services.post(data, {
    *   headers: { "Content-Type": "multipart/form-data" }
    * });
    * */
    headers: {
        get: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        post: {
            "Content-Type": "application/json;charset=utf-8",
        },
    },
}

/* 创建实例 */
const _axios = Axios.create(defaultConfig);
/* 请求拦截器 */
_axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        /*
        * 从vuex里获取token const token = store.state.token;
        * 如果token存在就在请求头里添加
        * localStorage.toke && (config.headers.token = localStorage.toke);
        * */
        const token = "Bearer " + (store.state.userInfo as any).accessToken;
        token && (config.headers.authorization = token);
        return config;
    },
    (error) => {
        // 失败返回
        error.data = {
            msg: "服务器异常",
        };
        return Promise.reject(error);
    }
)
/* 响应拦截器 */
_axios.interceptors.response.use(
    (response: AxiosResponse): any => {
        const res = response.data;
        switch (response.status) {
            case 200:
                switch (res.code) {
                    case 200:
                        return Promise.resolve(res);
                    case 403:
                        router.push('/login');
                        store.commit("close")
                        return Promise.reject(res);
                    default:
                        return Promise.reject(res);
                }
            default:
                return Promise.reject(res);
        }
    },
    (error) => {
        const {response} = error;
        if (response) {
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            const errorMsg = {
                msg: "未知错误",
            }
            return Promise.reject(errorMsg);
        }
    }
)
export default _axios;
