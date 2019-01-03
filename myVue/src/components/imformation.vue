<template>
    <div id="app">
      <div class="pageText">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>信息通知</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <hr>
      <Itable></Itable>

    </div>

</template>

<script>
  import Itable from './Itable';

    export default {
      inject:["reload"],
      name: "imformation",
      components:{
          Itable:Itable,

      },
    }
</script>

<style scoped>
  hr{
    opacity: 0.3;
    margin-top: 15px;
    margin-bottom: 15px;
  }

</style>
