<template>
  <div>
    <div class="oper-div">
      <template>
        <el-popconfirm title="确定清除所有日志？" @confirm="clearLog">
          <el-button type="danger" plain icon="el-icon-circle-close" style="margin-right: 10px;" :disabled="loading" slot="reference">清除 </el-button>
        </el-popconfirm>
        <el-button type="primary" plain icon="el-icon-refresh" style="margin-right: 0px;" @click="getTable" :disabled="loading">刷新
        </el-button>
      </template>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" border stripe height="calc(100vh - 200px)" v-loading="loading">
      <el-table-column prop="idx" label="序号" width="60px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="ts" label="时间" width="200px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="msg" label="内容" show-overflow-tooltip></el-table-column>
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
  name: 'MlogTable',
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
        .get('readmlog', {
          params: {
            start_idx: (this.currentPage - 1) * this.pageSize,
            end_idx: this.currentPage * this.pageSize
          }
        })
        .then((res) => {
          this.tableData = []
          this.totalRows = 0
          if (res.code === 0) {
            this.tableData = res.msg.mlogs
            this.totalRows = res.msg.mlog_num
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
        .get('clrmlog')
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
