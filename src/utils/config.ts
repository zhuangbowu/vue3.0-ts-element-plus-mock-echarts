/* 打开加载中 */
const openLoad = (ctx: any) => {
    ctx.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
    });
}
/* 关闭加载中 */
const closeLoad = (ctx: any) => {
    const loading = ctx.$loading({});
    ctx.$nextTick(function () {
        loading.close();
    });
}
const getPhoneRegular = (text: string) => {
    console.log(text);
}
const getNumRegular = (text: string) => {
    console.log(text);
}
export default {
    openLoad,
    closeLoad,
    getPhoneRegular,
    getNumRegular,
}
