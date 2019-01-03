<template >
  <div style="text-align: center">
    <el-dialog title="添加商品" :visible.sync=seetext :before-close="handleDialogClose" width="50%">
      <el-form :model="form" :rules="rules" ref="form" id="form">
        <!--<el-form-item label="商品名称:" :label-width="formLabelWidth" prop="name">-->
          <!--<el-select v-model="form.name" placeholder="商品名称" size="mini" >-->
            <!--<el-option label="LT_03" value="LT_03"></el-option>-->
            <!--<el-option label="LT_O5" value="LT_O5"></el-option>-->
            <!--<el-option label="DS_O2" value="DS_O2"></el-option>-->
            <!--<el-option label="CB_02" value="CB_02"></el-option>-->
            <!--<el-option label="HT_02" value="HT_02"></el-option>-->
            <!--<el-option label="CB_01" value="CB_01"></el-option>-->
            <!--<el-option label="MT_02" value="MT_02"></el-option>-->
            <!--<el-option label="LT_O6" value="LT_O6"></el-option>-->
            <!--<el-option label="LT_O4" value="LT_O4"></el-option>-->
            <!--<el-option label="LT_01" value="LT_01"></el-option>-->
            <!--<el-option label="LB_03" value="LB_03"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="商品名称:" :label-width="formLabelWidth" prop="name">
          <el-col :span="20" style="margin-left: 8%">
            <el-input v-model="form.name" autocomplete="off" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品价格:" :label-width="formLabelWidth" prop="price">
          <el-col :span="20" style="margin-left: 8%">
            <el-input v-model="form.price" autocomplete="off" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品系列:" :label-width="formLabelWidth" prop="xielei" >
            <el-select v-model="form.xielei" placeholder="商品系列" size="mini" >
              <el-option label="C系列" value="C系列"></el-option>
              <el-option label="D系列" value="D系列"></el-option>
              <el-option label="H系列" value="H系列"></el-option>
              <el-option label="L系列" value="L系列"></el-option>
              <el-option label="M系列" value="M系列"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品材质:" :label-width="formLabelWidth" prop="caizhi">
          <el-select v-model="form.caizhi" placeholder="商品材质" size="mini">
            <el-option label="天然材质" value="天然材质"></el-option>
            <el-option label="PU革材质" value="PU革材质"></el-option>
            <el-option label="超细纤维材质" value="超细纤维材质"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品分类:" :label-width="formLabelWidth" prop="nanv">
          <el-select v-model="form.nanv" placeholder="商品分类" size="mini">
            <el-option label="男鞋" value="男鞋"></el-option>
            <el-option label="女鞋" value="女鞋"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品颜色:" :label-width="formLabelWidth" prop="color">
          <el-select v-model="form.color" placeholder="商品颜色" size="mini" >
            <el-option label="深褐色" value="深褐色"></el-option>
            <el-option label="烟草色" value="烟草色"></el-option>
            <el-option label="灰色" value="灰色"></el-option>
            <el-option label="黑色" value="黑色"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="描述文字:" :label-width="formLabelWidth" prop="wenzi">-->
            <!--<el-input v-model="form.wenzi" autocomplete="off" size="mini" ></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="描述文字:" :label-width="formLabelWidth" prop="wenzi">
          <el-col :span="20" style="margin-left: 8%">
            <el-input v-model="form.wenzi" autocomplete="off" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <h4 id="h4">商品尺码库存:</h4>
        <table border="1" cellspacing="0" cellpadding="0">
          <tr id="one">
            <td>尺码</td>
            <td v-for="item in num1">{{item}}</td>
          </tr>
          <tr id="two">
            <td>库存</td>
            <td>
              <el-input  :placeholder="0" class="aaa" v-model="form.yi"></el-input>
            </td>
            <td>
              <el-input  :placeholder="0" class="aaa" v-model="form.er"></el-input>
            </td>
            <td>
              <el-input  :placeholder="0" class="aaa" v-model="form.san"></el-input>
            </td>
            <td>
              <el-input  :placeholder="0" class="aaa" v-model="form.si"></el-input>
            </td>
            <td>
              <el-input  :placeholder="0" class="aaa" v-model="form.wu"></el-input>
            </td>
            <td>
              <el-input  :placeholder="0" class="aaa" v-model="form.liu"></el-input>
            </td>
            <td>
              <el-input  :placeholder="0" class="aaa" v-model="form.qi"></el-input>
            </td>
            <td>
              <el-input  :placeholder="0" class="aaa" v-model="form.ba"></el-input>
            </td>
            <td>
              <el-input  :placeholder="0" class="aaa" v-model="form.jiu"></el-input>
            </td>
            <td>
              <el-input  :placeholder="0" class="aaa" v-model="form.shi"></el-input>
            </td>
            <td>
              <el-input  :placeholder="0" class="aaa" v-model="form.shiyi"></el-input>
            </td>
            <td>
              <el-input  :placeholder="0" class="aaa" v-model="form.shier"></el-input>
            </td>
          </tr>
        </table>
      </el-form>
      <h4>商品图片:</h4>
      <el-upload
        action="啥子锤子"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeUpload"
        multiple
        ref="upload"
        :auto-upload="false"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="down">取 消</el-button>
        <!--<el-button @click="fu">测试</el-button>-->
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "luoadd",
        inject:["reload"],
      data(){
          return {
            imgkaiguan:false,
            data:'',
            num1:[35,36,37,38,39,40,41,42,42,44,45,46],//尺码
            num:12,
            kucun:'',
            dialogFormVisibleluoadd: false,//模态框开关属性
            dialogImageUrl: '',//图片上传
            dialogVisible: false,//图片上传相关
            form: {
             yi:'0',
              er:'0',
              san:'0',
              si:'0',
              wu:'0',
              liu:'0',
              qi:'0',
              ba:'0',
              jiu:'0',
              shi:'0',
              shiyi:'0',
              shier:'0',
              nanv:'',
              name: '',
              price:'',
              xielei:'',
              caizhi:'',
              color:'',
              wenzi:'',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            rules:{
              name: [
                { required: true, message: '请选择商品名称', trigger: 'change' }
              ],
              caizhi: [
                { required: true, message: '请选择商品材质', trigger: 'change' }
              ],
              xielei: [
                { required: true, message: '请选择商品系列', trigger: 'change' }
              ],
              nanv: [
                { required: true, message: '请选择商品分类', trigger: 'change' }
              ],
              color: [
                { required: true, message: '请选择商品颜色', trigger: 'change' }
              ],
              price: [
                { required: true, message: '请输入价格', trigger: 'blur' }
              ],
              wenzi: [
                { required: true, message: '请输入描述文字', trigger: 'blur' }
              ],
            },
            formLabelWidth: '30%',
            param:'',
          }
      },
      props:['seetext'],
      methods:{
        beforeUpload(file){
          this.param = new FormData();
          this.param.append('file', file, file.name);
          this.param.append('name', this.form.name);
          this.param.append('color', this.form.color);
          this.$axios({
            method:'post',
            url:'api/upload.do',
            data:this.param,
            header:{'Content-Type': 'multipart/form-data'}
          })
        },
        submit(formName) {//
            this.$refs[formName].validate((valid) => {//表单验证
              if (valid) {
                this.$parent.see2=false;
                // alert('submit!');
                function getNow(s) {
                  return s < 10 ? '0' + s: s;
                }
                let myDate = new Date();
                //获取当前年
                let year=myDate.getFullYear();
                //获取当前月
                let month=myDate.getMonth()+1;
                //获取当前日
                let date=myDate.getDate();
                let now=year+'年'+getNow(month)+"月"+getNow(date)+"日";
                let a=this.form;
                let data=[
                    {xilei:a.xielei,
                    nannv:a.nanv,
                    size:[
                      a.yi,
                      a.er,
                      a.san,
                      a.si,
                      a.wu,
                      a.liu,
                      a.qi,
                      a.ba,
                      a.jiu,
                      a.shi,
                      a.shiyi,
                      a.shier],
                    name:a.name,
                    color:a.color,
                    caizhi:a.caizhi,
                    },
                ];
                let Data;
                let that=this;

                this.$axios({
                  method:'post',
                  url:'/api/name.do',
                  data:{'name':this.form.name}
                }).then(resp=>{
                  this.$axios({//第一步获取id
                    method:'post',
                    url:'/api/add.do',
                    data:data,
                  }).then((resp=>{
                    Data=resp.data;
                    that.data=[
                      {
                        'series_id':Data.series_id,
                        'section_id':Data.section_id,
                        'g_n_id':Data.g_n_id,
                        'g_c_ID':Data.g_c_ID,
                        'g_t_id':Data.g_t_id,
                        inventory:[
                          data[0].size[0],
                          data[0].size[1],
                          data[0].size[2],
                          data[0].size[3],
                          data[0].size[4],
                          data[0].size[5],
                          data[0].size[6],
                          data[0].size[7],
                          data[0].size[8],
                          data[0].size[9],
                          data[0].size[10],
                          data[0].size[11],
                        ],
                        'price':that.form.price,
                        'describe':Data.wenzi,
                        'wenzi':that.form.wenzi,
                        'data':now,
                      }
                    ];
                    this.$axios({//第二步插入到goods表
                      method:'post',
                      url:'/api/add2.do',
                      data:that.data[0],
                    }).then(resp=>{
                      that.submitUpload();
                    });
                  }))
                  }

                );

              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
        resetForm(formName) {//重置表单
          this.$refs[formName].resetFields();
        },
        down(){
          this.$parent.see2=false;
        },
        handleDialogClose(){
          this.$parent.see2=false;
        },
        handleRemove(file, fileList) {//图片删除
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {//图片预览
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        submitUpload(){
          this.$refs.upload.submit();
          this.reload()
        },
      },
    }
</script>

<style scoped>

  #form{
    /*border: 1px solid black;*/
    height: 350px;
  }
.el-form{
  /*outline: 1px solid black;*/
  height: 200px;
  float: left;
  margin-bottom: 30px;
}
  .el-form-item{
    float: left;
    width: 50%;
    /*outline: 1px solid black;*/
  }
  .el-select{
    width:84%  ;
  }
#one{
  background: rgb(236,245,255);
}
#h4{
  margin-top: 250px;
}
#one,#two>td{
  width: 100px;
  height: 30px;
  line-height: 30px;
}
</style>
