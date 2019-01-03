<template>
  <div id="app">
    <el-container>
      <!--头部-->
      <el-header>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#242f42"
          text-color="#fff"
          active-text-color=false>
          <el-menu-item index="1" style="font-size: 25px;font-weight: bold">E T Q 后台管理系统</el-menu-item>
        </el-menu>
      </el-header>
      <!--底部-->
      <el-container>
        <!--侧边导航栏-->
        <el-aside style="width: 251px;">
          <el-col>
            <!--<h5>自定义颜色</h5>-->
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#324157"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="10">
                <img src="../assets/nav.jpg">
                <span slot="title" style="color:orange">欢迎系统管理员：admin</span>
              </el-menu-item>
              <router-link to="/">
              <el-menu-item index="1">
                <i class="el-icon-location"></i>
                <span slot="title">系统首页</span>
              </el-menu-item>
              </router-link>

              <router-link to="/luoindex">
                <el-menu-item index="2">
                  <i class="el-icon-goods"></i>
                  <span slot="title">商品管理</span>
                </el-menu-item>
              </router-link>

              <router-link to="/order">
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">订单管理</span>
              </el-menu-item>
              </router-link>

              <router-link to="/Member">
                <el-menu-item index="4">
                  <i class="el-icon-star-off"></i>
                  <span slot="title">会员管理</span>
                </el-menu-item>
              </router-link>

              <router-link to="/zwEmployees">
                <el-menu-item index="5">
                  <i class="el-icon-edit-outline"></i>
                  <span slot="title">员工管理</span>
                </el-menu-item>
              </router-link>

              <router-link to="/imformation">
              <el-menu-item index="6">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">信息通知</span>
              </el-menu-item>
              </router-link>
              <router-link to="/zwStore">
                <el-menu-item index="7">
                  <i class="el-icon-rank"></i>
                  <span slot="title">门店管理</span>
                </el-menu-item>
              </router-link>
                <el-menu-item index="9">
                  <i class="el-icon-setting"></i>
                  <span slot="title">退出登陆</span>
                </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  // import store from 'navigation'
    export default {
        name: "navigation",
      data() {
        return {
          isCollapse: true
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },

      },
    }
</script>

<style scoped>
  .el-header{
    padding: 0;
  }

  .el-menu-vertical-demo{
    height: 930px;
    width: 250px;
  }
  .el-menu-item .el-menu--inline{
    margin-top: 30px;
  }
  img{
    width: 50px;
    border-radius: 50px;
  }





</style>
