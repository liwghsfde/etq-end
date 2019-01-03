<template>
<div v-if="data">
    <el-dialog  title="订单详情" :visible.sync=chakan1 :before-close="handleDialogClose" width="60%" class="qq">
      <table width="100%"  class="table" border="0"  >
        <tr >
          <td class="chu" width="10%">商品：</td>
          <td width="40%" class="zuo"> <img class="tu" :src=" $host+	imgg" alt=""/>
          </td>
          <td class="chu" width="10%">商品名称:</td>
          <td width="40%" class="zuo">{{this.data[0].shangname}}</td>
        </tr>
        <tr>
          <td class="chu">商品颜色:</td>
          <td class="zuo">{{this.data[0].yanSe}}</td>
          <td class="chu">商品尺码:</td>
          <td class="zuo">{{this.data[0].daXiao}}</td>
        </tr>
        <tr>
          <td class="chu">商品单价:</td>
          <td class="zuo">{{this.data[0].danJia}}</td>
          <td  class="chu">订单号:</td>
          <td class="zuo">{{this.data[0].din}}</td>
        </tr>
        <tr >
          <td class="chu">物流单号:</td>
          <td class="zuo">{{this.data[0].wuliudanhao}}</td>
          <td class="chu">物流名称:</td>
          <td class="zuo">{{this.data[0].wuname}}</td>
        </tr>
        <tr >
          <td class="chu">下单时间:</td>
          <td class="zuo">{{this.data[0].xia}}</td>
          <td class="chu">发货时间:</td>
          <td class="zuo">{{this.data[0].fa}}</td>
        </tr>
        <tr >
          <td class="chu">发货状态:</td>
          <td class="zuo">{{this.data[0].zhuangtai}}</td>
          <td  class="chu">用户:</td>
          <td class="zuo">{{this.data[0].user_name}}</td>
        </tr>
        <tr>
          <td class="chu">地址:</td>
          <td class="zuo">{{this.data[0].address}}</td>
          <td class="chu">地址类型:</td>
          <td class="zuo">{{this.data[0].add_type}}</td>
        </tr>
        <tr>
          <td class="chu">收件人:</td>
          <td class="zuo">{{this.data[0].add_name}}</td>
          <td class="chu">收件人电话:</td>
          <td class="zuo">{{this.data[0].add_phone}}</td>
        </tr>
      </table>
  </el-dialog>
</div>
</template>

<script>
    export default {
      name: "chakan1",
      props:['chakan1','data'],
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
          imgg:'',
          formLabelWidth: '120px'
        };
      },
      methods:{
        jianche(a){
          console.log("11111")
          console.log(a[0].img)
          this.imgg=a[0].img
          // console.log(this.imgg)
        },
        handleDialogClose(){
          console.log(this)
          this.$parent.cha1=false;
        }
      },
    };
</script>

<style scoped>
  .tu{
    width: 20%;
  }
  .qq{
    text-align: center;
  }
  .chu{
    font-weight: bold;
    font-size: 20px;
  }
  .zuo{
    text-align: left;
  }
  td{
     border-bottom-width:0px;
  }
  td{
    margin: 0;
    padding: 0;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .table{
    margin: 0;
    padding: 0;

  }
</style>
