<template >
  <div id="app" >
    <el-dialog title="修改商品" :visible.sync="seetext" :before-close="handleDialogClose" width="30%">
      <el-form :model="form">
        <el-form-item label="商品名称:" :label-width="formLabelWidth" >
          <el-col :span="15">
            <el-input v-model="form.name" autocomplete="off" size="mini" :placeholder="data[index].goodsName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品系列:" :label-width="formLabelWidth">
          <el-select v-model="select" placeholder="商品系列" size="mini" class="left">
            <el-option v-for="item in form.options" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格:" :label-width="formLabelWidth" >
          <el-col :span="15">
            <el-input v-model="form.price" autocomplete="off" size="mini" :placeholder="data[index].price"></el-input>
          </el-col>
        </el-form-item>
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
      inject:["reload"],
      name: "luochange",
      data(){
        return {
          select:'',
          data:'',
          index:'',
          dialogImageUrl: '',
          dialogVisible: false,
          moren:'',
          dialogFormVisibleluochangge: false,
          form: {
            options: [
              { text: 'C系列', value: 'C系列' },
              { text: 'D系列', value: 'D系列' },
              { text: 'H系列', value: 'H系列' },
              { text: 'L系列', value: 'L系列' },
              { text: 'M系列', value: 'M系列' }
            ],
            name: '',
            price:'',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          formLabelWidth: '30%',
          search:"30%",
          input:"",
        }
      },
      props:['seetext','xiabiao'],
      methods:{
          ceshi(){
            let name=this.form.name;
            let price=this.form.price;
            let xilie=this.select;
            let oldname=this.data[this.index].a;
            let arr=[oldname,name,xilie,price];
            this.$axios({
              method:'post',
              url:'/api/change.do',
              data:arr
            }).then((resp)=>{
              this.reload();
            })
          },
        handleDialogClose(){
          this.$parent.see3=false;
        },
        down(){
          this.$parent.see3=false;
          this.$axios({
            method:'post',
            url:'/api/name.do',
            data:{'name':this.data[this.index].goodsName}
          }).then(resp=>{
            this.ceshi();
          });
        },
          jiancha(obj,data){
          this.select=data[obj].seriesName;
          this.index=obj;
          this.data=data;
          },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        }
      },
    }
</script>

<style scoped>
  .el-form-item{
    margin: 5px;
  }
  .left{
    width: 62%;
    position: relative;
    left: -70px;
  }
  #image{
    margin: 0 auto;
    width: 80%;
    height: 200px;
    outline: 1px solid black;
    margin-top: 20px;
  }
</style>
