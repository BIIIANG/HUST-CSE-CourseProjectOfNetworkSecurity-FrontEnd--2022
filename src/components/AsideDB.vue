<template>
  <div>
    <el-menu :default-active="this.$route.path" router style="width: 200px; height: calc(100vh - 81px);">
      <el-menu-item index="/RuleTable" :route="{path : '/RuleTable'}">
        <i class="el-icon-s-operation"></i>
        <span slot="title">规则管理</span>
      </el-menu-item>
      <el-menu-item index="/LogTable" :route="{path : '/LogTable'}">
        <i class="el-icon-s-management"></i>
        <span slot="title">访问日志查看</span>
      </el-menu-item>
      <el-menu-item index="/MlogTable" :route="{path : '/MlogTable'}">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">管理日志查看</span>
      </el-menu-item>
      <el-menu-item index="/ConnectionTable" :route="{path : '/ConnectionTable'}">
        <i class="el-icon-rank"></i>
        <span slot="title">连接查看</span>
      </el-menu-item>
      <el-menu-item index="/About" :route="{path : '/About'}">
        <i class="el-icon-user-solid"></i>
        <span slot="title">关于</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AsideDB'
}
</script>

<style>
.el-menu-item.is-active {
  background-color: #ecf5ff !important;
}
</style>
