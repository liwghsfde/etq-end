<template>
    <div id="app">
      <el-row>
        <el-col :offset="6" :span="8">
      <el-card class="box-card"id="loginBox">
        <div slot="header" class="clearfix">
          <span>ETQ后台管理系统登录</span>
        </div>
        <el-row>
          <el-col :offset="6" :span="12"><div class="grid-content bg-purple-dark">
            <el-input v-model="input1" placeholder="请输入账号">
              <template slot="prepend">帐号</template>
            </el-input>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :offset="6" :span="12"><div class="grid-content bg-purple-dark">
            <el-input v-model="input2" placeholder="请输入密码">
              <template slot="prepend">密码</template>
            </el-input>
          </div></el-col>
        </el-row>
        <br>
        <el-button type="primary" @click="yanzheng">登录</el-button>
      </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "denglu",
      data(){
        return{
          input1:'',
          input2:''
        }
      },
      methods:{
          yanzheng(){
            var that=this;
            if (that.input1=="admin"){
              if (that.input2==123){
                console.log("登录成功");
                //这里发送请求
                this.$emit("show");
                this.$router.push({path:'/#'})
              }else{
                alert("密码错误")
              }
            }else{
              alert("账号错误")
            }
          }
      }
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 600px;
  }
  #app{
    background: url("../assets/bgimg.jpg") no-repeat;
    height: 1007px;
    background-size: cover;

  }
  #loginBox{
    position: absolute;
    top: 200px;
    left: 600px;
    background-color: rgba(255,255,255,0.5);
  }
</style>
