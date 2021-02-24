/* 解析mock入参 */
export default function getAnalysis(text: string) {
    const textList: Array<string> = text.split("&");
    const theRequest: any = {};
    for (let i = 0; i < textList.length; i++) {
        theRequest[textList[i].split("=")[0]] = unescape(textList[i].split("=")[1]);
    }
    return theRequest;
}
