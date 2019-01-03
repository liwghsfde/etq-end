<template >
  <div >
    <el-dialog title="商品详情" :visible.sync=seetext :before-close="handleDialogClose" width="70%" height="50%" >
      <el-dialog
        width="70%"
        title="图片"
        :visible.sync="innerVisible"
        append-to-body>
        <div id="image" >
          <div class="tutu" v-for="(item,index) in imgSrc">
            <img :src=" $host+imgSrc[index]" alt=""/>
          </div>
        </div>
      </el-dialog>
      <el-form :model="form">

        <div id="xiangqing" >
          <div id="xiangxi" >
            <div class="dd">
              <h1></h1>
              <p>商品名称:{{data[xiabiao].goodsName}}</p>
              <p>商品系列:{{data[xiabiao].seriesName}}</p>
            </div>
            <div class="dd">
              <p>材质:{{data[xiabiao].textureName}}</p>
              <p>商品板块:{{data[xiabiao].sectionName}}</p>
            </div>
            <div class="dd">
              <p>上架日期:{{data[xiabiao].data}}</p>
              <p>商品价格:{{data[xiabiao].price}}</p>
            </div>
          </div>

          <div class="chima">
            <div class="biaoge" v-if="imgColor[0]">
              <h4 >{{imgColor[0].colorName}}尺码库存:</h4>
              <table border="1" cellspacing="0" cellpadding="0">
                <tr>
                  <th v-for="item in chima">{{item}}</th>
                </tr>
                <tr>
                  <th>库存</th>
                  <th v-for="item in chiMa" v-if="item.g_c_ID==imgColor[0].c">{{item.inventory}}</th>
                </tr>
              </table>
              <el-button type="primary" icon="el-icon-picture"  circle @click=checkImg(imgColor[0].colorName,data[xiabiao].goodsName)>查看图片</el-button>
            </div>
            <div class="biaoge" v-if="imgColor[1]">
              <h4 >{{imgColor[1].colorName}}尺码库存:</h4>
              <table border="1" cellspacing="0" cellpadding="0">
                <tr>
                  <th v-for="item in chima">{{item}}</th>
                </tr>
                <tr>
                  <th>库存</th>
                  <th v-for="item in chiMa" v-if="item.g_c_ID==imgColor[1].c">{{item.inventory}}</th>
                </tr>
              </table>
              <el-button type="primary" icon="el-icon-picture"  circle @click=checkImg(imgColor[1].colorName,data[xiabiao].goodsName)>查看图片</el-button>
            </div>
            <div class="biaoge" v-if="imgColor[2]">
              <h4 >{{imgColor[2].colorName}}尺码库存:</h4>
              <table border="1" cellspacing="0" cellpadding="0">
                <tr>
                  <th v-for="item in chima">{{item}}</th>
                </tr>
                <tr>
                  <th>库存</th>
                  <th v-for="item in chiMa" v-if="item.g_c_ID==imgColor[2].c">{{item.inventory}}</th>
                </tr>
              </table>
              <el-button type="primary" icon="el-icon-picture"  circle @click=checkImg(imgColor[2].colorName,data[xiabiao].goodsName)>查看图片</el-button>
            </div>
            <div class="biaoge" v-if="imgColor[3]">
              <h4 >{{imgColor[3].colorName}}尺码库存:</h4>
              <table border="1" cellspacing="0" cellpadding="0">
                <tr>
                  <th v-for="item in chima">{{item}}</th>
                </tr>
                <tr>
                  <th>库存</th>
                  <th v-for="item in chiMa" v-if="item.g_c_ID==imgColor[3].c">{{item.inventory}}</th>
                </tr>
              </table>
              <el-button type="primary" icon="el-icon-picture"  circle @click=checkImg(imgColor[3].colorName,data[xiabiao].goodsName)>查看图片</el-button>
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="down">取 消</el-button>
        <el-button type="primary" @click="down">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    export default {
        name: "luosee",
      data(){
        return {
          imgSrc:[],
          chima:['尺码',35,36,37,38,39,40,41,42,43,44,45,46],
          dialogFormVisibleluosee: false,
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          innerVisible: false,
          formLabelWidth: '30%',
          search:"30%",
          input:"",
        }
      },
      props:['seetext','data','xiabiao','imgColor','chiMa'],
      methods:{
          down(){
            this.$parent.see1=false;
          },
        checkImg(a,b){
           this.imgSrc=[];
          var that=this;
          this.innerVisible = true;
          let data={'name':b,'color':a};
          this.$axios({
            method:'post',
            url:'/api/checkImg.do',
            data:data,
          })
            .then(resp=>{
              for (var i=0;i<resp.data.length;i++){
               that.imgSrc.push(resp.data[i].pic_path)
              }
            });
        },
        handleDialogClose(){
          this.$parent.see1=false;
        }
      },
    }
</script>

<style scoped>
  .tutu{
    margin-left: 19px;
    margin-bottom: 10px;
    /*outline: 1px solid blue;*/
    width: 30%;
    height: 300px;
    display: inline-block;
    overflow: hidden;
  }
  .tutu img{
    width:100%;
    height:auto;
  }
  #xiangxi{
   /*outline: 1px solid blue;*/
    height: 100px;
    width: 100%;
  }
  .chima{
    /*border: 1px solid red;*/
    height: 250px;
  }
  .biaoge{
    display: inline-block;
    /*outline: 1px solid black;*/
    width: 49%;
    height: 150px;
  }
  #image{
    margin: 0 auto;
    /*outline: 1px solid black;*/
    width: 90%;
    height: 850px;
  }
  .one{
    background: rgb(236,245,255);
  }
  .one,.two>td{
    width: 100px;
    height: 30px;
    line-height: 30px;
  }
#xiangqing{
  text-align: center;
  float: left;
  /*border: 1px solid black;*/
  width: 100%;
  height: 420px;
}
  #xiangqing>h4{
    text-align: center;
  }
#xiangqing table{
  width: 80%;
  height: 40px;
  margin: 0 auto;
  margin-bottom: 20px;
}
  .dd{
    width: 33%;
    float: left;
    height: 100px;
    /*outline: 1px solid black;*/
    font-weight: bolder;
  }
</style>
