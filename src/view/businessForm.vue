<template>
  <div id="business_form">
    <el-tabs
      v-model="activeName"
      tab-position="left"
      type="border-card"
      ref="tabs">
      <el-tab-pane :rightCilck="true" label="Reference" name="reference">
        <el-table
          :data="firstTableData"
          border
          style="width: 100%"
          :height="tableHeight"
          row-key="id"
          default-expand-all
        >
          <el-table-column
            v-for="(item, index) in firstTableColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          >
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :rightCilck="true" label="Matrix" name="matrix">
        <el-table
          :data="secondTableData"
          border
          style="width: 100%"
          :height="tableHeight"
          :span-method="objectSpanMethod"
          :cell-style="handleCellStyle"
          @cell-click="handleCellClick"
        >
          <el-table-column
            v-for="(item, index) in secondTableColumn"
            :key="index"
            :prop="item.prop"
            :label="item.levelName">
            <template v-if="item.children">
              <el-table-column
                v-for="(_item, _index) in item.children"
                :key="_index"
                :prop="_item.level"
                :label="_item.levelName + '-' + _item.level"
                :formatter="(row) => row[_item.level]">
                <template #default="{ row }">
                  <div>
                    {{ row[_item.level] }}  <!-- 正确读取带特殊字符的字段 -->
                  </div>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane
      >
      <el-tab-pane :rightCilck="true" label="Register" name="register">
        <el-table
          :data="thirdTableData"
          border
          style="width: 100%"
          :height="tableHeight"
          highlight-current-row
          ref="thirdTable"
        >
          <el-table-column
            v-for="(item, index) in thirdTableColumn"
            :key="index"
            :label="item.label">
            <el-table-column
              v-for="(_item, _index) in item.children"
              :key="_index"
              :prop="_item.prop"
              :label="_item.label">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "../assets/axios/BusinessForm.js";
export default {
  name: "App",
  components: {},
  data() {
    return {
      activeName: 'reference',
      tableHeight: '100%',
      dataList: [],
      firstTableColumn: [
        {
          prop: "name",
          label: "系统工作包",
        },
        {
          prop: "level",
          label: "结构编号",
        },
        {
          prop: "levelName",
          label: "结构名称",
        },
        {
          prop: "pd",
          label: "接口类型",
        },
      ],
      firstTableData: [],
      secondTableColumn: [
        { prop: "firstLevel" },
        { prop: "secondLevelName" },
      ],
      secondTableData: [],
      secondData: [],
      thirdTableColumn: [{
        children: [{
          label: 'ID',
          prop: 'CRRC_PIR_07'
        }]
      },{
        label: 'Interface owner',
        children: [{
          label: 'System',
          prop: 'CRRC_PIR_01'
        }, {
          label: 'Lead Party',
          prop: 'CRRC_PIR_19'
        }]
      },{
        label: 'Interfacing party',
        children: [{
          label: 'System',
          prop: 'CRRC_PIR_02'
        }, {
          label: 'Support Party',
          prop: 'CRRC_PIR_20'
        }]
      },{
        children: [{
          label: 'Intetface Document',
          prop: 'CRRC_PIR_08'
        }]
      },{
        children: [{
          label: 'Interface Description',
          prop: 'CRRC_PIR_09'
        }]
      },{
        label: 'Works by Lead Party',
        prop: 'CRRC_PIR_10',
        children: [{
          prop: 'CRRC_PIR_10'
        }]
      },{
        label: 'Works by Support Party',
        prop: 'CRRC_PIR_11',
        children: [{
          prop: 'CRRC_PIR_11'
        }]
      },{
        label: 'Type',
        prop: 'CRRC_PIR_12',
        children: [{
          prop: 'CRRC_PIR_12'
        }]
      },{
        label: 'Remark',
        prop: 'CRRC_PIR_13',
        children: [{
          prop: 'CRRC_PIR_13'
        }]
      }],
      thirdTableData: [],
    };
  },
  mounted() {
    this.getFirstTableList()
    this.getThirdTableData()
  },
  methods: {
    async getFirstTableList() {
      const res = await axios.getFirstTableList()
      this.dataList = res.data.data
      let CRRC_SPS_NUMBER_L1 = ''
      this.dataList.forEach(el => {
        if(el.CRRC_SPS_NUMBER_L1 === CRRC_SPS_NUMBER_L1) {
          this.firstTableData[this.firstTableData.length - 1].children.push({
            id: `${this.firstTableData[this.firstTableData.length - 1].id}-${(this.firstTableData[this.firstTableData.length - 1].children.length + 1)}`,
            level: el.CRRC_SPS_NUMBER_L2,
            levelName: el.CRRC_SPS_NAME_L2,
            name: el.CRRC_SWP_GZBMC,
            pd: el.CRRC_SPS_JKJS_PD,
          })
        } else {
          CRRC_SPS_NUMBER_L1 = el.CRRC_SPS_NUMBER_L1
          this.firstTableData.push({
            id: this.firstTableData.length + 1,
            level: el.CRRC_SPS_NUMBER_L1,
            levelName: el.CRRC_SPS_NAME_L1,
            children: [{
              id: this.firstTableData.length + 1 + '-1',
              level: el.CRRC_SPS_NUMBER_L2,
              levelName: el.CRRC_SPS_NAME_L2,
              name: el.CRRC_SWP_GZBMC,
              pd: el.CRRC_SPS_JKJS_PD,
            }]
          })
        }
      });
      this.$nextTick(() => {
        this.getSecondTable()
      })
    },
    getSecondTable() {
      this.secondTableColumn = [ ...this.secondTableColumn, ...this.firstTableData ]
      this.dataList.forEach(el => {
        let obj = {
          firstLevel: el.CRRC_SPS_NAME_L1,
          secondLevelName: `${el.CRRC_SPS_NAME_L1}-${el.CRRC_SPS_NUMBER_L2}`,
          secondLevel: el.CRRC_SPS_NUMBER_L2
        }
        this.secondTableData.push(obj)
      })
      this.secondTableData = JSON.parse(JSON.stringify(this.secondTableData))
      this.getSecondData()
    },
    async getSecondData() {
      const res = await axios.getSecondData()
      this.secondData = res.data.data
      this.secondData.forEach(el => {
        this.secondTableData.find(_el => {return _el.secondLevel === el.CRRC_PIR_04})[el.CRRC_PIR_03] = el.CRRC_PIR_07
      })
      this.secondTableData = JSON.parse(JSON.stringify(this.secondTableData))
    },
    objectSpanMethod({ row, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex > 0 && row.firstLevel === this.secondTableData[rowIndex - 1].firstLevel) {
          return [0, 0]; // 当前单元格不显示（被合并）
        } else {
          // 计算相同姓名的行数
          let rowspan = 1;
          for (let i = rowIndex + 1; i < this.secondTableData.length; i++) {
            if (this.secondTableData[i].firstLevel === row.firstLevel) rowspan++;
            else break;
          }
          return [rowspan, 1]; // 合并 rowspan 行，1 列
        }
      }
    },
    handleCellStyle({ row, column, columnIndex }) {
      if(columnIndex > 1 && row[column.property]) {
        return {
          // backgroundColor: '',
          color: 'teal',
          cursor: 'pointer',
          fontWeight: 'bold'
        };
      }
    },
    handleCellClick(row, column) {
      if(row[column.property] && !['firstLevel', 'secondLevelName'].includes(column.property)) {
        this.activeName = 'register'
        let obj = this.thirdTableData.find(el => el.CRRC_PIR_07 === row[column.property])
        this.$refs.thirdTable.setCurrentRow(obj);
        this.$nextTick(() => {
          const tableRef = this.$refs.thirdTable;
          if (tableRef) {
            // 获取表格的滚动容器
            const scrollBody = tableRef.$el.querySelector('.el-table__body-wrapper');
            if (scrollBody) {
              const rowEl = scrollBody.querySelector(`tr:nth-child(${this.thirdTableData.indexOf(obj) + 1})`);
              scrollBody.scrollTo({
                top: rowEl.offsetTop, // 使用行的 offsetTop
                behavior: 'smooth'
              });
            }
          }
        });
      }
    },
    async getThirdTableData() {
      const res = await axios.getThirdTableData()
      this.thirdTableData = [...res.data.data]
      this.thirdTableData = JSON.parse(JSON.stringify(this.thirdTableData))
    },
  },
};
</script>

<style lang="scss">
#business_form {
  margin: 20px;
  height: calc(100vh - 40px);
  .el-tabs {
    height: 100%;
    .el-tabs__content {
      padding: 20px;
      height: calc(100% - 40px);
      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>
