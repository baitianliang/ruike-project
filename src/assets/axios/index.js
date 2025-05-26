import baseAxios from '../js/base_axios'
let instance = baseAxios.instance
// let jsonAxios = baseAxios.jsonAxios
// const Qs = require('qs');

export default {
    getToken() {
        return instance.get(`posts`)
    },
    // 获取菜单接口
    getMenuList() {
        return instance.get(`getNavigationTree`)
    },
    // 二级菜单获取页面信息
    getPageData(val) {
        return instance.get(`getNavigationTreeItem?id=${val.id}&twoid=${val.twoid}`)
    }
}