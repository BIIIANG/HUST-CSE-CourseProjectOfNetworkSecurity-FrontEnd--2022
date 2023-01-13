<template>
  <div>
    <HeaderDB />
    <div style="display: flex;">
      <AsideDB />
      <router-view class="router-view"></router-view>
    </div>
  </div>
</template>

<script>
import HeaderDB from '@/components/HeaderDB'
import AsideDB from '@/components/AsideDB'

export default {
  name: 'HomeDB',
  components: {
    HeaderDB,
    AsideDB
  }
}
</script>

<style scoped>
.router-view {
  flex: 1;
  width: 0;
  padding: 10px;
}
</style>
