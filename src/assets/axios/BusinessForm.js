import baseAxios from '../js/base_axios'
let instance = baseAxios.instance
let projectId = window.parent._P ? window.parent._P.projectId || '1010' : '1010'
// let jsonAxios = baseAxios.jsonAxios
// const Qs = require('qs');

export default {
    // 获取第一个标签的表格数据
    getFirstTableList() {
        return instance.get(`getReferenceList?projectId=${projectId || '1010'}`)
    },
    // 获取第二个标签表格相交数据
    getSecondData() {
        return instance.get(`getMatrixList?projectId=${projectId || '1010'}`)
    },
    // 获取第三个标签的表格数据
    getThirdTableData() {
        return instance.get(`getRegisterList?projectId=${projectId || '1010'}`)
    }
}