import baseAxios from '../js/base_axios'
let instance = baseAxios.instance
let jsonAxios = baseAxios.jsonAxios
const Qs = require('qs');

export default {
    // 获取用户token
    getUserToken(form) {
        return jsonAxios.post(`oauth/token`, Qs.stringify(form))
    },
    // 获取用户信息
    getUserInfo() {
        return instance.get(`common/user/info`)
    }
}