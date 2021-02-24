/**
 * info用户信息模块接口列表
 */
import {Base} from "@/utils/axios/base";
import _axios from "@/utils/axios/http"
import qs from "qs"

const info = {
    /* 登录 */
    getLogin(data: object) {
        return _axios.post(`${Base}/api/info/getLogin`, qs.stringify(data));
    },
}
export default info;
