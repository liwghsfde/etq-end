<template>
  <div id="app">
    <denglu v-if="loginshow" @show="show"></denglu>
    <navigation v-if="isRouterAlive">

    </navigation>

  </div>
</template>

<script>
  import navigation from './components/navigation'
  import denglu from './components/denglu'
export default {
  name: 'App',
  data (){
    return {
      loginshow:true,
      isRouterAlive:false
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods:{
    show(){
      this.loginshow=false;
      this.isRouterAlive=true;
    },
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function () {
        this.isRouterAlive=true
      })
    }
  },
  components:{
    navigation:navigation,
    denglu:denglu,
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
  a{
    text-decoration: none;
  }
  *{
    margin: 0;
    padding: 0;
  }
</style>
