import baseAxios from '../js/base_axios'
let instance = baseAxios.instance
let projectId = window.parent._P ? window.parent._P.projectId || '1010' : '1010'
// let jsonAxios = baseAxios.jsonAxios
// const Qs = require('qs');

export default {
    getToken() {
        return instance.get(`posts`)
    },
    // 获取菜单接口
    getMenuList() {
        return instance.get(`getNavigationTree?projectId=${projectId || '1010'}`)
    },
    // 二级菜单获取页面信息
    getPageData(val) {
        return instance.get(`getNavigationTreeItem?projectId=${projectId || '1010'}${val.twoid ? '&twoid=' + val.twoid : ''}${val.id ? '&id=' + val.id : ''}`)
    }
}