<template>
  <div>
    <div class="oper-div">
      <el-button type="primary" plain icon="el-icon-circle-plus-outline" style="margin-right: 0px;" @click="showAddStudentDialog" :disabled="loading">新建</el-button>
      <el-button type="primary" plain icon="el-icon-refresh" style="margin-right: 0px;" @click="getTable" :disabled="loading">刷新</el-button>
      <el-button type="primary" plain icon="el-icon-files" style="margin-right: 10px;" @click="saveToFile" :disabled="loading">备份</el-button>
      <el-popconfirm title="确定切换默认动作？" @confirm="setDefaultAction">
        <el-button type="primary" plain icon="el-icon-circle-close" style="margin-right: 0px;" :disabled="loading" slot="reference">默认动作：{{ defaultAction }}</el-button>
      </el-popconfirm>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" border stripe height="calc(100vh - 200px)" v-loading="loading">
      <el-table-column prop="idx" label="序号" min-width="50px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="saddr" label="源IP" min-width="130px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="daddr" label="目的IP" min-width="130px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="smask" label="源IP掩码" min-width="130px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="dmask" label="目的IP掩码" min-width="130px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="protocol" label="协议" min-width="60px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="源端口" min-width="100px" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <!-- {{ scope.row.sport_min }} ~ {{ scope.row.sport_max }} -->
          {{ getPort(scope.row.sport_min, scope.row.sport_max) }}
        </template>
      </el-table-column>
      <el-table-column label="目的端口" min-width="100px" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <!-- {{ scope.row.dport_min }} ~ {{ scope.row.dport_max }} -->
          {{ getPort(scope.row.sport_min, scope.row.sport_max) }}
        </template>
      </el-table-column>
      <el-table-column prop="action" label="动作" min-width="80px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="logging" label="日志" min-width="70px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="timeout" label="超时时间" min-width="160px" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="操作" width="66px" show-overflow-tooltip>
        <template #default="scope">
          <el-popconfirm title="确认删除？" @confirm="deleteRule(scope.row.idx)">
            <el-button type="danger" icon="el-icon-delete" size="small" slot="reference"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-div">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRows" style="margin-top: 10px;" :disabled="loading">
      </el-pagination>
    </div>

    <el-dialog title="添加规则" :visible.sync="studentDialogVisible">
      <el-form :model="ruleForm" ref='ruleForm' :rules="rules" label-width="20%" size="mini">
        <!-- <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item> -->
        <el-form-item label="源IP" prop="saddr">
          <el-input v-model="ruleForm.saddr" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="目的IP" prop="daddr">
          <el-input v-model="ruleForm.daddr" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="源IP掩码" prop="smask">
          <el-input v-model="ruleForm.smask" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="目的IP掩码" prop="dmask">
          <el-input v-model="ruleForm.dmask" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="协议" prop="protocol">
          <el-select v-model="ruleForm.protocol" placeholder="请选择协议" style="width: 80%;">
            <el-option label="ICMP" value="ICMP"></el-option>
            <el-option label="UDP" value="UDP"></el-option>
            <el-option label="TCP" value="TCP"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="源端口最小值" prop="sport_min">
          <el-input v-model="ruleForm.sport_min" style="width: 38.2%;"></el-input> ~
          <el-input v-model="ruleForm.sport_max" style="width: 38.2%;"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="目的端口" prop="dport_min">
          <el-input v-model="ruleForm.dport_min" style="width: 38.2%;"></el-input> ~
          <el-input v-model="ruleForm.dport_max" style="width: 38.2%;"></el-input>
        </el-form-item> -->
        <el-form-item label="源端口最小值" prop="sport_min">
          <el-input v-model="ruleForm.sport_min" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="源端口最大值" prop="sport_max">
          <el-input v-model="ruleForm.sport_max" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="目的端口最小值" prop="dport_min">
          <el-input v-model="ruleForm.dport_min" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="目的端口最大值" prop="dport_max">
          <el-input v-model="ruleForm.dport_max" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="动作" prop="action">
          <el-select v-model="ruleForm.action" placeholder="请选择动作" style="width: 80%;">
            <el-option label="ACCEPT" value="ACCEPT"></el-option>
            <el-option label="DROP" value="DROP"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日志" prop="logging">
          <el-switch v-model="ruleForm.logging"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="studentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request.js'

export default {
  name: 'RuleTable',
  data () {
    return {
      loading: false,
      tableData: [],
      multipleSelection: [],
      searchInput: '',
      currentPage: 1,
      pageSize: 10,
      totalRows: 0,
      studentDialogVisible: false,
      ruleForm: {},
      defaultAction: 'UNKNOWN',
      rules: {
        saddr: [
          { required: true, message: '请输入源IP', trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: '请输入合法的IP地址(如192.168.33.101)', trigger: 'blur' }
        ],
        daddr: [
          { required: true, message: '请输入目的IP', trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: '请输入合法的IP地址(如192.168.33.101)', trigger: 'blur' }
        ],
        smask: [
          { required: true, message: '请输入源IP掩码', trigger: 'blur' },
          { pattern: /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/, message: '请输入合法的掩码(如255.255.255.0)', trigger: 'blur' }
        ],
        dmask: [
          { required: true, message: '请输入目的IP掩码', trigger: 'blur' },
          { pattern: /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/, message: '请输入合法的掩码(如255.255.255.0)', trigger: 'blur' }
        ],
        sport_min: [
          { required: true, message: '请输入源端口最小值', trigger: 'blur' },
          { pattern: /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/, message: '请输入合法的端口号(0~65535)', trigger: 'blur' }
        ],
        sport_max: [
          { required: true, message: '请输入源端口最大值', trigger: 'blur' },
          { pattern: /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/, message: '请输入合法的端口号(0~65535)', trigger: 'blur' }
        ],
        dport_min: [
          { required: true, message: '请输入目的端口最小值', trigger: 'blur' },
          { pattern: /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/, message: '请输入合法的端口号(0~65535)', trigger: 'blur' }
        ],
        dport_max: [
          { required: true, message: '请输入目的端口最大值', trigger: 'blur' },
          { pattern: /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/, message: '请输入合法的端口号(0~65535)', trigger: 'blur' }
        ],
        protocol: [
          { required: true, message: '请选择协议', trigger: 'blur' }
        ],
        action: [
          { required: true, message: '请选择动作', trigger: 'blur' }
        ]
      }
    }
  },
  created: function () {
    this.getTable()
    this.getDefaultAction()
  },
  methods: {
    getTable () {
      this.loading = true
      request
        .get('readrule', {
          params: {
            start_idx: (this.currentPage - 1) * this.pageSize,
            end_idx: this.currentPage * this.pageSize
          }
        })
        .then((res) => {
          this.tableData = []
          if (res.code === 0) {
            this.tableData = res.msg.rules
            this.totalRows = res.msg.rule_num
            this.$message({
              message: '获取信息成功',
              type: 'success',
              showClose: 'true'
            })
          } else {
            this.$message.error({
              message: '获取信息失败，错误信息：' + res.msg,
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
    getPort (portMin, portMax) {
      if (portMin === portMax) {
        return portMin.toString()
      } else if (portMin === 0 && portMax === 65535) {
        return 'ALL'
      } else {
        return portMin.toString() + '~' + portMax.toString()
      }
    },
    showAddStudentDialog () {
      this.ruleForm = {}
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.studentDialogVisible = true
    },
    insertItem () {
      console.log(this.ruleForm)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          request.post('addrule', this.ruleForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                title: '成功',
                message: '添加规则成功',
                duration: 3000,
                type: 'success'
              })
              this.studentDialogVisible = false
              this.getTable()
            } else {
              this.$notify.error({
                title: '失败',
                message: '添加规则失败，错误信息：' + res.msg,
                duration: 3000
              })
            }
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: '数据不满足要求，请检查数据',
            duration: 3000
          })
        }
      })
    },
    deleteRule (ID) {
      console.log(ID)
      request
        .get('delrule', {
          params: {
            idx: ID
          }
        })
        .then((res) => {
          if (res.code === 0) {
            this.$notify({
              title: '成功',
              message: '删除规则成功',
              duration: 3000,
              type: 'success'
            })
            this.getTable()
          } else {
            this.$notify.error({
              title: '失败',
              message: '删除规则失败，错误信息：' + res.msg,
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
    },
    saveToFile () {
      request
        .get('saverule', {})
        .then((res) => {
          if (res.code === 0) {
            this.$message({
              message: '保存规则成功：' + res.msg,
              type: 'success',
              showClose: 'true'
            })
          } else {
            this.$message.error({
              message: '保存规则失败，错误信息：' + res.msg,
              showClose: 'true'
            })
          }
        })
        .catch((err) => {
          this.$message.error({
            message: '保存规则失败，错误信息：' + err,
            showClose: 'true'
          })
        })
    },
    getDefaultAction () {
      request
        .get('readdefact', {})
        .then((res) => {
          if (res.code === 0) {
            // this.$message({
            //   message: '读取默认规则成功：' + res.msg,
            //   type: 'success',
            //   showClose: 'true'
            // })
            this.defaultAction = res.msg
          } else {
            this.$message.error({
              message: '读取默认规则失败，错误信息：' + res.msg,
              showClose: 'true'
            })
          }
        })
        .catch((err) => {
          this.$message.error({
            message: '读取默认规则失败，错误信息：' + err,
            showClose: 'true'
          })
        })
    },
    setDefaultAction () {
      var targetAction = ''
      if (this.defaultAction === 'DROP') {
        targetAction = 'ACCEPT'
      } else {
        targetAction = 'DROP'
      }
      request.post('defact', { action: targetAction }).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: '设置默认规则为' + targetAction + '成功：' + res.msg,
            type: 'success',
            showClose: 'true'
          })
          this.getDefaultAction()
        } else {
          this.$message.error({
            message: '设置默认为' + targetAction + '失败，错误信息：' + res.msg,
            showClose: 'true'
          })
        }
      })
        .catch((err) => {
          this.$message.error({
            message: '设置默认为' + targetAction + '失败，错误信息：' + err,
            showClose: 'true'
          })
        })
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
