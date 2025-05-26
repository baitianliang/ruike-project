import baseAxios from '../js/base_axios'
let instance = baseAxios.instance
let jsonAxios = baseAxios.jsonAxios
const Qs = require('qs');

export default {
    // 获取公共悬赏列表
    getRewardList(offset, limit) {
        return jsonAxios.get(`public/reward/list/${offset}/${limit}`)
    },
    // 获取悬赏详情
    getRewardCommentList(rewardId ,offset, limit) {
        return jsonAxios.get(`public/reward/comment/list/${rewardId}/${offset}/${limit}`)
    },
    // 教师发布评论
    commentAdd(data) {
        data = Qs.stringify(data)
        return instance.post(`/teacher/reward/comment/add`, data)
    },
    // 获取作品列表
    getWorkList(offset, limit) {
        return jsonAxios.get(`/public/enroll/list/score/${offset}/${limit}?isWork=1&isOrder=1`)
    },
    // 获取赛事列表
    getActivityList() {
        return jsonAxios.get(`/public/activity/list/0/4`)
    },
    // 增加观看次数
    addWorkView(workId) {
        return instance.get(`/public/work/view/${workId}`)
    },
}