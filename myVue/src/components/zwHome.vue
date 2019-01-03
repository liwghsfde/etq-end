<template>
  <div class="app">
    <div class="pageText">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/zwHome' }">当前位置</el-breadcrumb-item>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <hr>
    <div class="user">
      <img src="../assets/nav.jpg"/>
      <span>admin（超级管理员）</span>
      <hr>
    </div>
    <div class="sales">
      <span>销售情况</span>
      <p>销售情况</p>
      <el-progress :percentage="0"></el-progress>
      <p>销售情况</p>
      <el-progress :percentage="70"></el-progress>
      <p>销售情况</p>
      <el-progress :percentage="80" color="#8e71c7"></el-progress>
      <p>销售情况</p>
      <el-progress :percentage="100" status="success"></el-progress>
      <p>销售情况</p>
      <el-progress :percentage="50" status="exception"></el-progress>
    </div>
  </div>
</template>

<script>
    export default {
        name: "zwHome"
    }
</script>

<style scoped>

  hr{
    margin-top: 15px;
    margin-bottom: 15px;
    opacity: 0.3;
  }
  .user{
    width: 30%;
    height: 250px;
    border-radius: 5px;
    background-color: #1b6d85;
    margin-bottom: 30px;
  }
  .user img{
    width: 150px;
    border-radius: 150px;
    margin-top: 20px;
  }
  .user span{
    font-size: 30px;
    color: #0f0f0f;
  }
  .sales{
    width: 30%;
    height: 250px;
    border: 1px solid black;
    border-radius: 5px;
  }
  .sales p{
    margin-left: -390px;
  }

</style>
