let Base: string;
if (location.hostname === 'localhost' || location.hostname === '192.168.31.45') {  //前端本地测试
    /* 测试环境 */
    Base = ''
} else {
    Base = 'http://106.15.103.224:8081'
}
export {
    Base
};
