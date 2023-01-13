<template>
  <div class="header">
    <div class="school-logo">
      <img src="../assets/HUST.png" alt="状态检测防火墙" class="img-school-logo">
    </div>
    <div class="title">状态检测防火墙 </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderDB'
}
</script>

<style scoped>
.header {
  height: 80px;
  line-height: 80px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
}

.school-logo {
  width: 80px;
  padding-left: 30px;
  display: flex;
  align-items: center;
}

.img-school-logo {
  height: 63px;
  width: 80px;
}

.title {
  flex: 1;
  padding-left: 30px;
  font-weight: bold;
  font-size: 20px;
  color: #409eff;
}
</style>
