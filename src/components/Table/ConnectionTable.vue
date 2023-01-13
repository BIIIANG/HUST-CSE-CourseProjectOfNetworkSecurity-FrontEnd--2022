<template>
  <div>
    <div class="oper-div">
      <template>
        <el-button type="primary" plain icon="el-icon-refresh" style="margin-right: 0px;" @click="getTable" :disabled="loading">刷新</el-button>
      </template>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" border stripe height="calc(100vh - 200px)" v-loading="loading">
      <el-table-column prop="idx" label="序号" min-width="50px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="saddr" label="源IP" min-width="130px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="daddr" label="目的IP" min-width="130px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="protocol" label="协议" min-width="60px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="sport" label="源端口" min-width="100px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="dport" label="目的端口" min-width="100px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="timeout" label="超时时间" min-width="130px" show-overflow-tooltip align="center"></el-table-column>
    </el-table>
    <div class="page-div">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRows" style="margin-top: 10px;" :disabled="loading">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import request from '@/utils/request.js'

export default {
  name: 'ConnectionTable',
  data () {
    return {
      loading: false,
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      totalRows: 100
    }
  },
  created: function () {
    this.getTable()
  },
  methods: {
    getTable () {
      this.loading = true
      request
        .get('readconn', {})
        .then((res) => {
          this.tableData = []
          this.totalRows = 0
          if (res.code === 0) {
            this.tableData = res.msg.conns
            this.totalRows = res.msg.conn_num
            if (res.rows === 0) {
              this.$message({
                message: '无数据',
                type: 'warning'
              })
            } else {
              this.$message({
                message: '获取信息成功',
                type: 'success',
                showClose: 'true'
              })
            }
          } else {
            this.$message.error({
              message: '获取信息失败，错误信息：' + res.error,
              showClose: 'true'
            })
          }
          this.loading = false
        })
        .catch((err) => {
          this.$message.error({
            message: '获取信息失败，错误信息：' + err,
            showClose: 'true'
          })
        })
    },
    clearLog () {
      request
        .get('clrlog')
        .then((res) => {
          if (res.code === 0) {
            this.$notify({
              title: '成功',
              message: '清除日志成功',
              duration: 3000,
              type: 'success'
            })
            this.getTable()
          } else {
            this.$notify.error({
              title: '失败',
              message: '清除日志失败，错误信息：' + res.error,
              duration: 3000
            })
          }
        })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getTable()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getTable()
    }
  }
}
</script>

<style scoped>
.oper-div {
  margin-bottom: 10px;
  display: flex;
}

.page-div {
  display: flex;
  justify-content: center;
}
</style>
