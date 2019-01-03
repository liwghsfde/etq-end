<template>
<div v-if="data">
    <el-dialog title="会员详情" :visible.sync=chakan :before-close="handleDialogClose" width="40%">
      <table width="100%"  class="table"  >
        <tr >
          <td width="10%">姓名</td>
          <td>{{this.data[0].user_name}}</td>
        </tr>
        <tr>
          <td  >性别</td>
          <td>{{this.data[0].user_sex}}</td>
        </tr>
        <tr>
          <td >账号</td>
          <td >{{this.data[0].user_name}}</td>
        </tr>
        <tr>
          <td>密码</td>
          <td>{{this.data[0].user_pw}}</td>
        </tr>
        <tr>
          <td>邮箱</td>
          <td>{{this.data[0].user_mail}}</td>
        </tr>
        <tr>
        <td>电话</td>
        <td>{{this.data[0].user_phone}}</td>
        </tr>
        <tr>
          <td>地址</td>
          <td>{{this.data[0].address}}</td>
        </tr>
      </table>
  </el-dialog>
</div>
</template>

<script>
    export default {
      name: "chakan",
      props:['chakan','data'],
      data() {
        return {
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
          },
          formLabelWidth: '120px'
        };
      },
      methods:{
        handleDialogClose(){
          this.$parent.cha1=false;
        }
      },
    };
</script>

<style scoped>
  td{
     border-bottom-width:0px;
  }
  td{
    padding-top: 20px;
    padding-bottom: 20px;
  }

</style>
