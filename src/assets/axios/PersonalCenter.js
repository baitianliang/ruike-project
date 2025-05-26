import baseAxios from '../js/base_axios'
let instance = baseAxios.instance
let jsonAxios = baseAxios.jsonAxios
const Qs = require('qs');

export default {
    // 获取消息列表
    getMessageList(page, size) {
        return instance.get(`/common/message/listbyreceiverid/${page}/${size}`)
    },
    // 获取教师悬赏列表
    getCommentList(page, size, data) {
        return instance.get(`/teacher/reward/comment/list/${page}/${size}${data}`)
    },
    // 获取教师悬赏详情
    getCommentDetail(rewardCommentId) {
        return instance.get(`/teacher/reward/comment/detail/${rewardCommentId}`)
    },
    //七牛上传带文件名
    getqiniuK(data) {
        return jsonAxios.get(`public/util/qiniu/token?key=${data}`)
    },
    //七牛上传带文件名  视频格式转换
    getqiniuFops(data) {
        return jsonAxios.get(`public/util/qiniu/fops/token?key=${data}`)
    },
    //获取七牛转码状态
    getPersistent(id){
        return jsonAxios.get(`/public/util/qiniu/query?persistentId=${id}`)
    },
    //获取七牛转码状态
    rewardReply(data){
        data = Qs.stringify(data)
        return instance.post(`/teacher/reward/reply/add`, data)
    },
}