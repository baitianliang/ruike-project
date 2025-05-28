<template>
  <div id="business_form">
    <el-table
      :data="tableData"
      :cell-class-name="cellClassName"
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, index) in tableColumn"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      tableColumn: [
        {
          prop: "date",
          label: "日期",
        },
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "address",
          label: "地址",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          style: 1,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          style: 2,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          style: 3,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          style: 2,
        },
      ],
    };
  },
  methods: {
    cellClassName({ row }) {
      console.log(row);
    },
  },
};
</script>

<style lang="scss">
#business_form {
  margin: 20px;
}
</style>
