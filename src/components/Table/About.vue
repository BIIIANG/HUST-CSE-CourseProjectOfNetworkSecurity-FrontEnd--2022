<template>
  <div class="block" style="margin-top:30px; margin-right:50px; margin-left:0px">
    <el-timeline>
      <el-timeline-item timestamp="2022/9/1" placement="top" type="primary">
        <el-card>
          <h4>开始制作 By XuBiang</h4>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2022/10/16" placement="top" type="success">
        <el-card>
          <h4>完成 By XuBiang</h4>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
  <!-- <el-card class="box-card">
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card> -->
</template>

<script>
export default {
  name: 'AboutTable',
  data () {
    return {
    }
  },
  methods: {
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
